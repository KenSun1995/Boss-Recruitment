import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item;

// hope use router library api in un-router component?
// withRoute()
class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }

    render() {
        let { navList, unReadCount } = this.props;
        const { pathname } = this.props.location;
        // filter hide = true item
        navList = navList.filter(nav => !nav.hide);
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.path}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            title={nav.text}
                            icon={{ uri: require(`./images/${nav.icon}.png`).default }}
                            selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`).default }}
                            selected={pathname === nav.path}
                            onPress={() => { this.props.history.replace(nav.path) }}
                        ></Item>
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter) // export withRouter(NavFooter), this component will get history, location, math.....
