import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Logout from '../../../containers/public/Authentication/Logout';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './NavBar.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: '2%',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'black' }} >
        <Toolbar>
          <Link id="dashboard-link" to='/dashboard' className={classes.title}>Dashboard</Link>
          <Logout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;