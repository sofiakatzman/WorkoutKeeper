import './App.css';
import { useState, useEffect } from 'react';
import Routines from './Components/Routines';
import SelectedRoutine from './Components/SelectedRoutine';

function App() {
  const Airtable = require('airtable');
  const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appLHqfsmzJx6TzrT');
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const [mostRecentRoutine, setMostRecentRoutine] = useState(null); 
  const [celebrate, setCelebrate]= useState(false)
  
  
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

          // Find the routine with the most recent timestamp
          const recentRoutine = fetchedRoutines.reduce((latest, current) => {
          const latestDate = new Date(latest.LastCompleted || 0);
          const currentDate = new Date(current.LastCompleted || 0);

          // Update latest if current's timestamp is greater
          return currentDate > latestDate ? current : latest;
        }, {});

        // Only set most recent routine if a valid one exists
        if (recentRoutine && recentRoutine.LastCompleted) {
          setMostRecentRoutine(recentRoutine.Name);
        }
    
      })
      .catch(err => {
          console.error("Error fetching records:", err);
      });
  }, []);
  
  // helper function to clear out selection 
  function clearout(){
    setSelectedRoutine(null)
  }

  return (
    <div className="App">
      <div className="stats">
      <span><strong>Last Workout:</strong> {mostRecentRoutine}</span>
      {/* <p className="mono"><strong>Last Completed Routine:</strong> {mostRecentRoutine}</p> */}
      </div>
      <div className="line-container">
        <div className="vertical-line"></div>
        <div className="routines-container">

          {routines && selectedRoutine === null && <Routines routines={routines} setRoutine={setSelectedRoutine} />}
          <SelectedRoutine routine={selectedRoutine} setRoutine={setSelectedRoutine} setCelebrate={setCelebrate} />
          {celebrate && <h1>CONGRATS!</h1>}
        </div>
      </div>
      <div className="container">
        {selectedRoutine && <button className="restart" onClick={() => clearout()}>back</button>}
      </div>
    </div>
  );
}

export default App;
