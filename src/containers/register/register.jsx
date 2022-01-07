import React, { Component } from 'react'
/*
    register component
 */
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'expert'
    }

    // deal with input field / check box changes, collect data to state
    handleChange = (name, value) => {
        this.setState({ [name]: value })
    }
    // skip to login router
    toLogin = () => {
        this.props.history.replace('/login')
    }
    // register
    register = () => {
        // console.log(JSON.stringify(this.state))
        this.props.register(this.state);
    }

    render() {
        const { type } = this.state
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
                        <InputItem
                            type='password'
                            placeholder='Confirm your password'
                            onChange={val => this.handleChange('password2', val)}
                        >
                            Confirm:
                        </InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span style={{ marginRight: 30 }}>User Type:</span>
                            <Radio checked={type === 'expert'}
                                onClick={() => { this.handleChange('type', 'expert') }}>&nbsp;Expert</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'boss'}
                                onClick={() => { this.handleChange('type', 'boss') }}>&nbsp;Boss</Radio>
                        </List.Item>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.register}>Register
                        </Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>Already have an account</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user1
    }),
    { register }
)(Register)