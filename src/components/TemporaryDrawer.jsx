import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DifferenceIcon from '@mui/icons-material/Difference';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open)
  };

  const icons = [MonitorHeartRoundedIcon, GroupIcon, AccountBalanceWalletIcon, MonetizationOnIcon];
  const items = ['Dashboard', 'Users', 'Means', 'Budget'];
  const hrefs = ['/dashboard', '/users', '/means', '/budget']

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={hrefs[index % hrefs.length]}>
              <ListItemIcon>
              {React.createElement(icons[index % icons.length])}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
        >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>

  );
}