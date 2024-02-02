import * as React from 'react'
import '../../containers/styles.css'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

export default function BudgetChoice( {setselectedBudgetId, setselectedBudget, selectedBudget, budgets} ) {

    const handleBudgetChange = (event) => {
        const selectedBudget= event.target.value
        setselectedBudgetId(selectedBudget.id)
        setselectedBudget(selectedBudget)
    }

    return (
        <Card sx={{width: "20vw"}}>
        <CardContent>
        <Typography
            color="text.secondary"
            gutterBottom
            variant="button"
            >
            Choose Budget
        </Typography>
        <FormControl fullWidth style={{ marginTop: '25px' }}>
        <InputLabel id="demo-simple-select-label">Budget</InputLabel>
        <Select
            labelId="budget"
            id="budget"
            name="budget"
            label="Budget"
            value={selectedBudget}
            onChange={handleBudgetChange} 
        >
            {budgets.map((budgetOption) => (
            <MenuItem key={budgetOption.id} value={budgetOption}>
                {budgetOption.name}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        </CardContent>
        </Card>
    )
}
