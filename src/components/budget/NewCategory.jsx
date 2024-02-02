import * as React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import API from '../../api/apiClient'
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


export default function NewCategory({setCategoriesLoading, company_id}) {

    function addCategory(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
      
        API.addCategory({company: company_id, name: data.get('name'), type: data.get('type')})
        .then(response => {
            setCategoriesLoading(true)
        })
        .catch(error => {
        console.error('Error:', error)
        })
    }
    
    return (
        <Card sx={{width: "35vw"}}>
            <CardContent>
                <Typography
                color="text.secondary"
                gutterBottom
                variant="button"
                >
                New Category
                </Typography>
                <Box component="form" noValidate sx={{ m: 3 }} onSubmit={addCategory}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                required
                                labelId="type"
                                id="type"
                                name="type"
                                label="type"
                                >
                                    <MenuItem key={'E'} value={2}>
                                        Expense
                                    </MenuItem>
                                    <MenuItem key={'I'} value={1}>
                                        Revenue
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                            <IconButton aria-label="add budget entry" type="submit">
                                <AddCircleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}