import React, { useState, useEffect } from "react";
import Excercise from "./Excercise";

function Excercises({ excercises, routine, setSelectedRoutine, setCelebrate }) {
    const Airtable = require('airtable')
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appLHqfsmzJx6TzrT')
    const [completedCount, setCompletedCount] = useState(0)
    const [isComplete, setIsComplete] = useState(false)


    const handleCompletionChange = (isChecked) => {
        setCompletedCount((prevCount) => prevCount + (isChecked ? 1 : -1))
    };

    // UseEffect to handle workout completion logic
    useEffect(() => {
        if (excercises?.length > 0 && excercises.length === completedCount) {
            console.log("Your workout is complete!")
            setIsComplete(true)
        } else {
            setIsComplete(false)
        }
    }, [completedCount, excercises])

    //Helper function to send workout completion to airtable.
    function finishWorkout() {
        console.log("Congrats! You completed your routine!")
        console.log(routine);
    
        const routineId = routine 
    
        if (!routineId) {
            console.error("Routine ID is missing or invalid")
            return;
        }
    
        base('Workouts').create(
            [
                {
                    fields: {
                        Routine: [routineId], 
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log("Record created with ID:", record.getId())
                });
            }
        );
        setSelectedRoutine(null)
        setCelebrate(true)
    }
    
    return (
        <div>
            <h1>Excercises Here</h1>
            <p>Completed Excercises: {completedCount} / {excercises?.length}</p>
            {excercises?.length > 0 ? (
                <ul>
                    {excercises.map((excercise) => (
                        <Excercise
                            excercise={excercise}
                            key={excercise}
                            onCompletionChange={handleCompletionChange}
                        />
                    ))}
                </ul>
            ) : (
                <p>No excercises available.</p>
            )}
            
            {isComplete && <button onClick={()=> finishWorkout()}>Complete Workout</button>}

        </div>
    );
}

export default Excercises;
