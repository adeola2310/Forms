import React from 'react';
import Home from "./home/home";
import Dashboard from "./pages/dashboard";
import {Route, BrowserRouter as Router} from 'react-router-dom';

function App () {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Home}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Router>
        </div>
    );
}

export default App;
