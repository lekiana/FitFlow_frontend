import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getCompanyTransactions } from '../store/getCompanyTransactionsSlice';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import '../containers/Dashboard.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import API from "../api/apiClient"

const columns = [
  { id: 'date', label: 'Date'},
  { id: 'title', label: 'Title'},
  {
    id: 'category',
    label: 'Category',
    // align: 'right',
  },
  {
    id: 'account',
    label: 'Account',
    // align: 'right',
  },
  {
    id: 'value',
    label: 'Value ($)',
    // align: 'right',
  },
];

export default function TransactionsTable() {

  function clearFields() {
    setRowData({
      date: '',
      title: '',
      category: '',
      account: '',
      value: '',
    })
  }

  function addT() {
    API.addTransaction({value: rowData["value"], title: rowData["title"], date: rowData["date"], currency: 1, means: rowData["account"], category: rowData["category"]})
      .then(response => {
      console.log(response)
      dispatch(getCompanyTransactions({company_id: 1,}))
      clearFields()
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }

  function EnhancedTableToolbar() {
    return (
      <Toolbar 
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
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
  
        <IconButton aria-label="add a transaction" onClick={addT}>
          <AddCircleIcon />
        </IconButton>
  
      </Toolbar>
    );
  }

  const [rowData, setRowData] = useState({
    date: '',
    title: '',
    category: '',
    account: '',
    value: '',
  });

  const handleTextFieldChange = (event) => {
    setRowData({
      ...rowData,
      [event.target.id]: event.target.value
    })
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  //const {loading: tableLoading} = useSelector((state) => state.FitFlowReducer.getCompanyTransactions)
  const tableData = useSelector((state) => state.FitFlowReducer.getCompanyTransactions.data)
  
  //const adjustedColumns = tableLoading ? renderSkeleton(columns) : columns
  const preparedTableData = tableData.map((item) => {
    console.log(item)
    return {
      id: item?.id,
      date: item?.date, 
      title: item?.title,
      category: item?.category,
      account: item?.means,
      value: item?.value
  }
  })
  //const adjustedTableData = tableLoading ? Array.from(Array(3), () => []) : preparedTableData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanyTransactions({company_id: 1,}))
  }, [])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EnhancedTableToolbar />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TextField id={column.id} label={column.label} value={rowData[column.id]} variant="outlined" onChange={handleTextFieldChange} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {preparedTableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={preparedTableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}