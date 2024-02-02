import * as React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import API from '../../api/apiClient'
import { useState } from 'react'
import '../../containers/styles.css'
import Tooltip from '@mui/material/Tooltip'
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'


export default function NewBudget({setBudgetsLoading, company_id, budgets}) {
  const [alert, setAlert] = useState(null)

  function BudgetErrorAlert(mess) {
    return <Alert id='budget-overlap-alert' severity="error" style={{width: '600px', margin: '20px', marginLeft: '0'}}>{mess}</Alert>
  } 

  function isPeriodOverlap(newStart, newEnd) {
    for (const existingBudget of budgets) {
      const isOverlap =
      (newStart >= existingBudget.start_date && newStart <= existingBudget.end_date) ||
      (newEnd >= existingBudget.start_date && newEnd <= existingBudget.end_date) ||
      (newStart <= existingBudget.start_date && newEnd >= existingBudget.end_date)

      if (isOverlap) {
        setAlert(BudgetErrorAlert("Budget period overlaps with existing."))
        return true
      }
    }
    return false
  }

  function addBudget(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (!isPeriodOverlap(data.get('start-date'), data.get('end-date'))) {
      API.addBudget({company: company_id, name: data.get('title'), start_date: data.get('start-date'), end_date: data.get('end-date')})
      .then(response => {
        setBudgetsLoading(true)
        setAlert(null)
      })
      .catch(error => {
      console.error('Error:', error)
      })
    }
  }

  return (
    <Card sx={{width: "35vw"}}>
      <CardContent>
        <Typography
            color="text.secondary"
            gutterBottom
            variant="button"
          >
              New Budget
          </Typography>
          <Box component="form" noValidate sx={{ m: 3 }} onSubmit={addBudget}>
            <Grid container spacing={2}>
              {alert}
              <Grid item xs={12} sm={5}>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <Tooltip title="Date in format: YYYY-MM-DD">
                <TextField
                  required
                  fullWidth
                  id="start-date"
                  label="Start date"
                  name="start-date"
                />
              </Tooltip>
              </Grid>
              <Grid item xs={12} sm={3}>
              <Tooltip title="Date in format: YYYY-MM-DD">
                <TextField
                  required
                  fullWidth
                  id="end-date"
                  label="End date"
                  name="end-date"
                />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton id="add-budget" aria-label="add-budget" type="submit">
                    <AddCircleIcon />
                </IconButton>
              </Grid>
            </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}