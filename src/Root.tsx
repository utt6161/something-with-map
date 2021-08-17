import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import Map from "./components/Map/Map";

const Root = () => {
    return(
        <>
            <Router>
                <Switch>
                    <Route exact path="/" >
                        <Map scale={250} cx={100} cy={400} />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </>
    )
}

export default Root;