import { useState, useEffect } from 'react';

function Routines() {
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appLHqfsmzJx6TzrT');

    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        // Fetch all records
        base('Routines').select({
            view: "Grid view",
        }).all()
        .then((records) => {
            // Extract and set routines
            const fetchedRoutines = records.map(record => ({
                id: record.id,
                ...record.fields,
            }));
            setRoutines(fetchedRoutines);
            console.log(fetchedRoutines); 
        })
        .catch(err => {
            console.error("Error fetching records:", err);
        });
    }, []); 

    return (
        <div>
            <h1>Routines</h1>
            <ul>
                {routines.map((routine) => (
                    <li key={routine.id}>{routine.Name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Routines;
