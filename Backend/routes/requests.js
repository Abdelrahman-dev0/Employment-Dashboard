const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { formatDate } = require("../utils");

/* ========================================== CRUD Requests =============================== */

// SHOW APPLICANT REQUESTS HISTORY FOR ALL JOBS [ Admin ]
router.get("/history", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const requests = await query(`
        SELECT
        user_requests.id,
          users.name,
          users.email,
          jobs.position,
          user_requests.requested_time,
          user_requests.status
        FROM user_requests
        INNER JOIN users ON user_requests.user_id = users.id
        INNER JOIN jobs ON user_requests.job_id = jobs.id
        ORDER BY user_requests.requested_time DESC
      `);

    const formattedRequests = requests.map((requests) => {
      return {
        ...requests,
        requested_time: formatDate(requests.requested_time),
      };
    });

    res.status(200).json({
      requests: formattedRequests,
      msg: "Applicant Requests History Retrieved Successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

// [ UPDATE ] UPDATE USER REQUEST STATUS [ Accepted , Declined ] [ Admin ]
router.put("/:id", admin, async (req, res) => {
  try {
    // 1- CHECK IF USER REQUEST EXISTS OR NOT
    const query = util.promisify(conn.query).bind(conn);
    const userRequest = await query(
      "SELECT * FROM user_requests WHERE id = ?",
      [req.params.id]
    );

    if (!userRequest[0]) {
      res.status(404).json({ msg: "User request not found!" });
      return;
    }

    // 2- UPDATE STATUS OF USER REQUEST
    if (req.body.status === "Accepted" || req.body.status === "Declined") {
      // [ UPDATE ] CHECK IF NEW STATUS IS DIFFERENT FROM CURRENT STATUS
      if (req.body.status === userRequest[0].status) {
        res.status(400).json({
          msg: "User request status is already " + req.body.status + "!",
        });
        return;
      }
      // [ UPDATE ] CHECK IF MAX CANDIDATE NUMBER HAS BEEN REACHED BEFORE ACCEPTING NEW REQUESTS
      if (req.body.status === "Accepted") {
        const job = await query("SELECT * FROM jobs WHERE id = ?", [
          userRequest[0].job_id,
        ]);
        if (job.length > 0 && job[0].max_candidate_number === 0) {
          res.status(400).json({
            msg: "Maximum number of candidates has already been reached for this job. Cannot accept more requests!",
          });
          return;
        }
      }
      const updatedUserRequest = {
        status: req.body.status,
      };
      await query("UPDATE user_requests SET ? WHERE id = ?", [
        updatedUserRequest,
        req.params.id,
      ]);

      // 3- IF STATUS IS ACCEPTED, CHECK IF MAX CANDIDATE NUMBER HAS BEEN REACHED
      if (req.body.status === "Accepted") {
        const job = await query("SELECT * FROM jobs WHERE id = ?", [
          userRequest[0].job_id,
        ]);
        if (job.length > 0 && job[0].max_candidate_number > 0) {
          // 4- DECREMENT THE MAX CANDIDATE NUMBER FOR THE JOB
          await query(
            "UPDATE jobs SET max_candidate_number = max_candidate_number - 1 WHERE id = ?",
            [userRequest[0].job_id]
          );
          const updatedJob = await query("SELECT * FROM jobs WHERE id = ?", [
            userRequest[0].job_id,
          ]);
          if (
            updatedJob.length > 0 &&
            updatedJob[0].max_candidate_number === 0
          ) {
            // 5- IF MAX CANDIDATE NUMBER HAS BEEN REACHED, UPDATE STATUS OF ALL PENDING REQUESTS TO DECLINED
            await query(
              "UPDATE user_requests SET status = 'Declined' WHERE status = 'Pending' AND job_id = ?",
              [userRequest[0].job_id]
            );
            res.status(200).json({
              msg: "Maximum number of candidates has been reached for this job. All pending requests have been declined.",
            });
            return;
          }
        } else {
          // 6- IF MAX CANDIDATE NUMBER HAS BEEN REACHED, UPDATE STATUS OF ALL PENDING REQUESTS TO DECLINED
          await query(
            "UPDATE user_requests SET status = 'Declined' WHERE status = 'Pending' AND job_id = ?",
            [userRequest[0].job_id]
          );
          res.status(200).json({
            msg: "Maximum number of candidates has been reached for this job. All pending requests have been declined.",
          });
          return;
        }
      }

      res.status(200).json({
        msg: "User request status updated successfully!",
      });
    } else {
      res.status(400).json({ msg: "Invalid status value!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Internal server error" }] });
  }
  return;
});

// [ GET ] GET ALL USER REQUESTS [ Admin ]
router.get("/all", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const sql = `
      SELECT user_requests.id, users.name, users.email, jobs.position, user_requests.status, DATE_FORMAT(user_requests.requested_time, "%Y-%m-%d %H:%i:%s") AS requested_time_formatted, user_requests.user_id
      FROM user_requests
      JOIN users ON user_requests.user_id = users.id
      JOIN jobs ON user_requests.job_id = jobs.id
      ORDER BY user_requests.requested_time DESC
      
      `;
    const allRequests = await query(sql);

    if (allRequests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res
      .status(200)
      .json(
        allRequests.map((request) => ({ ...request, requestId: request.id }))
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// [ GET ] GET USER REQUEST BY ID [ Admin ]
router.get("/:id", admin, async (req, res) => {
  try {
    const requestId = req.params.id;
    const query = util.promisify(conn.query).bind(conn);
    const sql = `
              SELECT users.id as user_id, users.name, users.email, jobs.position, user_requests.status
              FROM user_requests
              JOIN users ON user_requests.user_id = users.id
              JOIN jobs ON user_requests.job_id = jobs.id
              WHERE user_requests.id = ${requestId}
            `;
    const requests = await query(sql);

    if (requests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res.status(200).json(requests[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
