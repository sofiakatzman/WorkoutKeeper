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
                            className="exercise-checkbox mono"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                    <div>
                    <p className="exercise-text details mono">{excerciseItem.fields?.Name} - {excerciseItem.fields?.Equipment}</p>
                    {excerciseItem.fields?.Duration ? (
                        <span className="exercise-text">{excerciseItem.fields.Duration} minutes @ {excerciseItem.fields?.Weight}</span>
                    ) : (
                        <span className="exercise-text">
                            {excerciseItem.fields?.Sets} sets x {excerciseItem.fields?.Reps} reps @ {excerciseItem.fields?.Weight} lbs
                        </span>
                    )}
                    </div>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Excercise;
