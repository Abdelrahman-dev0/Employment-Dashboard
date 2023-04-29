import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ListJobs = () => {
  return (
    <div className="job-content">
      <div className="content">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-center m-2">Manage Jobs :</h2>
        </div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Position</th>
              <th>Description</th>
              <th>Offer</th>
              <th>Number Of Candidate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Software testing</td>
              <td>RDI is looking for a Software Quality Control (QC)</td>
              <td>3000</td>
              <td>10</td>
              <td>
                <Link to={":1"} className="btn btn-primary mx-1mx-1">
                  Update
                </Link>
                <Link className="btn btn-danger mx-1">Delete</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListJobs;
