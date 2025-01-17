import Excercises from "./Excercises"

function SelectedRoutine({routine, setRoutine, setCelebrate}){
    console.log()
       // Format the date
       const formatDate = (dateString) => {
        if (!dateString) return "Never";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

        // Calculate how many days ago
        const calculateDaysAgo = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            const now = new Date();
            const differenceInTime = now - date;
            const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); 
            return differenceInDays;
        };
    
        const daysAgo = calculateDaysAgo(routine?.LastCompleted);

    if(routine)return(
        <div >
               <div className="selected-routine-container">
               <h2 className="heading">{routine.Name}</h2>
               <h3 className="details mono xsmt"><b>Focus:</b> {routine.Focus}</h3>
                <p className="details mono xsmt">Last Completed:{formatDate(routine.LastCompleted)}{" "}
                    {daysAgo !== null && `(${daysAgo} day${daysAgo === 1 ? "" : "s"} ago)`}
                </p>
                

               </div>
               
                <Excercises excercises={routine.Excercises} routine={routine.id} setSelectedRoutine={setRoutine} setCelebrate={setCelebrate}/>

        </div>
    )
}

export default SelectedRoutine