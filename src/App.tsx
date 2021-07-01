import React from 'react';
import Home from './client/pages/home/home';
import Chat from './client/pages/chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

function App() {

    return (
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="*">
                        <div>404</div>
                    </Route>
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default App;
