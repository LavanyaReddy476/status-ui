import React, { useState, useEffect } from "react";
import StatusDetailComponent from "./StatusDetailComponent";
import { Link } from "react-router-dom";

export default function StatusComponent() {
  const [allStatus, setAllStatus] = useState(null);

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllStatus();
    }, MINUTE_MS);
    fetchAllStatus();
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const fetchAllStatus = async () => {
    const response = await fetch("http://localhost:8080/v1/all-status");
    const json = await response.json();
    setAllStatus([...json]);
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <b>All available Status </b>
      </div>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Status Code</th>
            <th>Duration (ms)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allStatus ? (
            allStatus.map((data, index) => (
              <StatusDetailComponent index={index} data={data} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <Link to="google">Google</Link>||
      <Link to="amazon">Amazon</Link>
    </>
  );
}
