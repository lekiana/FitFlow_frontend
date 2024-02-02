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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'


const company_id = localStorage.getItem("company-id")
const currency = localStorage.getItem("currency")

export default function TransactionsTable({accounts, categories, isContainerLoading, setMeansUpdate}) {
  const [preparedTableData, setPreparedTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [isRowSelected, setIsRowSelected] = useState(false)

  const expenseCategories = categories.filter(item => item.type === 2).map(item => item.id)

  const columns = [
    {
      name: 'pk', 
      label: 'pk', 
      options: {display: false, viewColumns: false, filter: false}
    },
    { 
      name: 'date',
      label: 'Date',
      options: {filterType: 'textField'}
    },
    { 
      name: 'title',
      label: 'Title',
      options: {filterType: 'textField'}
    },
    {
      name: 'category',
      label: 'Category',
    },
    {
      name: 'account',
      label: 'Account',
    },
    {
      name: 'value',
      label: 'Value [' + [currency] + ']',
      options: {filterType: 'textField'}
    },
  ]

  const fetchData = async () => {
    try {
      const tableData = await API.getCompanyTransactions({company_id: company_id,})

      setTableData(tableData.data)
      
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading && !isContainerLoading) {
      const preparedData = tableData.map((item) => {
        const value = expenseCategories.includes(item?.category) ? '-' + item?.value : '+' + item?.value
        return [
          item?.id,
          item?.date, 
          item?.title,
          categories.find((obj) => obj['id'] === item?.category).name,
          accounts.find((obj) => obj['id'] === item?.means).name,
          parseFloat(value) 
        ]
      })
  
      setPreparedTableData(preparedData)
    }
  }, [isLoading, isContainerLoading])

  function addTransaction(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setIsLoading(true)

    API.addTransaction({value: data.get('value'), title: data.get('title'), date: data.get('date'), currency: currency, means: data.get('account'), category: data.get('category')})
      .then(
        API.getCompanyTransactions({company_id: company_id,}).then( response => {
          setTableData(response.data)
          setMeansUpdate(true)
        }))
      .catch(error => {
        console.error('Error:', error)
      })
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
            Transactions
        </Typography>

      </Toolbar>
    )
  }

  function ExpensesForm() {
    return (
    <Box component="form" sx={{ m: 3 }} onSubmit={addTransaction}>
      <Grid container spacing={2}>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              id="category"
              name="category"
              label="Category"
            >
              {categories.map((categoryOption) => (
                <MenuItem key={categoryOption.id} value={categoryOption.id}>
                  {categoryOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={3}>
          <TextField
            required
            fullWidth
            id="value"
            label="Value"
            name="value"
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="account-select-label">Account</InputLabel>
            <Select
              id="account"
              name="account"
              label="Account"
            >
              {accounts.map((accountOption) => (
                <MenuItem key={accountOption.id} value={accountOption.id}>
                  {accountOption.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Tooltip title="Date in format: YYYY-MM-DD">
            <TextField
              required
              fullWidth
              id="date"
              label="Date"
              name="date"
            />
          </Tooltip>
        </Grid>

        <Grid item xs={5}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
          />
        </Grid>

        <Grid item>
          <IconButton aria-label= "add-transaction-button" type="submit">
              <AddCircleIcon />
          </IconButton>
        </Grid>

      </Grid>
    </Box>
    )
  }

  const onRowsDelete = async () => {
    setMeansUpdate(true)
    API.deleteTransaction({pk: selectedRow}).then(
      setIsLoading(true)
    )
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
      <ExpensesForm/>
      <MUIDataTable
        data={preparedTableData}
        columns={columns}
        options={options}
      />
    </Paper>
  )
}