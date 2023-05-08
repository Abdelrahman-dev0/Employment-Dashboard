const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { formatDate } = require("../utils");

/* ========================================== CRUD Applicants =============================== */

// CREATE APPLICANT [ Admin ]
router.post(
  "/create",
  admin,
  body("phone")
    .isMobilePhone()
    .withMessage("Please Enter a Valid Phone Number!"),
  body("email").isEmail().withMessage("Please Enter a Valid Email!"),
  body("name")
    .isString()
    .withMessage("Please Enter a Valid Name!")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) characters."),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) characters."),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(conn.query).bind(conn); // Transform Query mysql --> promis to use [ await, async ]
      const checkEmailExists = await query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email is already exists!",
            },
          ],
        });
        return;
      }

      // 3- PREPARE OBJECT USER TO ---> SAVE
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        token: crypto.randomBytes(16).toString("hex"),
        type: req.body.type || 0, // Default value of type is 0
      };

      // 4- INSERT USER INTO DB
      await query("insert into users set ?", userData);
      delete userData.password;
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ err: err });
    }
    return;
  }
);

// UPDATE APPLICANT [ Admin ]
router.put(
  "/update/:id",
  admin,
  body("email").isString().withMessage("Please Enter a Valid Email!"),
  body("name")
    .isString()
    .withMessage("Please Enter a Valid Name!")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) characters."),
  body("phone")
    .isMobilePhone()
    .withMessage("Please Enter a Valid Phone Number!"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) characters."),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- CHECK IF APPLICANT EXISTS OR NOT
      const user = await query(
        "select * from users where id = ? AND type = 0",
        [req.params.id]
      );

      if (!user[0]) {
        return res.status(404).json({ msg: "Applicant not found !" });
      }

      //3- Prepare user object
      const userObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, 10),
        type: req.body.type || user[0].type, // Default value of user type
      };

      //4- Update user object in db
      await query("update users set ? where id = ?", [userObj, user[0].id]);
      res.status(200).json({
        /* msg: req.body, */
        msg: "Applicant Updated Successfully !",
      });
    } catch (error) {
      res.status(500).json(error);
    }
    return;
  }
);

// DELETE APPLICANT [ Admin ]
router.delete("/delete/:id", admin, async (req, res) => {
  try {
    //1- CHECK IF APPLICANT  EXISTS OR NOT
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("select * from users where id = ? AND type = 0", [
      req.params.id,
    ]);

    if (!user[0]) {
      return res.status(404).json({ msg: "Applicant not found !" });
    }

    //2- Delete user object in db
    await query("delete from users where id = ?", [user[0].id]);
    res.status(200).json({
      /* msg: req.body, */
      msg: "Applicant Deleted Successfully !",
    });
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

// READ ALL APPLICANTS [ Admin ]
router.get("/all", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const users = await query("select * from users where type = 0");
    delete users[0].password;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

// READ APPLICANT BY ID [ Admin ]
router.get("/:id", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const applicant = await query(
      "SELECT * FROM users WHERE id = ? and type = 0",
      [req.params.id]
    );
    if (!applicant[0]) {
      return res.status(404).json({
        msg: "Applicant not found",
      });
    }
    delete applicant[0].password;
    res.status(200).json(applicant[0]);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

module.exports = router;
