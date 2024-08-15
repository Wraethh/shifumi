import { useState, useEffect, useCallback } from "react";
import "./App.css";
import PlayerCard from "./components/PlayerCard";
import EnemyCard from "./components/EnemyCard";

function App() {
  const [matchSettings, setMatchSettings] = useState({
    playerChoice: "",
    enemyChoice: "",
    result: null,
  });

  const [score, setScore] = useState({
    player: 0,
    enemy: 0,
  });

  const [animClass, setAnimClass] = useState({
    notChosen: "",
    chosen: "",
    enemy: "",
    result: "",
    jankenpon: {
      jan: "",
      ken: "",
      pon: "",
    },
  });

  const symbols = ["rock", "paper", "scissors"];

  // Generates enemy choice
  const randomEnemyChoice = () => {
    const randomChoiceIndex = () => Math.floor(Math.random() * symbols.length);
    setMatchSettings((prev) => ({
      ...prev,
      enemyChoice: symbols[randomChoiceIndex()],
    }));
  };

  // Starts the game when player clicks on a card
  const handleClickChoice = (value) => {
    setMatchSettings((prev) => ({
      ...prev,
      playerChoice: value,
    }));
    randomEnemyChoice();
    // Starts animations
    setAnimClass({
      notChosen: "hide",
      chosen: "chosen",
      enemy: "reveal",
      result: "reveal-result",
      jankenpon: {
        jan: "jan",
        ken: "ken",
        pon: "pon",
      },
    });
  };

  // Resets the results before the next game
  const resetGame = useCallback(() => {
    setTimeout(() => {
      // Increment the score if the game was won or lost
      if (matchSettings.result === "win") {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      } else if (matchSettings.result === "lose") {
        setScore((prev) => ({ ...prev, enemy: prev.enemy + 1 }));
      }
      // Resets game settings
      setMatchSettings({
        playerChoice: "",
        enemyChoice: "",
        result: null,
      });
      // Resets animations
      setAnimClass({
        notChosen: "",
        chosen: "",
        enemy: "",
        result: "",
        jankenpon: {
          jan: "",
          ken: "",
          pon: "",
        },
      });
    }, 7000);
  }, [matchSettings.result]);

  useEffect(() => {
    // Compares the results to get the outcome
    if (
      // In case of win
      (matchSettings.enemyChoice === "scissors" &&
        matchSettings.playerChoice === "rock") ||
      (matchSettings.enemyChoice === "paper" &&
        matchSettings.playerChoice === "scissors") ||
      (matchSettings.enemyChoice === "rock" &&
        matchSettings.playerChoice === "paper")
    ) {
      setMatchSettings((prev) => ({
        ...prev,
        result: "win",
      }));
      resetGame();
    } else if (
      // In case of loss
      (matchSettings.enemyChoice === "rock" &&
        matchSettings.playerChoice === "scissors") ||
      (matchSettings.enemyChoice === "scissors" &&
        matchSettings.playerChoice === "paper") ||
      (matchSettings.enemyChoice === "paper" &&
        matchSettings.playerChoice === "rock")
    ) {
      setMatchSettings((prev) => ({
        ...prev,
        result: "lose",
      }));
      resetGame();
    } else if (
      // In case of draw
      matchSettings.enemyChoice === matchSettings.playerChoice &&
      matchSettings.enemyChoice !== "" &&
      matchSettings.playerChoice !== ""
    ) {
      setMatchSettings((prev) => ({
        ...prev,
        result: "draw",
      }));
      resetGame();
    }
    return () => clearTimeout(resetGame);
  }, [matchSettings.playerChoice, matchSettings.enemyChoice, resetGame]);

  // Resets the score
  const handleClickResetScore = () => {
    setScore({
      player: 0,
      enemy: 0,
    });
  };

  return (
    <>
      <div className="enemySpace">
        <EnemyCard
          symbol={matchSettings.enemyChoice}
          animClass={animClass.enemy}
        />
      </div>

      <div className="separator"></div>

      <div className="playerSpace">
        <div className="player-card-container">
          {symbols.map((sym) => (
            <PlayerCard
              key={sym}
              symbol={sym}
              handleClick={handleClickChoice}
              animClass={
                matchSettings.playerChoice === sym
                  ? animClass.chosen
                  : animClass.notChosen
              }
              gameStarted={matchSettings.playerChoice !== ""}
            />
          ))}
        </div>
      </div>

      <div className="jankenpon">
        <div className={animClass.jankenpon.jan}>jan</div>
        <div className={animClass.jankenpon.ken}>ken</div>
        <div className={animClass.jankenpon.pon}>pon</div>
      </div>

      <div className={`matchResult ${animClass.result}`}>
        {matchSettings.result === "draw"
          ? "draw"
          : `you ${matchSettings.result}`}
      </div>

      <div className="score">
        <p>{score.enemy}</p>
        <button
          type="button"
          disabled={matchSettings.playerChoice !== ""}
          onClick={handleClickResetScore}
        >
          Reset
        </button>
        <p>{score.player}</p>
      </div>
    </>
  );
}

export default App;
