import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Crypto from "./pages/crypto/Crypto";
import Groups from "./pages/groups/Groups"; 
import ChatsPage from "./pages/groups/ChatsPage";
import ToDoList from "./pages/todo/ToDoList";
import Marketplace from "./pages/marketplace/Marketplace";
import Vpn from "./pages/vpn/Vpn";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/crypto">
          <Crypto /> 
        </Route>
        <Route path="/groups">
          <Groups />
          </Route>
          <Route path="/groups">
          <ChatsPage /> 
        </Route>
        <Route path="/todo">
          <ToDoList /> 
       </Route>
       <Route path="/marketplace">
          <Marketplace /> 
       </Route>
       <Route path="/vpn">
          <Vpn /> 
       </Route>
      </Switch>
    </Router>
  );
}

export default App;
