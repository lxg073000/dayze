import "../../src/App.scss";
import { Route } from "react-router-dom";
import Splash from "./session/spash_container";
import SignUp from "../components/session/signup_form_container";
import LogIn from "../components/session/login_form_container";
import UserCalendarHub from "../components/profile/current_user_container";
import Authorized from "../components/profile/authorized";
import React from "react";
import Notification from '../components/notifications/notification'

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Splash} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route exact path="/user" component={UserCalendarHub} />
      <Route exact path="/user/granted" component={UserCalendarHub} />
      <Route exact path="/authorized" component={Authorized} />
      <Route  path="/notification" component={Notification}/>
    </div>
  );
};

export default App;
