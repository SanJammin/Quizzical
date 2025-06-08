import { useState } from "react";
import "./App.css";
import StartingPage from "./components/StartingPage";
import QuizPage from "./components/QuizPage";

function App() {
    const [quizStarted, setQuizStarted] = useState(false);

    function startQuiz() {
        setQuizStarted(true);
    }

    return (
        <main>
            {
                quizStarted ?
                    <QuizPage /> :
                    <StartingPage
                    handleClick={startQuiz}
                    />
            }
        </main>
    );
}

export default App;
