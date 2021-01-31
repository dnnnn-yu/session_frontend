import React from 'react';
import railsApi from '../config/route';

// Routing
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Top from './top/Top';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import ProfileForm from './profile/ProfileForm';

// App Bar & Drawer
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      textAlign: 'right'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface DrawerItemProps {
  url: string
  title: string
}

const App: React.FC = () => {
  const [loginStatus, setLoginStatus] = React.useState<boolean>(false);

  const loginCheck = () => {
    railsApi.authRequest({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid')
      },
      url: 'login_check',
    })
    .then(res => {
      if (res.status === 200) {
        setLoginStatus(true);
      }
    })
    .catch(() => {
      setLoginStatus(false);
    })
  };

  React.useEffect(() => {
    loginCheck();
  })

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerItem: React.FC<DrawerItemProps> = (props) => {
    return(
      <Link 
        style={{textDecoration: 'none', color: '#000000DE'}}
        to={props.url}
        onClick={()=>{handleDrawerToggle();}}
      >
        <ListItem button>
        <ListItemIcon>{props.children}</ListItemIcon>
        <ListItemText primary={props.title} />
        </ListItem>
      </Link>
    );
  };
  
  let drawer;
  if (loginStatus) {
    drawer = (
      <List>
        <ListItem style={{color: 'gray', justifyContent: 'flex-end'}}>
          <CloseIcon onClick={() => {handleDrawerToggle();}}/>
        </ListItem>
        <DrawerItem url='profile' title='プロフィール'>
          < AccountCircleIcon />
        </DrawerItem>
        <DrawerItem url='/' title='メッセージ'>
          <MailIcon />
        </DrawerItem>
        <DrawerItem url='/' title='保存記事'>
          < BookmarkBorderIcon />
        </DrawerItem>
        <ListItem button onClick={()=>{localStorage.clear(); window.location.href='/'}}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='ログアウト' />
        </ListItem>
      </List>
    );
  } else {
    drawer = (
      <List>
        <ListItem style={{color: 'gray', justifyContent: 'flex-end'}}>
          <CloseIcon onClick={() => {handleDrawerToggle();}}/>
        </ListItem>
        <DrawerItem url='sign_in' title='ログイン'>
          <ExitToAppIcon />
        </DrawerItem>
      </List>
   );
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" style={{backgroundColor: 'black'}}>
          <Toolbar style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Link style={{textDecoration: 'none', color: 'white'}} to='/'>
                <Typography variant="h5" noWrap>
                  Session!
                </Typography>
              </Link>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
              <MenuIcon className={classes.menuButton}/>
              
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor='right'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/sign_in" component={SignIn} />
            <Route path="/sign_up" component={SignUp} />
            <Route path="/profile" component={ProfileForm} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
