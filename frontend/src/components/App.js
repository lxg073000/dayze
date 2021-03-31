import "../../src/App.scss";
import { Route } from "react-router-dom";
import Splash from "../components/splash";
import SignUp from "../components/session/signup_form_container";
import Calendar from "../components/calendar/calendar_container";
import React from "react";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Splash} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={SignUp} />
    </div>
  );
};

export default App;
