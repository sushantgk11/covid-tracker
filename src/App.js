import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Country from './Country';
import States from './States'
import Header from './Header';
import District from './District';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
   <><Header />
   <Switch>
     <Route path='/' component={States} ></Route>
     <Route exact path='/Country' component={Country} ></Route>
     <Route path='/District/:state' component={District} ></Route>
   </Switch>
   </>
  );
}

export default App; 