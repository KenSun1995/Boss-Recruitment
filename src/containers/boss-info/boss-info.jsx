/**
 * Boss Info Router Container
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { update } from '../../redux/actions'

class BossInfo extends Component {
    state = { // same with database data name
        header: '',
        position: '',
        company: '',
        salary: '',
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
                <NavBar>Complete Boss Info</NavBar>
                <HeaderSelector setHeader={this.setHeader} /> {/** want to make sub-comp pass value to parent comp */}
                <InputItem placeholder="Please enter hiring position" onChange={val => { this.handleChange('position', val) }}>Position:</InputItem>
                <InputItem placeholder="Please enter company name" onChange={val => { this.handleChange('company', val) }}>Company:</InputItem>
                <InputItem placeholder="Please enter salary" onChange={val => { this.handleChange('salary', val) }}>Salary:</InputItem>
                <TextareaItem placeholder="Please enter your requirement" title="Info:" rows={3} onChange={val => { this.handleChange('info', val) }} />
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => (
        { user: state.user1 }
    ),
    { update }
)(BossInfo)
