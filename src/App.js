import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Tasks from './pages/Tasks/Tasks';
import MyProfile from './pages/MyProfile/MyProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route  path="/tasks">
            <Tasks />
          </Route>
          <Route  path="/myProfile">
            <MyProfile />
          </Route>
          
          <Route  exact path = "/">
            <Redirect to="/register" />
          </Route>

          
        </Switch>
      </Router>

    </div>
  );
}

export default App;
