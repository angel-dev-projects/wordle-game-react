import "./menu.css";
import { useState } from "react";

export default function Menu() {
  const [modalRulesOpen, setModalRulesOpen] = useState(false);
  const [modalStatsOpen, setModalStatsOpen] = useState(false);

  const openRulesModal = () => {
    setModalRulesOpen(true);
  };

  const closeRulesModal = () => {
    setModalRulesOpen(false);
  };

  const openStatsModal = () => {
    setModalStatsOpen(true);
  };

  const closeStatsModal = () => {
    setModalStatsOpen(false);
  };

  let games_played = parseInt(localStorage.getItem("games_played") || "0");
  let games_won = parseInt(localStorage.getItem("games_won") || "0");
  let currentWinStreak = parseInt(
    localStorage.getItem("currentWinStreak") || "0"
  );
  let bestWinStreak = parseInt(localStorage.getItem("bestWinStreak") || "0");

  return (
    <div className="menu-container">
      <button
        type="button"
        className="icon-btn"
        id="rules"
        onClick={openRulesModal}
      >
        <i className="fa-solid fa-book fa-2xl"></i>
      </button>
      <button
        type="button"
        className="icon-btn"
        id="rules"
        onClick={openStatsModal}
      >
        <i className="fa-solid fa-chart-simple fa-2xl"></i>
      </button>
      {modalRulesOpen && (
        <div className="modal">
          <div className="modal-header">
            <h2>WORDLE RULES</h2>
            <button className="close-button" onClick={closeRulesModal}>
              <i className="fa-solid fa-xmark fa-2xl"></i>
            </button>
          </div>
          <div className="modal-content">
            <ol>
              <li>
                <span className="important">Objective:</span> The goal of the
                Wordle game is to guess a 5-letter word within 6 attempts.
              </li>
              <li>
                <span className="important">Attempts:</span> In each attempt,
                you can enter a 5-letter word and press the "Enter" button to
                check it.
              </li>
              <li>
                <span className="important">Hints:</span> After each attempt,
                the game provides hints about correct and incorrect letters in
                the word.
              </li>
              <li>
                <span className="important">Correct Position:</span> If a letter
                is correct and in the correct position, it will be shown in
                green.
              </li>
              <li>
                <span className="important">Correct, Wrong Position:</span> If a
                letter is correct but in the wrong position, it will be shown in
                yellow.
              </li>
              <li>
                <span className="important">Incorrect:</span> If a letter is not
                in the target word, it will be shown in gray.
              </li>
              <li>
                <span className="important">Adjust and Guess:</span> Use the
                provided hints to adjust your next guess and get closer to the
                correct word.
              </li>
              <li>
                <span className="important">Winning:</span> The game is won if
                you guess the 5-letter word before using all 6 attempts.
              </li>
              <li>
                <span className="important">Losing:</span> The game is lost if
                you do not guess the word within 6 attempts.
              </li>
              <li>
                <span className="important">Have Fun:</span> Enjoy the game and
                challenge your word-solving skills!
              </li>
            </ol>
          </div>
        </div>
      )}
      {modalStatsOpen && (
        <div className="modal">
          <div className="modal-header">
            <h2>YOUR STATS</h2>
            <button className="close-button" onClick={closeStatsModal}>
              <i className="fa-solid fa-xmark fa-2xl"></i>
            </button>
          </div>
          <div className="modal-content">
            <div className="stats-content">
              <div className="stat-container">
                <p className="stat-number">{games_played}</p>
                <p>Played</p>
              </div>
              <div className="stat-container">
                <p className="stat-number">{games_won}</p>
                <p>Won</p>
              </div>
              <div className="stat-container">
                <p className="stat-number">{currentWinStreak}</p>
                <p>Current Streak</p>
              </div>
              <div className="stat-container">
                <p className="stat-number">{bestWinStreak}</p>
                <p>Best Streak</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
