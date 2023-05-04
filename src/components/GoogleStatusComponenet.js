import React, { useState, useEffect } from 'react';
import StatusDetailComponent from './StatusDetailComponent';
import { Link } from 'react-router-dom';

export default function GoogleStatusComponent() {

    const [googleStatus, setGoogleStatus] = useState(null)

    const MINUTE_MS = 60000;

    useEffect(() => {
        const interval = setInterval(() => {
            fetchGoogleStatus();

        }, MINUTE_MS);
        fetchGoogleStatus();
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])



    const fetchGoogleStatus = async () => {
        const response = await fetch('http://localhost:8080/v1/google-status');
        const json = await response.json();
        setGoogleStatus({ title: "Amazon", ...json });
    };

    return (
        <>
            <table >
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Status Code</th>
                        <th>Duration (ms)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {googleStatus ? (
                        <StatusDetailComponent key="google" data={googleStatus} />)
                        : <></>}

                </tbody>
            </table>
            <Link to="amazon">Amazon</Link>||
            <Link to="/">Home</Link>
        </>
    )
}

