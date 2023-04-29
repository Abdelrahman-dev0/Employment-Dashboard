import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ListApp = () => {
  return (
    <div className="job-content">
      <div className="content">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-center m-2">Manage Applicants :</h2>
        </div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>Email</th>
              <th>phone</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ahmed ali</td>
              <td>ahmed@gmail.com</td>
              <td>20 5765123</td>
              <td>accepted</td>
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

export default ListApp;
