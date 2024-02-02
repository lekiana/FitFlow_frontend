import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../api/apiClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FitFlow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function NewCompany() {

  const getGroup = async (data) => {return API.createGroup({name: data.get('name')})}
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const group = await getGroup(data)
    data.append('group', group.data.id)

    const company = await API.createCompany(data)

    if (company){
      localStorage.setItem("company_group", company.data.group)
      navigate('/signup')
    }
  }

  return (//Register your company
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create company account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="company-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Company Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
              <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
                labelId="currency"
                id="currency"
                name="currency"
                label="Currency"
            >
              <MenuItem key={'PLN'} value={1}>
                  PLN
              </MenuItem>
              <MenuItem key={'EUR'} value={2}>
                  EUR
              </MenuItem>
            </Select>
            </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  )
}