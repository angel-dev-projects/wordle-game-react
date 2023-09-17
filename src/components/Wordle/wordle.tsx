import { useEffect, useState } from "react";
import RowCompleted from "../Rows/rowCompleted";
import RowCurrent from "../Rows/rowCurrent";
import RowEmpty from "../Rows/rowEmpty";
import { GameStatus } from "../../assets/utils/types";
import { useWindow } from "../../hooks/useWindow";
import styles from "./wordle.module.scss";
import { getWordOfTheDay, isValidWord } from "../../services/request";
import Keyboard from "../Keyboard/keyboard";
import Modal from "../Modal/modal";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "../Confetti/confetti";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

export default function Wordle() {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const [turn, setTurn] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

  useWindow("keydown", handleKeyDown);

  useEffect(() => {
    if (localStorage.getItem("word") !== getWordOfTheDay()) {
      localStorage.removeItem("word");
      localStorage.removeItem("result");
    }

    if (localStorage.getItem("result") === "won") {
      setGameStatus(GameStatus.Won);
    }

    if (localStorage.getItem("result") === "lost") {
      setGameStatus(GameStatus.Lost);
    }

    setWordOfTheDay(getWordOfTheDay());
  }, [wordOfTheDay]);

  function handleKeyDown(event: KeyboardEvent) {
    const letter = event.key.toUpperCase();

    onKeyPressed(letter);
  }

  function onKeyPressed(key: string) {
    if (gameStatus !== GameStatus.Playing) {
      return;
    }

    if (key === "BACKSPACE" && currentWord.length > 0) {
      onDelete();
      return;
    }

    if (key === "ENTER" && currentWord.length === 5 && turn <= 6) {
      onEnter();
      return;
    }

    if (currentWord.length >= 5) {
      return;
    }

    if (keys.includes(key)) {
      onInput(key);
      return;
    }
  }

  function onInput(letter: string) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  }

  async function onEnter() {
    const validWord = await isValidWord(currentWord);

    if (currentWord.length === 5 && !validWord) {
      toast.error("Not a valid word!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }

    if (currentWord === wordOfTheDay) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Won);
      saveResults("won");
      return;
    }

    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Lost);
      saveResults("lost");
      return;
    }

    setCompletedWords([...completedWords, currentWord]);
    setTurn(turn + 1);
    setCurrentWord("");
  }

  function saveResults(result: string) {
    localStorage.setItem("word", wordOfTheDay);
    localStorage.setItem("result", result);
  }

  return (
    <>
      {gameStatus === GameStatus.Won ? (
        <>
          <Modal
            type="won"
            completedWords={completedWords}
            solution={wordOfTheDay}
          />
          <Confetti />
        </>
      ) : gameStatus === GameStatus.Lost ? (
        <Modal
          type="lost"
          completedWords={completedWords}
          solution={wordOfTheDay}
        />
      ) : null}
      <div className={styles.mainContainer}>
        {completedWords.map((word, i) => (
          <RowCompleted key={i} word={word} solution={wordOfTheDay} />
        ))}

        {gameStatus === GameStatus.Playing ? (
          <RowCurrent word={currentWord} />
        ) : null}

        {Array.from(Array(6 - turn)).map((_, i) => (
          <RowEmpty key={i} />
        ))}
      </div>
      <ToastContainer />
      <Keyboard keys={keys} onKeyPressed={onKeyPressed}></Keyboard>
    </>
  );
}
