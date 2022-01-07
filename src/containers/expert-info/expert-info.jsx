/**
 * Expert Info Router Container
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { update } from '../../redux/actions'

class Expert extends Component {
    state = { // same with database data name
        header: '',
        position: '',
        info: ''
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    // update header status
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    save = () => {
        this.props.update(this.state);
    }

    render() {
        const { header, type } = this.props.user;
        if (header) { // will redirect
            const path = type === 'boss' ? '/boss' : '/expert';
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>Complete Expert Info</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder="Please enter your asking position" onChange={val => { this.handleChange('position', val) }}>Position:</InputItem>
                <TextareaItem placeholder="Please enter yourself introduction" title="Intro:" rows={3} onChange={val => { this.handleChange('info', val) }} />
                <Button type='primary' onClick={this.save} >Save</Button>
            </div>
        )
    }
}

export default connect(
    state => (
        { user: state.user1 }
    ),
    { update }
)(Expert)
