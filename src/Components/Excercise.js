import { useState, useEffect } from "react";

function Excercise({ excercise }) {
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appLHqfsmzJx6TzrT');
    const [excerciseItem, setExcerciseItem] = useState(null);

    useEffect(() => {
        console.log("you hit ex:");
        console.log(excercise);

        const fetchExcercise = async () => {
            try {
                const record = await base('Excercises').find(excercise);
                console.log('Retrieved:', record);
                setExcerciseItem(record);
            } catch (err) {
                console.error("Error fetching record:", err);
            }
        };

        fetchExcercise();
    }, [excercise]);

    return (
        <div>
            {excerciseItem ? (
                <div key={excerciseItem.id}>
                    <h2>{excerciseItem.fields?.Name} - {excerciseItem.fields?.Equipment}</h2>
                    {excerciseItem.fields?.Duration ? (
                        <p>{excerciseItem.fields.Duration} minutes @ {excerciseItem.fields?.Weight}</p>
                    ) : (
                        <p>
                            {excerciseItem.fields?.Reps} reps x {excerciseItem.fields?.Sets} sets @ {excerciseItem.fields?.Weight} lbs
                        </p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Excercise;
