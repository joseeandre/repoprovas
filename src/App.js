import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import HomePage from "./components/Homepage/Homepage";

export default function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [clientInformations, setClientInformations] = useState(null);
    return (
        <UserContext.Provider value={{ isLogged, setIsLogged, clientInformations, setClientInformations }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/sign-up" exact component={SignUp} />
                    <Route path="/home" exact component={HomePage} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}