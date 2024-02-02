import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import TemporaryDrawer from '../components/TemporaryDrawer'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'


export default function NavBar() {
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    authCtx.logout()
    navigate("/")
  }

  const company_name = localStorage.getItem("company-name")

  return (
    <AppBar position="static" sx={{backgroundColor: "#01579b"}}>
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {company_name}
        </Typography>
        
        {auth && (
          <div>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
