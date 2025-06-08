import { useEffect, useState } from "react";
import he from "he";

export default function QuizPage() {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuizData(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, []);

    const renderQuiz = quizData.map(quiz => {
        const allAnswers = [...quiz.incorrect_answers, quiz.correct_answer];
        const shuffleAnswers = allAnswers.sort(() => Math.random() - 0.5);

        return (
            <section key={quiz.question}>
                <h2>{he.decode(quiz.question)}</h2>
                {shuffleAnswers.map(answer => <p key={answer}>{he.decode(answer)}</p>)}
            </section>
        );
    });

    return (
        <>{loading ? <p>Loading quiz...</p> : renderQuiz}</>
    );
}