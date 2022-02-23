import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";
import { QUANTITY, URLBASE } from "./utils/apis";

function App() {
  
  const [userName, setUserName] = useState(null);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [trivia, setTrivia] = useState([]);

  const moneyPyramid = useMemo(
    () => [
    {id:1, amount:"$ 1000"},
    {id:2, amount:"$ 2000"},
    {id:3, amount:"$ 3000"},
    {id:4, amount:"$ 4000"},
    {id:5, amount:"$ 5000"},
    {id:6, amount:"$ 6000"},
    {id:7, amount:"$ 7000"},
    {id:8, amount:"$ 8000"},
    {id:9, amount:"$ 9000"},
    {id:10, amount:"$ 10000"},
  ].reverse(),
  []);

  useEffect(() => {
    questionNumber > 1 && setEarned( moneyPyramid.find(m=>m.id === questionNumber - 1 ).amount)
  }, [moneyPyramid, questionNumber])
  

  useEffect(() => {
    const searchTrivia = async () =>{
      const url = `${URLBASE}?amount=${QUANTITY}&category=${category}&difficulty=${difficulty}&type=multiple`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(userName);
      console.log(category);
      console.log(difficulty);
      console.log(data);
      setTrivia(data.results);
    };
    
    searchTrivia();

  }, [category,difficulty])



  return (
    <div className="app">
      {userName ? (
        <>
        {console.log(trivia)}
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned} </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    trivia={trivia}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} setCategory={setCategory} setDifficulty={setDifficulty} />
      )}
    </div>
  );
}

export default App;
