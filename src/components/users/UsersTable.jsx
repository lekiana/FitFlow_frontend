import * as React from 'react'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MUIDataTable from "mui-datatables"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import IconButton from '@mui/material/IconButton'
import API from '../../api/apiClient'
import Alert from '@mui/material/Alert'
  

const group = localStorage.getItem("group-id")
const company_id = localStorage.getItem("company-id")
  
export default function TransactionsTable() {
  const [alert, setAlert] = useState(null)
  const [preparedTableData, setPreparedTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [selectedRow, setSelectedRow] = useState(0)
  const [isRowSelected, setIsRowSelected] = useState(false)
    
  const columns = [
    {
      name: 'pk', 
      label: 'pk', 
      options: {display: false, viewColumns: false, filter: false}
    },
    { 
      name: 'username', 
      label: 'Username',
      options: {filterType: 'textField'}
    },
    { 
      name: 'first_name', 
      label: 'First name', 
      options: {filterType: 'textField'}
    },
    {
      name: 'last_name',
      label: 'Last name', 
      options: {filterType: 'textField'}
    },
    {
      name: 'email',
      label: 'Email', 
      options: {filterType: 'textField'}
    },
  ]

  function addUser(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setIsLoading(true)

    API.createUser({username: data.get('username'), first_name: data.get('first_name'), last_name: data.get('last_name'), email: data.get('email'), means: data.get('email'), password: data.get('password'), groups: group})
      .then(response => {
      API.getCompanyUsers({company_id: company_id,}).then( response => {
        setTableData(response.data)
        setIsLoading(false)
        setAlert(null)
      })
    })
    .catch(error => {
      console.error('Error:', error)
      setAlert(UserErrorAlert(error.response.data.error_msg))
    })
  }

  function UserErrorAlert(mess) {
    return <Alert id='username-taken-alert' severity="error" style={{width: '600px', margin: '20px', marginLeft: '0'}}>{mess}</Alert>
  }    
  
  function EnhancedTableToolbar() {
    return (
      <Toolbar
        sx={{
          pl: { sm: 3 },
          pr: { xs: 2, sm: 2 },
        }}
      >
        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
          Users
        </Typography>

      </Toolbar>
    )
  }

  function UsersForm() {
    return (
    <Box component="form" noValidate sx={{ m: 3 }} onSubmit={addUser}>
      {alert}
    <Grid container spacing={2}>
    <Grid item xs={2}>
      <TextField
        name="first_name"
        required
        fullWidth
        id="first_name"
        label="First Name"
      />
    </Grid>
    <Grid item xs={2}>
      <TextField
        required
        fullWidth
        id="last_name"
        label="Last Name"
        name="last_name"
      />
    </Grid>
    <Grid item xs={2}>
      <TextField
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
      />
    </Grid>
    <Grid item xs={2}>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
      />
    </Grid>
    <Grid item xs={2}>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
      />
    </Grid>
      <Grid item>
        <IconButton id="add-user" aria-label="add-user" type="submit">
            <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
    </Box>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableData = await API.getCompanyUsers({company_id: company_id,})
        setTableData(tableData.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (isLoading) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const preparedData = tableData.map((item) => {
        return [
          item?.id,
          item?.username, 
          item?.first_name,
          item?.last_name,
          item?.email,
        ]
      })
      setPreparedTableData(preparedData)
    }
  }, [isLoading])

  const onRowsDelete = (rowsDeleted, data) => {
    const deleteRow = async () => {
      return API.deleteUser({pk: selectedRow})
    }
    deleteRow()
  }

  const onRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    if (!isRowSelected) {
      setSelectedRow(preparedTableData[rowsSelected[0]][0])
      setIsRowSelected(true)
    }
    else if (rowsSelected.length === 0) { 
      setSelectedRow(null)
      setIsRowSelected(false)
    } else {
      setSelectedRow(preparedTableData[rowsSelected[0]][0])
      setIsRowSelected(true)
    }
  }

  const options = {
    selectableRowsOnClick: true,
    selectableRows: 'single',
    selectableRowsHideCheckboxes: true,
    onRowsDelete: onRowsDelete,
    onRowSelectionChange: onRowSelectionChange,
    print: false,
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <EnhancedTableToolbar />
      <UsersForm/>
      <MUIDataTable
        data={preparedTableData}
        columns={columns}
        options={options}
      />
    </Paper>
  )
}