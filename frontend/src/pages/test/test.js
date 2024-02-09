import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Container, Grid, Paper, Stack } from '@mui/material';
import TestNavbar from '../../components/Navbar/testNavbar';

const questions = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Rome'],
    correctAnswer: 'Paris'
  },
];

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
    if (selectedOption === currentQuestion.correctAnswer) {
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

  return (
    <Box>
      <TestNavbar/>
      <Container maxWidth="md" style={{ borderRadius:"10px" }}>
        <Grid>
        <Stack direction="row" justifyContent="space-around" alignItems="center">
          <Typography variant="h5" >Question {currentQuestionIndex + 1}</Typography>
          <Typography variant="body2">Time Remaining: {formatTime(Math.max(timeRemaining, 0))}</Typography>
        </Stack>
        <Paper elevation={3} style={{ padding: '20px',marginTop:20 }}>
          {currentQuestion && (
            <div style={{ marginTop: 20, textAlign:"center" }}>
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
        </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

export default TestPage;
