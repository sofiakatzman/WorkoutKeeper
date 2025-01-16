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
    
    const formatFriendlyDate = (dateString) => {
        if (!dateString) return "Never";

        const date = new Date(dateString);
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

        // Check if the date is older than 7 days
        if (date < sevenDaysAgo) {
            return "Not Yet This Week";
        }

        // Format the date
        const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options);
    };

    return (
        <div>
            <h1>Routines</h1>
            <ul>
                {routines.map((routine) => (
                    <div>
                        <li key={routine.id}>{routine.Name}</li>
                        <p>Last Completed {formatFriendlyDate(routine.LastCompleted)}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Routines;
