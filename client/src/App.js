import './App.css';
import { Container, TextField, Button, Grid, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container fixed>
        <Grid spacing={20}>
          <TextField id="outlined-basic" label="Enter Website URL" fullWidth variant="outlined" />
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Grid>
        <Divider />
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} > {value}</Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
