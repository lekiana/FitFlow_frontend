
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(title, value, date, account, category, provider) {
  return {
    title,
    value,
    date,
    account,
    category,
    provider,
    details: [
      {
        date: '2020-01-05',
        account: 3,
        category: 'income',
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'}}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.value}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell>Due date</TableCell>
                    <TableCell align="left">Account</TableCell>
                    <TableCell align="left">Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailRow) => (
                    <TableRow key={detailRow.date}>
                     <TableCell component="th" scope="row">{detailRow.date}</TableCell>
                      <TableCell align="left">{detailRow.account}</TableCell>
                      <TableCell align="left">{detailRow.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    value: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

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
            Standing Orders
        </Typography>
      </Toolbar>
    );
  }

const rows = [
  createData('in', 159),
  createData('out', 111),
  createData('in', 262),
  createData('out', 305),
  createData('in', 356),
];

export default function StandingOrdersTable() {
  return (//width: '70%'
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
    <EnhancedTableToolbar />
    <TableContainer component={Paper} sx={{}}>  
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="right">Value&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
