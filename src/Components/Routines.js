function Routines({routines, setRoutine}) {
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
                    <div key={routine.Name}>
                        <li key={routine.id}>{routine.Name}</li>
                        <p>Last Completed {formatFriendlyDate(routine.LastCompleted)}</p>
                        <button onClick={() => setRoutine(routine)}>Select Routine</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Routines;
