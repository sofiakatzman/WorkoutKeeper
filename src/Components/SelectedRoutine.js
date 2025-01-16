import Excercises from "./Excercises"

function SelectedRoutine({routine}){
   console.log(routine)
    if(routine)return(
        <div>
               <h2>{routine.Name}</h2>
               <h3><b>Focus:</b> {routine.Focus}</h3>
               <p><b>Last Completed:</b> {routine.LastCompleted}</p>
                <Excercises excercises={routine.Excercises}/>
        </div>
    )
}

export default SelectedRoutine