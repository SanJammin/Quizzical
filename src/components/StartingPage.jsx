export default function StartingPage(props) {
    return (
        <section className="starting-page">
            <h1>Quizzical</h1>
            <p>The ultimate random quiz</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </section>
    );
}