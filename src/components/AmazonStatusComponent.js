import React, { useState, useEffect } from "react";
import StatusDetailComponent from "./StatusDetailComponent";
import { Link } from "react-router-dom";

export default function AmazonStatusComponent() {
  const [amazonStatus, setAmazonStatus] = useState(null);

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAmazonStatus();
    }, MINUTE_MS);
    fetchAmazonStatus();
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const fetchAmazonStatus = async () => {
    const response = await fetch("http://localhost:8080/v1/amazon-status");
    const json = await response.json();
    setAmazonStatus({ title: "Amazon", ...json });
  };

  return (
    <>
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
          {amazonStatus ? (
            <StatusDetailComponent index="amazon" data={amazonStatus} />
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <Link to="google">Google</Link>||
      <Link to="/">Home</Link>
    </>
  );
}
