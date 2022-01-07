import React, { Component } from 'react'
/**
 * login component
 */
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'

class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    // deal with input field / check box changes, collect data to state
    handleChange = (name, value) => {
        this.setState({ [name]: value })
    }
    // skip to register router
    toRegister = () => {
        this.props.history.replace('/register')
    }
    // login
    login = () => {
        // console.log(this.state)
        this.props.login(this.state);
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>Bob Recruitment - Mobile Version</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <InputItem
                            placeholder='Please input username'
                            onChange={val => this.handleChange('username', val)}
                        >
                            Username:
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            placeholder='Please input password'
                            onChange={val => this.handleChange('password', val)}
                        >
                            Password:
                        </InputItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.login}>Login
                        </Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>Don't have an account?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user1
    }), { login }
)(Login)