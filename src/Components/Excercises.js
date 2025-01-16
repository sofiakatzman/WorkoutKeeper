import Excercise from "./Excercise";

function Excercises({ excercises }) {
    console.log(excercises);

    return (
        <div>
            <h1>Excercises Here</h1>
            {excercises?.length > 0 ? (
                <ul>
                    {excercises.map((excercise) => (
                        <li key={excercise}>
                            <Excercise excercise={excercise} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No exercises available.</p>
            )}
        </div>
    );
}

export default Excercises;
