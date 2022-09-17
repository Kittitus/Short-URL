import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/'exact>
          <Home />
        </Route>
        <Route path='/History'exact>
          <History />
        </Route>
      </Switch>
    </Router>
    </>

  );
}

export default App;
