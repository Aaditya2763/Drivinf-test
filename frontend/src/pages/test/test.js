import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Container, Grid, Paper, Stack } from '@mui/material';
import TestNavbar from '../../components/Navbar/testNavbar';
import { Link } from 'react-router-dom';

const questions=[
  {
    "question": "What does a yellow traffic light indicate?",
    "options": [
      "Stop",
      "Proceed with caution",
      "Speed up",
      "Turn left"
    ],
    "correct_answer": "Proceed with caution"
  },
  {
    "question": "When should you use your horn while driving?",
    "options": [
      "To alert others of your presence",
      "To signal a greeting to another driver",
      "To express frustration or annoyance",
      "To communicate your impatience"
    ],
    "correct_answer": "To alert others of your presence"
  },
  {
    "question": "What is the maximum speed limit in a residential area?",
    "options": [
      "20 mph",
      "25 mph",
      "30 mph",
      "35 mph"
    ],
    "correct_answer": "25 mph"
  },
  {
    "question": "What does a red octagonal traffic sign indicate?",
    "options": [
      "Yield",
      "Stop",
      "Merge",
      "Speed limit"
    ],
    "correct_answer": "Stop"
  },
  {
    "question": "What should you do if you encounter a school bus with flashing red lights?",
    "options": [
      "Pass the bus quickly",
      "Proceed with caution",
      "Stop and wait until the lights stop flashing",
      "Ignore the lights and continue driving"
    ],
    "correct_answer": "Stop and wait until the lights stop flashing"
  },
  {
    "question": "When driving in foggy conditions, what lights should you use?",
    "options": [
      "High beams",
      "Fog lights",
      "Parking lights",
      "Hazard lights"
    ],
    "correct_answer": "Fog lights"
  },
  {
    "question": "What should you do if your vehicle starts to skid?",
    "options": [
      "Steer in the direction of the skid",
      "Apply the brakes hard",
      "Turn the steering wheel quickly",
      "Accelerate to regain control"
    ],
    "correct_answer": "Steer in the direction of the skid"
  },
  {
    "question": "What does a broken white line on the road indicate?",
    "options": [
      "No passing allowed",
      "Passing allowed",
      "Merge left",
      "Lane ends"
    ],
    "correct_answer": "Passing allowed"
  },
  {
    "question": "What does a green traffic light indicate?",
    "options": [
      "Stop",
      "Proceed with caution",
      "Speed up",
      "Go"
    ],
    "correct_answer": "Go"
  },
  {
    "question": "When should you use your hazard lights?",
    "options": [
      "When parking illegally",
      "When driving in heavy rain",
      "When pulling over to answer a phone call",
      "When traveling at night"
    ],
    "correct_answer": "When pulling over to answer a phone call"
  }
]

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(false); // Track if any option is selected

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes} min : ${formattedSeconds} sec`;
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setAttempted(true); // Set attempted to true when an option is selected
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption('');
    setAttempted(false); // Reset attempted when moving to the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setSelectedOption('');
    setAttempted(false); // Reset attempted when moving to the previous question
  };

  const handleTestEnd = () => {
    // Test is over
    console.log('Test is over. Your score:', score);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const isTestOver = timeRemaining <= 0 || currentQuestionIndex === questions.length - 1;
  const passStatus = score >= questions.length / 2 ? 'Pass' : 'Fail';

  return (
    <Box>
      <TestNavbar/>
      <Container maxWidth="md" style={{ borderRadius: "10px" }}>
        <Grid>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
          {isTestOver?"":  <Typography variant="h5" >Question {currentQuestionIndex + 1}</Typography>}
            {isTestOver?"":<Typography variant="body2">Time Remaining: {formatTime(Math.max(timeRemaining, 0))}</Typography>}
          </Stack>
          <Paper elevation={3} style={{ padding: '20px', marginTop: 20 }}>
            {isTestOver ? (
              <Stack style={{ alignItems:"center" }}>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Test Over. Your final score is {score}. You are {passStatus}
                </Typography>
                <Link to="/dashboard"><Button style={{ marginTop: 20, border: "1px solid" }}>Back to dashboard</Button></Link>
              </Stack>
            ) : (
              <>
                {currentQuestion && (
                  <div style={{ marginTop: 20, textAlign: "center" }}>
                    <Typography variant="body1">{currentQuestion.question}</Typography>
                  </div>
                )}
                <RadioGroup value={selectedOption} onChange={handleOptionSelect} style={{ marginBottom: 16 }}>
                  {currentQuestion && currentQuestion.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                <Stack direction="row" justifyContent="space-between">
                  <div style={{ marginBottom: 16 }}>
                    <Button
                      variant="contained"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNextQuestion}
                      disabled={!attempted || currentQuestionIndex === questions.length - 1}
                      style={{ marginLeft: 8 }}
                    >
                      Next
                    </Button>
                  </div>
                  <div>
                    {currentQuestionIndex === questions.length - 1 && (
                      <Button
                        variant="contained"
                        onClick={handleTestEnd}
                        disabled={!attempted}
                        style={{ marginLeft: 8 }}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </Stack>
              </>
            )}
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

export default TestPage;