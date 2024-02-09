import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import{Link as ReactLink} from "react-router-dom"
import { Style } from '@mui/icons-material';
import { Stack } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];

const settings = ['Profile','Account', 'Logout'];


function NavbarBox() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loggedIn, setloggedIn] = React.useState(true);
  const [toggleTheme,settoggleTheme]=React.useState(false)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"  enableColorOnDark  style={{backgroundColor:""}}>
      <Container maxWidth="xl">
        <Toolbar >
          <img src='https://img.freepik.com/premium-vector/cardrivingcarlogodrivingschoolsteeringwheellogovector2024_509644-247.jpg'
          width={70}
          height={70}
          style={{borderRadius:"50%"}}
           />
          <Typography
            variant="h6"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                 <Link to={`${page.toLowerCase(page)}` }>
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                </Link>
              ))} */}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          
           
           
           {loggedIn ?   <Stack spacing={{ xs:2 }}  direction="row" color={'white'}>
           <ReactLink to="/dashboard"><Button style={{border:"1px solid white",color:"white"}}>Dashboard</Button></ReactLink>
              <Tooltip title="Theme">
                <IconButton  sx={{ p: 0 }} onClick={()=>settoggleTheme(!toggleTheme)}>
             {toggleTheme? <DarkModeIcon color='inherit' style={{fontSize:30, color:"white"}}/>:<WbSunnyIcon style={{fontSize:35,color:"white"}}/>}
              </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>  </Tooltip>
           </Stack>:<Stack spacing={{ xs:1 }}  direction="row" color={'white'}><Link href="/login"><Button style={{border:"1px solid white",color:"white"}}>Login</Button></Link>
              <Link href="/Signup"><Button style={{border:"1px solid white",color:"white"}}>Signup</Button></Link></Stack>}
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <ReactLink to={`/${setting.toLowerCase(setting)}`} style={{textDecoration:"none",color:"#1976d2"}}>
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem></ReactLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarBox;