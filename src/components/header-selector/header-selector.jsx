import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTyes from 'prop-types' // pass value to parent comp
/**
 * Header Selector Component
 */
export default class HeaderSelector extends Component {

    static propTypes = {
        setHeader: PropTyes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props);
        this.headerList = [];
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: 'Avatar ' + (i + 1),
                icon: require(`../../assets/img/avatar${i + 1}.png`).default // not use import
            })
        }
    }

    handleClick = ({ text, icon }) => {
        //update current comp status
        this.setState({ icon })
        //update parent comp status
        this.props.setHeader(text.toLowerCase().split(" ").join("")); // make 'Avatar 1' to 'avatar1' for searching path
    }

    render() {
        const { icon } = this.state
        const listHeader = !icon ? 'Please select your avatar' : (
            <div>
                <p>
                    Your choice: <img src={icon} alt='header' />
                </p>
            </div>
        );

        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} columnNum={5}
                    onClick={this.handleClick} />
            </List>
        )
    }
}
