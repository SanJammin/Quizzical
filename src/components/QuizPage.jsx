import { useEffect, useState } from "react";
import he from "he";
import clsx from "clsx";

export default function QuizPage() {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizComplete, setQuizComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                const processedQuizData = data.results.map(quiz => {
                    const allAnswers = [...quiz.incorrect_answers, quiz.correct_answer];
                    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

                    return {
                        ...quiz,
                        shuffledAnswers
                    };
                });
                setQuizData(processedQuizData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [refreshTrigger]);

    function selectAnswer(question, index) {
        setSelectedAnswers(prev => ({
            ...prev,
            [question]: index
        }));
    }

    const renderQuiz = quizData.map(quiz => {

        return (
            <section key={quiz.question}>
                <h2>{he.decode(quiz.question)}</h2>
                <div className="answer-container">
                    {quiz.shuffledAnswers.map((answer, index) => (
                        <button
                            key={answer}
                            onClick={() => selectAnswer(quiz.question, index)}
                            disabled={quizComplete}
                            className={clsx({
                                clicked: selectedAnswers[quiz.question] === index,
                                correct: quizComplete && answer === quiz.correct_answer,
                                wrong: quizComplete && selectedAnswers[quiz.question] === index && answer !== quiz.correct_answer,
                                done: quizComplete && answer !== quiz.correct_answer
                            })}>
                            {he.decode(answer)}
                        </button>
                    ))}
                </div>
            </section>
        );
    });

    function markQuiz() {
        let finalNumber = 0;
        quizData.forEach(quiz => {
            const selectedIndex = selectedAnswers[quiz.question];
            const selectedAnswer = quiz.shuffledAnswers[selectedIndex];
            
            if (selectedAnswer === quiz.correct_answer) {
                finalNumber++;
            }
       });

       setScore(finalNumber);
       setQuizComplete(true);
    }

    const quizResults = <>
        <p className="score">You scored {score}/5 correct answers</p>
        <button className="check-answers" onClick={playAgain}>Play again</button>
    </>

    function playAgain() {
        setScore(0);
        setSelectedAnswers({});
        setLoading(true);
        setQuizData([]);
        setQuizComplete(false);
        setRefreshTrigger(prevState => prevState + 1);
    }

    return (
        <section>
            {loading ? <p>Loading quiz...</p> : renderQuiz}
            <div className="button-holder">
                {quizComplete ? quizResults : <button onClick={markQuiz} className="check-answers">Check answers</button>}
            </div>
        </section>
    );
}