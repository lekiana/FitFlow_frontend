import * as React from 'react';
import { useEffect } from 'react';
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
import { getCompanyUsers } from '../store/getCompanyUsersSlice';
import { useSelector, useDispatch } from 'react-redux';

const columns = [
  {id: 'user', label: 'User'},
  {id: 'email', label: 'Email'},
  {id: 'last_login', label: 'Last login'},
  //{id: 'permissions', label: 'Permissions'},
];


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
          Users
      </Typography>
    </Toolbar>
  );
}


export default function UsersTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  const tableData = useSelector((state) => state.FitFlowReducer.getCompanyUsers.data)
  
  const preparedTableData = tableData.map((item) => {
    return {
      id: item?.id,
      user: (item?.first_name) + (item?.last_name),
      email: item?.email,
      //last_login: item?.last_login,
      //permissions: item?.
  }
  })

  console.log(preparedTableData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanyUsers({company_id: 1,}))
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
                  {column.label}
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