import { React, useState } from "react";
import "./App.css";
import { quizData, sortedListAnswers } from "./Assets/quizz.jsx";
import Select from "react-select";
import { Random } from "./Utilities/Random.jsx";
import { selectCustomStyles } from "./Utilities/SelectReactSetting.jsx";

function App() {
  const allData = quizData;
  const getRandomIndex = Random(allData.length);
  const [gameData, setGameData] = useState({ Q: "Start", A: "Start" });
  // const [answerData, setAnswerData] = useState(sortedListAnswers);
  const answerData = sortedListAnswers();
  const [answer, setAnswer] = useState("");
  const [winlose, setWinlose] = useState("");

  let answerLet;
  let gameDataLet = { Q: "Start", A: "Start" };

  const onClickHandlerNewGame = () => {
    setAnswer("");
    setWinlose("");
    let rand = getRandomIndex;
    //the actual question and answer
    setGameData({ Q: allData[rand].Q, A: allData[rand].A });
    gameDataLet = { Q: allData[rand].Q, A: allData[rand].A };
    console.log("rand", rand);
    console.log("gameData Q= ", gameData.Q + " A= " + gameData.A);
    console.log("gameDataLet Q= ", gameDataLet.Q + " A= " + gameDataLet.A);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.value); //this holds the state version - it can get passed around and refreshes the front end
    answerLet = e.value; //we need to pass the answer as a let so that its available immediatly and not refreshing the screen
    setWinlose("- you " + winLoseCalc(answerLet));
    console.log(
      "answer = ",
      answerLet +
        "  gameplay = " +
        gameData.A +
        "  gameDataLet.A = " +
        gameDataLet.A
    );
  };

  const winLoseCalc = (answerLet) => {
    if (answerLet !== "undefined") {
      if (answerLet === gameData.A) {
        return "win";
      } else {
        return "lose";
      }
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-12">
          <div className="card shadow">
            <div className="card-body">
              <button
                className="btn btn-primary mb-4 w-100 display-4"
                onClick={onClickHandlerNewGame}
              >
                Choose a Random Question
              </button>
              <div className="mb-4 text-center">
                <h2 className="display-4">{gameData.Q}</h2>
                <h4 className="fs-3 mt-3">
                  {answer ? "You selected " + answer + winlose : ""}
                </h4>
              </div>
              <div>
                <Select
                  styles={selectCustomStyles}
                  options={answerData}
                  className="selectDropDownStyle"
                  value={answerData.find((opt) => opt.value === answer) || null}
                  onChange={handleAnswerChange}
                  placeholder={answer !== "" ? answer : "Select an Answer"}
                  controlShouldRenderValue={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
{
  /* // <div className="App">
    //   <button
    //     className="buttonSubmit btn btn-primary"
    //     onClick={onClickHandlerNewGame}
    //   >
    //     Choose a Random Question
    //   </button>
    //   <div>
    //     <h2>{gameData.Q}</h2>
    //     <h4>{answer ? "You selected " + answer + winlose : ""}</h4>
    //   </div>
    //   <div className="col-sm">
    //     <Select
    //       styles={selectCustomStyles}
    //       options={answerData} //list of data
    //       className="selectDropDownStyle"
    //       value={answer}
    //       onChange={handleAnswerChange} //extract the  answer
    //       placeholder={answer !== "" ? answer : "Select an Answer"} //'Select the place'
    //       controlShouldRenderValue={false}
    //     />
    //   </div>
    // </div> */
}
