import { useState, useEffect } from "react";

function Excercise({ excercise, onCompletionChange}) {
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appLHqfsmzJx6TzrT');
    const [excerciseItem, setExcerciseItem] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {

        const fetchExcercise = async () => {
            try {
                const record = await base('Excercises').find(excercise)
                console.log('Retrieved:', record)
                setExcerciseItem(record)
            } catch (err) {
                console.error("Error fetching record:", err)
            }
        };

        fetchExcercise()
    }, [excercise])

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked
        setIsChecked(newCheckedState)
        onCompletionChange(newCheckedState)
    };

    return (
        <div>
            {excerciseItem ? (
                <div key={excerciseItem.id} className={`exercise-item ${isChecked ? 'checked-off' : ''}`}>
                    <label>
                    <input
                            type="checkbox"
                            className="exercise-checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                    <h2>{excerciseItem.fields?.Name} - {excerciseItem.fields?.Equipment}</h2>
                    {excerciseItem.fields?.Duration ? (
                        <span className="exercise-text">{excerciseItem.fields.Duration} minutes @ {excerciseItem.fields?.Weight}</span>
                    ) : (
                        <span className="exercise-text">
                            {excerciseItem.fields?.Reps} reps x {excerciseItem.fields?.Sets} sets @ {excerciseItem.fields?.Weight} lbs
                        </span>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Excercise;
