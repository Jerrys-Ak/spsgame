import React, { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [round, setRound] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [result, setResult] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const choices = ["stone", "paper", "scissors"];
  const totalRounds = 6;
  const roundsData = [];

  const playRound = () => {
    if (!player1 || !player2) {
      alert("Please enter player names!");
      return;
    }

    if (player1Choice === player2Choice) {
      setResult("It's a tie!");
    } else if (
      (player1Choice === "stone" && player2Choice === "scissors") ||
      (player1Choice === "scissors" && player2Choice === "paper") ||
      (player1Choice === "paper" && player2Choice === "stone")
    ) {
      setResult(`Round ${round}: ${player1} wins!`);
      setScore1(score1 + 1);
    } else {
      setResult(`Round ${round}: ${player2} wins!`);
      setScore2(score2 + 1);
    }

    roundsData.push({ round, player1Choice, player2Choice });

    if (round === totalRounds) {
      const finalWinner =
        score1 > score2 ? `${player1} wins the game!` : `${player2} wins the game!`;

      setResult(`Game Over! ${finalWinner}`);
      saveGameToDB(roundsData, finalWinner);
    } else {
      setRound(round + 1);
    }
  };

  const saveGameToDB = async (rounds, winner) => {
    try {
      await axios.post("http://localhost:3000/save-game", {
        player1,
        player2,
        rounds,
        winner,
      });
      alert("Game saved successfully!");
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Stone, Paper, Scissors Game</h1>

      <div>
        <input  className="inputbox"
          type="text"
          placeholder="Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
      
        <input className="inputbox"
          type="text"
          placeholder="Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>

      <h2>Round {round}/6</h2>

      <div>
        <label>Player 1 ({player1}):</label>
        <select value={player1Choice} onChange={(e) => setPlayer1Choice(e.target.value)}>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
      <br></br>

      <div>
        <label>Player 2 ({player2}):</label>
        <select value={player2Choice} onChange={(e) => setPlayer2Choice(e.target.value)}>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
      <br></br>

      <button  className="clickBtn" onClick={playRound}>Play Round</button>

      <div>
        <h3>Scores:</h3>
        <p>{player1}: {score1}</p>
        <p>{player2}: {score2}</p>
      </div>

      <div>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
    
  );
}

export default App;
