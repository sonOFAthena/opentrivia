import { useEffect, useState } from "react"

const Trivia = ({ setStop, questionNumber, setQuestionNumber, trivia }) => {
  //current question
  const [question, setQuestion] = useState(null);

  //Selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  //Change className
  const [className, setClassName] = useState("answer");

  //Set of answers. including correct answer
  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    setQuestion(trivia[questionNumber - 1]);

  }, [trivia, questionNumber]);

  const delay = (duration, callback) =>{
    setTimeout(() => {
      callback();
    }, duration);
  }

  const handleClick = (a)=>{
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => 
      setClassName( a === question?.correct_answer ? "answer correct" : "answer wrong")
    );

    delay(5000, () => 
      {
        if(a === question?.correct_answer){
          setQuestionNumber((prev) => prev + 1 );
          setSelectedAnswer(null);
        }else{
          setStop(true);
        }
      }
    );
  } 

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers" >
        <div className={ selectedAnswer === question?.correct_answer ? className : "answer"} onClick={()=>handleClick(question?.correct_answer)}>{question?.correct_answer}</div> 
        {question?.incorrect_answers.map((a) => (
          <div className={ selectedAnswer === a ? className : "answer"} onClick={()=>handleClick(a)}>{a}</div>     
        ))}
      </div>
    </div>
  );
};

export default Trivia