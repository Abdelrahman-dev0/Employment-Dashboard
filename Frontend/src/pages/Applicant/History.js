import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/storage";
import { Table, Spinner, Alert } from "react-bootstrap";

const getSearchHistory = async () => {
  const user = getAuthUser();
  if (!user) {
    return null;
  }

  try {
    const response = await axios.get(
      `http://localhost:4000/jobs/search_history/${user.id}`
    );
    return response.data.search_history;
  } catch (error) {
    console.log("Error retrieving search history:", error);
    throw new Error("Failed to retrieve search history.");
  }
};

const History = () => {
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const history = await getSearchHistory();
        setSearchHistory(history || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="p-2">
        {error}
      </Alert>
    );
  }

  if (searchHistory.length === 0) {
    return (
      <div className="search-history">
        <h5>No Search History Found</h5>
      </div>
    );
  }

  return (
    <div className="search-history">
      <h5>Recent Searches:</h5>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Search</th>
            <th>Search Time</th>
          </tr>
        </thead>
        <tbody>
          {searchHistory.map((search, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{search.search_text}</td>
              <td>{new Date(search.search_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default History;
