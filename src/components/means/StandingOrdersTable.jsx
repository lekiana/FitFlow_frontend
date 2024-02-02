import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Toolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import API from '../../api/apiClient'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'

const company_id = localStorage.getItem("company-id")
const currency = localStorage.getItem("currency")

export default function StandingOrdersTable( {categories, accounts, isContainerLoading, setMeansUpdate} ) {
  const [preparedTableData, setPreparedTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])

  const expenseCategories = categories.filter(item => item.type === 2)

  function createData(id, title, value, date, interval, accountId, account, categoryId, category) {
    return {
      id, 
      title,
      value,
      accountId,
      categoryId,
      details: [
        {
          date: date,
          interval: interval,
          account: account,
          category: category,
        },
      ],
    }
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
              Standing Orders
          </Typography>
        </Toolbar>
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
  }

  function compareDates(date) {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    const due_date = new Date(date)
    const color = formattedDate >= date ? '#ff6a4e' : '#ffffff'
    console.log(formattedDate >= date)
    return color
  }

  function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    const backgroundColor = compareDates(row.details[0].date)
  
    return (
      <React.Fragment>

        <TableRow sx={{ '& > *': { borderBottom: 'unset'}, backgroundColor: backgroundColor}}>
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
  
          <TableCell align="right">
          <IconButton size="small" onClick={() => executeStandingOrder(row)}>
            <CheckCircleIcon />
          </IconButton>
            <IconButton size="small" onClick={() => deleteStandingOrder(row)}>
            <RemoveCircleIcon/>
          </IconButton>
          </TableCell>
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
                    <TableCell>Interval [days]</TableCell>
                      <TableCell align="left">Account</TableCell>
                      <TableCell align="left">Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.details.map((detailRow) => (
                      <TableRow key={detailRow.date}>
                        <TableCell component="th" scope="row">{detailRow.date}</TableCell>
                        <TableCell component="th" scope="row">{detailRow.interval}</TableCell>
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
    )
  }

  function addStandingOrder(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setIsLoading(true)

    API.addStandingOrder({value: data.get('value'), title: data.get('title'), due_date: data.get('date'), interval: data.get('interval'),  currency: 1, means: data.get('account'), category: data.get('category')})
      .then(response => {
        fetchData()
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }

  function StandingOrderForm() {
    return (
    <Box component="form" sx={{ m: 3 }} onSubmit={addStandingOrder}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              required
              id="category"
              name="category"
              label="Category"
            >
              {expenseCategories.map((categoryOption) => (
                <MenuItem key={categoryOption.id} value={categoryOption.id}>
                  {categoryOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            fullWidth
            id="value"
            label="Value"
            name="value"
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Account</InputLabel>
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
              autoComplete="date"
            />
          </Tooltip>
        </Grid>

        <Grid item xs={3}>
          <TextField
            required
            fullWidth
            id="interval"
            label="Interval [days]"
            name="interval"
            autoComplete="interval"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
          />
        </Grid>

        <Grid item>
          <IconButton aria-label="add budget entry" type="submit">
              <AddCircleIcon />
          </IconButton>
        </Grid>

      </Grid>
    </Box>
    )
  }

  function getCurrentDate() {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') //months are indexed from 0 to 11
    const day = String(currentDate.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  }

  function executeStandingOrder(row) {
    const data = row
    setIsLoading(true)
    API.addTransaction({value: data.value, title: data.title, date: getCurrentDate(), currency: 1, means: data.accountId, category: data.categoryId})
      .then(response => {
        API.updateStandingOrder({pk: data.id}).then(response => {
          fetchData()
          setMeansUpdate(true)
        })
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }

  function deleteStandingOrder(row) {
    setIsLoading(true)
    API.deleteStandingOrder({pk: row.id}).then(response => {
      fetchData()
    })
  }
  
  const fetchData = async () => {
    try {
      API.getStandingOrders({company_id: company_id,}).then( response => {
        setTableData(response.data)
        setIsLoading(false)
        setMeansUpdate(true)
      })

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (isLoading && tableData.length === 0) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !isContainerLoading) {
      const preparedData = tableData.map((item) => {
        const account = accounts.find((obj) => obj['id'] === item?.means).name
        const category = expenseCategories.find((obj) => obj['id'] === item?.category).name
        return createData(item?.id, item?.title, item?.value, item?.due_date, item?.interval, item?.means, account, item?.category, category)
      })
      setPreparedTableData(preparedData)
    }
  }, [isLoading, isContainerLoading])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <EnhancedTableToolbar />
      <StandingOrderForm />
      <TableContainer component={Paper} sx={{}}>  
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Title</TableCell>
              <TableCell align="right">Value [{currency}]</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {preparedTableData.map((row) => (
              <Row key={row.title} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
