import React from 'react';
import './App.css';
import Index from "./pages/Index";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout} from "antd";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

const {Content, Footer} = Layout;

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact children={<Main/>}/>
                <Route path={"/first"} exact children={<Index/>}/>
                <Route path={'/home'} exact children={<Home/>}/>
                <Route path={'/search'} exact children={<Search/>}/>
            </Switch>
        </Router>
    );
}

export default App;
