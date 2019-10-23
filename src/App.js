import React from 'react';
import './App.css';
import Index from "./pages/Index";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout} from "antd";
import Main from "./pages/Main/Main";

const {Content, Footer} = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <Content style={{background: '#fff'}}>
                    <Switch>
                        <Route path="/" exact children={<Main/>}/>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
