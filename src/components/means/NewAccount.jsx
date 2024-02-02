import * as React from 'react'
import API from '../../api/apiClient'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import '../../containers/styles.css'
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

export default function NewAccount({setAccounts, companyId, setIsLoading}) {

    function addAccount(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setIsLoading(true)

        API.addAccount({company: companyId, name: data.get('name'), currency: 2})
        .then(
            API.getCompanyMeans({company_id: companyId,}).then(response => {
            setAccounts(response.data)
            setIsLoading(false)
            })
        )
        .catch(error => {
        console.error('Error:', error)
        })
    }

    return (
        <Card >
            <CardContent>
            <Typography
            color="text.secondary"
            gutterBottom
            variant="button"
            >
            New Account
            </Typography>
            <Box component="form" sx={{ m: 1 }} onSubmit={addAccount}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                        <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name='name'
                        />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                    <IconButton aria-label= "add-account-button" type="submit">
                        <AddCircleIcon/>
                    </IconButton>
                    </Grid>
                </Grid>
            </Box>
            </CardContent>
        </Card>
    )
  }