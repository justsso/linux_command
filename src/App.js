import React from 'react';
import './App.css';
import Index from "./pages/Index";
import Detail from "./pages/Detail/Detail";
import List from "./pages/List/List";
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";
import {Layout} from "antd";

const {Header, Content, Footer} = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <Content style={{background: '#fff'}}>
                    <Switch>
                        <Route path="/" exact children={<Index/>}/>
                        <Route path="/detail" children={<Detail/>}>
                        </Route>
                        <Route path='/list' children={<List/>}>
                        </Route>
                    </Switch>
                </Content>
                <Footer style={{background: '#fff'}}/>
            </Layout>
        </Router>
    );
}

export default App;
