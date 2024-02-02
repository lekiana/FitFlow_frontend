import * as React from 'react'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import '../../containers/styles.css'
import {
    Card,
    CardContent,
  } from '@mui/material'


export default function BudgetChoice({budgets, setselectedBudget}) {

    const handleBudgetChange = (event) => {
        const selectedBudget = event.target.value
        setselectedBudget(selectedBudget)
    }
    
    return (
        <Card sx={{width: "25%"}}>
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
                        id="budget"
                        name="budget"
                        label="Budget"
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