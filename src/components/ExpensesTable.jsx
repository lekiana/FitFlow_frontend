import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import { getCompanyBudget } from '../store/getCompanyBudgetSlice';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import API from '../api/apiClient';
import { getTransactionsCategories } from '../store/getTransactionsCategoriesSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const columns = [
  {id: 'pk', label: 'pk', options: {display: false}},
  { id: 'name', label: 'Category'},
  { id: 'code', label: 'Planned'},
  {
    id: 'population',
    label: 'Current',
  },
  {
    id: 'size',
    label: 'Difference',
  },
];

// function clearFields() {
//   setRowData({
//     category: '',
//     value: '',
//   })
// }

// const [rowData, setRowData] = useState({
//   category: '',
//   value: '',
// });


export default function ExpensesTable() {

  // const { loading: tableLoading } = useSelector(
  //   (state) => state.FitFlowReducer.getCompanyBudget
  // )

  //const adjustedColumns = tableLoading ? renderSkeleton(columns) : columns
  
  const dispatch = useDispatch()

  function addEntry(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)

    API.addBudgetEntry({budget: 1, name: 'name do usuniecia', category: data.get('category'), value: data.get('value')})
    .then(response => {
    console.log(response)
    dispatch(getCompanyBudget({budget_id: 1, transaction_type: 1}))
  })
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
            Expenses
        </Typography>

      </Toolbar>
    )
  }

  function ExpensesForm() {
    return (
    <Box component="form" noValidate sx={{ m: 3 }} onSubmit={addEntry}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="category"
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
      <Grid item xs={12} sm={5}>
        <TextField
          required
          fullWidth
          id="value"
          label="Value"
          name="value"
          autoComplete="value"
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton aria-label="add budget entry" type="submit">
            <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
    </Box>
    )
  }

  const initData = []

  const [preparedTableData, setPreparedTableData] = useState(initData)
  const [categories, setCategories] = useState([])
  const [currentSum, setCurrentSum] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [selectedRow, setSelectedRow] = useState(0)
  const [isRowSelected, setIsRowSelected] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await API.getTransactionsCategories({company_id: 1,})
        const tableData = await API.getCompanyBudget({budget_id: 1, transaction_type: 1})
        const getCurrent = await API.getCategoryTransactions({ category_id: 1 })//ta sama wartość dla wszystkich !! do zmiany

        setCategories(categories.data)
        setCurrentSum(getCurrent.data)
        setTableData(tableData.data)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (isLoading && tableData.length === 0) {
      fetchData();
    }

  }, [])

  useEffect(() => {
    if (!isLoading) {
      const preparedData = tableData.map((item) => [
        item?.id,
        categories.find((obj) => obj['id'] === item?.category).name,
        item?.value,
        currentSum,
        Number(item?.value - currentSum),
      ]);
  
      setPreparedTableData(preparedData);
    }
  }, [isLoading]);
  

  const onRowsDelete = (rowsDeleted, data) => {
    const deleteRow = async () => {
      return API.deleteBudgetEntry({pk: selectedRow})
    }
    deleteRow()
  }

  
  const onRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    if (isRowSelected) {
      setSelectedRow(0)
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
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>

      <EnhancedTableToolbar />
      <ExpensesForm/>
      <MUIDataTable
        // title={"Expenses"}
        data={preparedTableData}
        columns={columns}
        options={options}
      />
    </Paper>
  );
}