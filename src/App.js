import React, { useState } from 'react';
import './App.css'; // import the CSS file

const wordList = ['birth', 'mommy', 'labor', 'child', 'sleep', 'crawl', 'fetus', 'bathe', 'daddy', 'carry', 'adore', 'smile', 'happy', 'teeth', 'tyler', 'natal', 'nurse', 'ovary', 'sperm', 'tummy', 'binky'];

const getRandomWord = () => wordList[Math.floor(Math.random() * wordList.length)];

function App() {
  const [targetWord] = useState(getRandomWord);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const maxGuesses = 6;
  
  const checkGuess = (guess) => {
    if (guess.length !== targetWord.length) return Array(targetWord.length).fill('');
    
    return guess.split('').map((letter, index) => {
      if (letter === targetWord[index]) {
        return 'correct';
      } else if (targetWord.includes(letter)) {
        return 'misplaced';
      } else {
        return 'wrong';
      }
    });
  };

  const handleGuess = () => {
    if (currentGuess.length !== targetWord.length || guesses.length >= maxGuesses) {
      return;
    }

    setGuesses([...guesses, { word: currentGuess, feedback: checkGuess(currentGuess) }]);
    setCurrentGuess('');

    if (currentGuess === targetWord) {
      alert('Congratulations! You guessed the word!');
    } else if (guesses.length + 1 === maxGuesses) {
      alert(`Game Over! The word was: ${targetWord}`);
    }
  };

  const handleChange = (e) => {
    setCurrentGuess(e.target.value);
  };

  // This function handles key press events
  const handleKeyDown = (event) => {
    // Check if the pressed key is "Enter"
    if (event.key === 'Enter') {
      handleGuess();
    }
  };


  return (
    <div className="App">
      <h1>Wordle but for Pregnant People</h1>
      <div className="Grid">
        {Array(maxGuesses).fill(null).map((_, i) => (
          <div className="Row" key={i}>
            {[...Array(targetWord.length)].map((_, j) => (
              <div
                className={`Cell ${
                  guesses[i]?.feedback[j] || ''
                }`}
                key={j}
              >
                {guesses[i]?.word[j] || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <input
          value={currentGuess}
          onChange={handleChange}
          maxLength={targetWord.length}
          disabled={guesses.length >= maxGuesses}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleGuess}  disabled={guesses.length >= maxGuesses}>Guess</button>
      </div>
    </div>
  );
}

export default App;
