import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Country from './Country';
import States from './States'
import Header from './Header';
import District from './District';
import { Route, Switch } from 'react-router-dom';
// import States2 from './States2';

function App() {
  return (
   <><Header />
   <Switch>
     <Route exact path='/covid-tracker' component={States} ></Route>
     <Route exact path='/Country' component={Country} ></Route>
     <Route path='/District/:state' component={District} ></Route>
   </Switch>
   </>
  );
}

export default App; 