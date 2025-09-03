import { useState } from "react";
import { languages } from "./languages";
import { getRandomWord } from "./utils";

import Header from "./Components/Header";
import ConfettiContainer from "./Components/ConfettiContainer";
import GameStatus from "./Components/GameStatus";
import AriaLiveStatus from "./Components/AriaLiveStatus";
import LanguageChips from "./Components/LanguageChips";
import WordLetters from "./Components/WordLetters";
import NewGameButton from "./Components/NewGameButton";
import Keyboard from "./Components/Keyboard";

/**
 * Backlog:
 *
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * ✅ Choose a random word from a list of words
 * ✅ Make the New Game button reset the game
 * ✅ Reveal what the word was if the user loses the game
 * ✅ Confetti drop when the user wins
 *
 * Challenge: 🎊🎊🎊🎊🎊
 */

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState((): string => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    !!lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <ConfettiContainer isGameWon={isGameWon} />
      <Header />

      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
      />

      <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />

      <WordLetters
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      {/* Combined visually-hidden aria-live region for status updates */}
      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        guessedLetters={guessedLetters}
        numGuessesLeft={numGuessesLeft}
      />

      <Keyboard
        alphabet={alphabet}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        isGameOver={isGameOver}
        addGuessedLetter={addGuessedLetter}
      />

      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}
