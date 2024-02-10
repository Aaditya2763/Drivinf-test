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
import Link from '@mui/material/Link';
import { Link as ReactLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/actions/authActions';
import { useEffect } from 'react';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Logout'];

function NavbarBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store.auth);
  const { user } = storeData;


   const  userdata=localStorage.getItem('userData');
     const loginuser=JSON.parse(userdata);

  const profilePhoto = loginuser?loginuser.profilePhoto:"";
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [toggleTheme, setToggleTheme] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler=async()=>{
    await dispatch(logoutAction());
    
    navigate("/")
    window.location.reload();
  }

  useEffect(() => {
    
  }, [loginuser,dispatch])
  
  return (
    <AppBar position="static" enableColorOnDark style={{ backgroundColor: '' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <img
            src="https://img.freepik.com/premium-vector/cardrivingcarlogodrivingschoolsteeringwheellogovector2024_509644-247.jpg"
            width={70}
            height={70}
            style={{ borderRadius: '50%' }}
            alt="logo"
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
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
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
            ></Menu>
          </Box>

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
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {(loginuser || user) ? (
              <Stack spacing={{ xs: 2 }} direction={{ xs: 'column', md: 'row' }} color={'white'} sx={{display:{xs:'flex',alignItems:"center", padding: 10}}}>
                <ReactLink to="/dashboard">
                  <Button style={{ border: '1px solid white', color: 'white' }}>Dashboard</Button>
                </ReactLink>
                <ReactLink to="/register">
                  <Button style={{ border: '1px solid white', color: 'white' }}>Register Test</Button>
                </ReactLink>
                <Tooltip title="Theme">
                  <IconButton sx={{ p: 0 }} onClick={() => setToggleTheme(!toggleTheme)}>
                    {toggleTheme ? (
                      <DarkModeIcon color="inherit" style={{ fontSize: 30, color: 'white' }} />
                    ) : (
                      <WbSunnyIcon style={{ fontSize: 35, color: 'white' }} />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {(loginuser && profilePhoto) ? (
            <Avatar
              alt="Remy Sharp"
              src={profilePhoto}
            />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
            />
          )}
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Stack spacing={{ xs: 1 }} direction="row" color={'white'}>
                <Link href="/login">
                  <Button style={{ border: '1px solid white', color: 'white' }}>Login</Button>
                </Link>
                <Link href="/Signup">
                  <Button style={{ border: '1px solid white', color: 'white' }}>Signup</Button>
                </Link>
              </Stack>
            )}

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
               <ReactLink to={setting.toLowerCase() === "logout" ? "/logout" : `/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: '#1976d2' }}>

                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={setting.toLowerCase()==="logout"?logoutHandler:""}>{setting}</Typography>
                  </MenuItem>
                </ReactLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarBox;
