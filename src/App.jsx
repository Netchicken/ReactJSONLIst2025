import { React, useState } from "react";
import "./App.css";
import { quizData, sortedListAnswers } from "./Assets/quizz.jsx";
import { Random } from "./Utilities/Random.jsx";

import Select from "react-select";
import { selectCustomStyles } from "./Utilities/SelectReactSetting.jsx";

function App() {
  // Get all quiz data
  const allData = quizData;
  // Get a random index from the quiz data
  // const getRandomIndex = Random(allData.length);
  // Set up state for the current question and answer
  const [gameData, setGameData] = useState({ Q: "Start", A: "Start" });
  // Get the sorted list of possible answers
  const answerData = sortedListAnswers();
  // State for the user's selected answer
  const [answer, setAnswer] = useState("");
  // State for win or lose message
  const [winlose, setWinlose] = useState("");

  // Variables to hold the answer and question/answer data temporarily
  let answerLet;
  let gameDataLet = { Q: "Start", A: "Start" };

  // When the "Choose a Random Question" button is clicked
  const onClickHandlerNewGame = () => {
    setAnswer(""); // Clear the selected answer
    setWinlose(""); // Clear the win/lose message
    // Generate a new random index
    // This will ensure a new question is selected each time
    let rand = Random(allData.length); // Get a new random index
    // Set the new question and answer using the random index
    setGameData({ Q: allData[rand].Q, A: allData[rand].A });
    // Store the question and answer in a temporary variable
    // This is useful for debugging or further processing
    gameDataLet = { Q: allData[rand].Q, A: allData[rand].A };
    // Log for debugging
    console.log("rand", rand);
    console.log("gameData Q= ", gameData.Q + " A= " + gameData.A);
    console.log("gameDataLet Q= ", gameDataLet.Q + " A= " + gameDataLet.A);
  };

  // When the user selects an answer from the dropdown
  const handleAnswerChange = (e) => {
    setAnswer(e.value); // Update the answer state
    answerLet = e.value; // Store the answer in a variable
    setWinlose("- you " + winLoseCalc(answerLet)); // Set win/lose message
    // Log for debugging
    console.log(
      "answer = ",
      answerLet +
        "  gameplay = " +
        gameData.A +
        "  gameDataLet.A = " +
        gameDataLet.A
    );
  };

  // Function to check if the answer is correct
  const winLoseCalc = (answerLet) => {
    if (answerLet !== "undefined") {
      if (answerLet === gameData.A) {
        return "win"; // Correct answer
      } else {
        return "lose"; // Wrong answer
      }
    }
  };

  return (
    // Main container with padding
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        {/* Responsive column for the card */}
        <div className="col-12 col-md-10 col-lg-12">
          <div className="card shadow">
            <div className="card-body">
              {/* Button to get a new random question */}
              <button
                className="btn btn-primary mb-4 w-100 display-4"
                onClick={onClickHandlerNewGame}
              >
                Choose a Random Question
              </button>
              {/* Show the question and result */}
              <div className="mb-4 text-center">
                <h2 className="display-4">{gameData.Q}</h2>
                <h4 className="fs-3 mt-3">
                  {answer ? "You selected " + answer + winlose : ""}
                </h4>
              </div>
              {/* Dropdown for selecting an answer */}
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
