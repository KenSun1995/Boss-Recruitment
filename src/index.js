import React from 'react'
import ReactDOM from 'react-dom'
// import { Button } from 'antd-mobile'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import Main from './containers/main/main'
import Login from './containers/login/login'
import Register from './containers/register/register'
import './assets/css/index.less'

// import './test/socketio_test'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route component={Main} />
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))