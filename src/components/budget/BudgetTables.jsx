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
import '../../containers/styles.css'

const currency = localStorage.getItem('currency')

export default function ExpensesTable( { selectedBudget, selectedBudgetId, expenseCategories, incomeCategories } ) {
  const initData = []
  const [preparedExpenseData, setPreparedExpenseData] = useState(initData)
  const [preparedIncomeData, setPreparedIncomeData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(0)
  const [isRowSelectedI, setIsRowSelectedI] = useState(false)
  const [isRowSelectedE, setIsRowSelectedE] = useState(false)
  const [categoryType, setCategoryType] = useState(null)

  const columns = [
    {
      name: 'pk', 
      label: 'pk', 
      options: {display: false, viewColumns: false, filter: false}
    },
    { 
      name: 'name',
      label: 'Category'
    },
    {
      name: 'code', 
      label: 'Planned [' + currency + ']',
      options: {filter: false}
    },
    {
      name: 'population',
      label: 'Current [' + currency + ']',
      options: {filter: false}
    },
    {
      name: 'size',
      label: 'Difference [' + currency + ']',
      options: {filter: false}
    },
  ]

  const handleCategoryChoice = (event) => {
    const category = event.target.value
    setCategoryType(category)
  }

  function addEntry(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    API.addBudgetEntry({budget: selectedBudgetId, category: data.get('category'), value: data.get('value')})
    .then(response => {
      fetchCurrentData()
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }
  
  function ExpensesTableToolbar() {
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
            Expenses
        </Typography>

      </Toolbar>
    )
  }

  function RevenuesTableToolbar() {
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
            Revenues
        </Typography>

      </Toolbar>
    )
  }

  function BudgetForm( {type} ) {
    let categories = expenseCategories
    if (type === 'income') {
      categories = incomeCategories
    }

    return (
    <Box component="form" noValidate sx={{ m: 3 }} onSubmit={addEntry}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              required
              id="category"
              name="category"
              label="Category"
              value={categoryType}
              onChange={handleCategoryChoice}
            >
              {categories.map((categoryOption) => (
                <MenuItem key={categoryOption.id} value={categoryOption.id}>
                  {categoryOption.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            fullWidth
            id="value"
            label="Value"
            name="value"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <IconButton aria-label="add-budget-entry" type="submit">
              <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
    )
  }

  const fetchCurrentData = async() => {
    
    const expenseCategoryPromises  = expenseCategories.map(category =>
      API.getCategoryTransactions({ category_id: category.id, start_date: selectedBudget.start_date, end_date: selectedBudget.end_date })
    )
    
    const incomeCategoryPromises  = incomeCategories.map(category =>
      API.getCategoryTransactions({ category_id: category.id, start_date: selectedBudget.start_date, end_date: selectedBudget.end_date })
    )

    Promise.all(expenseCategoryPromises).then(categoryResponses => {
      const categoryData = expenseCategories.map((category, index) => ({
        id: category.id,
        value: categoryResponses[index].data
      }))

      API.getCompanyBudget({budget_id: selectedBudgetId, transaction_type: 2}).then(response => {
        const expenseTableData = response.data
  
        const preparedExpenseData = expenseTableData.map((item) => {
          const currentSum = categoryData.find(category => category.id === item?.category).value
          return [
          item?.id,
          expenseCategories.find((obj) => obj['id'] === item?.category).name,
          item?.value,
          currentSum,
          Math.abs(item?.value - currentSum),
          ]
        })
        setPreparedExpenseData(preparedExpenseData)
      })
    })

    Promise.all(incomeCategoryPromises).then(categoryResponses => {
      const categoryData = incomeCategories.map((category, index) => ({
        id: category.id,
        value: categoryResponses[index].data
      }))

      API.getCompanyBudget({budget_id: selectedBudgetId, transaction_type: 1}).then(response => {
        const incomeTableData = response.data
        
        const preparedIncomeData = incomeTableData.map((item) => {
          const currentSum = categoryData.find(category => category.id === item?.category).value
          return [
          item?.id,
          incomeCategories.find((obj) => obj['id'] === item?.category).name,
          item?.value,
          currentSum,
          Math.abs(item?.value - currentSum),
          ]
        })
        setPreparedIncomeData(preparedIncomeData)
      })
    })
  }

  useEffect(() => {
    fetchCurrentData()
  }, [selectedBudgetId])

  const onRowsDelete = (rowsDeleted, data) => {
    const deleteRow = async () => {
      return API.deleteBudgetEntry({pk: selectedRow})
    }
    deleteRow()
  }

  const onRowSelectionChangeE = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    if (!isRowSelectedE) {
      setSelectedRow(preparedExpenseData[rowsSelected[0]][0])
      setIsRowSelectedE(true)
    }
    else if (rowsSelected.length === 0) { 
      setSelectedRow(null)
      setIsRowSelectedE(false)
    } else {
      setSelectedRow(preparedExpenseData[rowsSelected[0]][0])
      setIsRowSelectedE(true)
    }
  }

  const onRowSelectionChangeI = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    if (!isRowSelectedI) {
      setSelectedRow(preparedIncomeData[rowsSelected[0]][0])
      setIsRowSelectedI(true)
    }
    else if (rowsSelected.length === 0) { 
      setSelectedRow(null)
      setIsRowSelectedI(false)
    } else {
      setSelectedRow(preparedIncomeData[rowsSelected[0]][0])
      setIsRowSelectedI(true)
    }
  }

  const optionsE = {
    selectableRowsOnClick: true,
    selectableRows: 'single',
    selectableRowsHideCheckboxes: true,
    onRowsDelete: onRowsDelete,
    onRowSelectionChange: onRowSelectionChangeE,
    print: false,
  }

  const optionsI = {
    selectableRowsOnClick: true,
    selectableRows: 'single',
    selectableRowsHideCheckboxes: true,
    onRowsDelete: onRowsDelete,
    onRowSelectionChange: onRowSelectionChangeI,
    print: false,
  }

  return (
    <React.Fragment>
      <div className='budget-menu'>
      <Paper sx={{ width: '45vw', overflow: 'hidden'}}>
          <ExpensesTableToolbar />
          <BudgetForm type='expense'/>
          <MUIDataTable
              data={preparedExpenseData}
              columns={columns}
              options={optionsE}
          />
      </Paper>
      <Paper sx={{ width: '45vw', overflow: 'hidden'}}>
          <RevenuesTableToolbar/>
          <BudgetForm type='income'/>
          <MUIDataTable
              data={preparedIncomeData}
              columns={columns}
              options={optionsI}
          />
      </Paper>
      </div>
    </React.Fragment>
  )
}