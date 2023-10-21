import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const sampleParagraph =
    "Joy plastic danger pretty larger strike energy extra my victory mail let disease motion man eight dog would story square wheel happily sky throughout attention hit slightly anyone pay scared headed idea fewer instead mile sum failed jump through lift yellow remember fast calm wolf loud coach nuts expect village";

  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [targetWPM, setTargetWPM] = useState(10);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const inputStyle = {
    height: '330px',
    width: '780px',
    backgroundColor: '#000000',
    color: 'white',
    fontSize: '30px',
    overflow: 'hidden', 
    scrollbarWidth: 'none', 
  };

  useEffect(() => {
    if (timerRunning && time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setTimerRunning(false);
     
    }
  }, [timerRunning, time]);

  const startTest = () => {
    setTime(60);
    setWordsTyped(0);
    setUserInput(sampleParagraph);
    setTimerRunning(true);
  };

  const resetTest = () => {
    setTimerRunning(false);
    setTime(60);
    setUserInput('');
    setWordsTyped(0);
  };

  const handleWPMChange = (wpm) => {
    setTargetWPM(wpm);
  };

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  const toggleSignup = () => {
    setSignupVisible(!signupVisible);
  };

  return (
    <div className="App">
      <h1
        style={{
          position: 'absolute',
          top: 25,
          left: 80,
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Typing Test
        <button
          onClick={toggleSignup}
          style={{
            marginLeft: '10px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          
        </button>
      </h1>
      <div className="test-container">
        <div className="test-text">
          <textarea
            style={inputStyle}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={timerRunning ? '' : sampleParagraph}
            disabled={!timerRunning}
          />
          <div className="timer">{time} seconds</div>
          <progress
            max="100"
            value={(wordsTyped / sampleParagraph.split(' ').length) * 100}
            style={{ width: '100%', height: '0px', border: 'none' }}
          />
          <button onClick={startTest}>Start Test</button>
          <button onClick={resetTest}>Reset</button>
          <button onClick={() => handleWPMChange(10)}>10 WPM</button>
          <button onClick={() => handleWPMChange(50)}>50 WPM</button>
          <button onClick={() => handleWPMChange(80)}>80 WPM</button>
          <button onClick={() => handleWPMChange(100)}>100 WPM</button>
        </div>
        <div className="results">
          <p>Words Typed: {wordsTyped}</p>
          <p>Target WPM: {targetWPM}</p>
        </div>
      </div>
      {signupVisible && (
        <div
          style={{
            position: 'absolute',
            top: 65,
            right: 80,
            padding: '10px',
            color:'white'
          }}
        >
          Sign Up 
        </div>
      )}
    </div>
  );
}

function CustomTextarea({ sampleParagraph, userInput, wordsTyped }) {
  const inputText = userInput.split(' ');
  const sampleText = sampleParagraph.split(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sampleText.map((word, index) => (
        <span
          key={index}
          style={{
            color: word === inputText[index] ? 'green' : 'red',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default App;
