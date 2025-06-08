import { useEffect, useState } from "react";
import he from "he";
import clsx from "clsx";

export default function QuizPage() {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

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

    function selectAnswer(question, index) {
        setSelectedAnswers(prev => ({
            ...prev,
            [question]: index
        }));
    }

    const renderQuiz = quizData.map(quiz => {
        const allAnswers = [...quiz.incorrect_answers, quiz.correct_answer];
        const shuffleAnswers = allAnswers.sort(() => Math.random() - 0.5);

        return (
            <section key={quiz.question}>
                <h2>{he.decode(quiz.question)}</h2>
                {shuffleAnswers.map((answer, index) => (
                    <button 
                        key={answer}
                        onClick={() => selectAnswer(quiz.question, index)}
                        className={clsx({clicked: selectAnswer[quiz.question] === index})}>
                        {he.decode(answer)}
                    </button>
                ))}
            </section>
        );
    });

    return (
        <>{loading ? <p>Loading quiz...</p> : renderQuiz}</>
    );
}