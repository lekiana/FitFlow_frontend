import * as React from 'react';
import './Dashboard.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()

  const handleSignUp = () => {
    // Navigate to the '/another-page' URL when the button is clicked
    navigate('/signup');
  };

  const handleSignIn = () => {
    // Navigate to the '/another-page' URL when the button is clicked
    navigate('/signin');
  };


  return (
    <div className='initial'>
      <div className='buttons'>
      <Stack spacing={5} direction="row">
        <Button
            size="medium"
            variant="contained"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            size="medium"
            variant="contained"
            onClick={handleSignUp}
          >
            Sign Up
        </Button>
      </Stack>
      </div>
    </div>
  );
}
