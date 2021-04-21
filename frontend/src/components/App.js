import "../../src/App.scss";
import { Route } from "react-router-dom";
import Splash from "../components/splash";
import SignUp from "../components/session/signup_form_container";
import LogIn from "../components/session/login_form_container";
// import Calendar from "../components/calendar/calendar_container";
// import hub from "../components/profile/dayze_hub";
import UserCalendarHub from "../components/profile/current_user_container";
import React from "react";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Splash} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route exact path="/user" component={UserCalendarHub} />
      <Route path="/calendar" component={UserCalendarHub} />
    </div>
  );
};

export default App;
