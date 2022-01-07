import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie' // enable to operate front-end cookie object set()/remove()

import BossInfo from '../boss-info/boss-info'
import ExpertInfo from '../expert-info/expert-info'
import Boss from '../boss/boss'
import Expert from '../expert/expert'
import Message from '../message/message'
import PersonalCenter from '../personal-center/personal-center'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'
import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'
import { NavBar } from 'antd-mobile'
/**
 * main component
 */
class Main extends Component {

    // component class and object
    // add attributes for component object
    navList = [
        {
            path: '/boss',
            component: Boss,
            title: 'Expert List',
            icon: 'expert',
            text: 'Expert',
        },
        {
            path: '/expert',
            component: Expert,
            title: 'Boss List',
            icon: 'boss',
            text: 'Boss',
        },
        {
            path: '/message',
            component: Message,
            title: 'Message List',
            icon: 'message',
            text: 'Message',
        },
        {
            path: '/personal-center',
            component: PersonalCenter,
            title: 'User Center',
            icon: 'personal',
            text: 'Personal',
        }
    ]

    componentDidMount() {
        // logged in, but currently no logged in, send request to get user info
        const userId = Cookies.get('userId');
        const { _id } = this.props.user;
        if (userId && !_id) {
            // send async request
            this.props.getUser();
        }
    }

    render() {
        // read userId from cookie, 
        // if no, redirect to login page
        // if yes, get user status of redux, 
        //      if there is no _id in user, return null (don't do any reaction)
        //      if there is _id in user, show relevant page, according to user's type and header to calculate a redirect path, and auto redirect it
        const userId = Cookies.get('userId');
        if (!userId) {
            return <Redirect to={'/login'} />
        }
        const { user, unReadCount } = this.props;
        if (!user._id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if (path === '/') {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path} />
            }
        }

        const { navList } = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find((nav) => { // maybe true or false
            return nav.path === path;
        });

        if (currentNav) {
            // decide to hide some item
            if (user.type === 'boss') {
                navList[1].hide = true;
            } else {
                navList[0].hide = true;
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} component={nav.component} />)
                    }
                    <Route path='/bossInfo' component={BossInfo} />
                    <Route path='/expertInfo' component={ExpertInfo} />
                    <Route path='/chat/:userId' component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user1, unReadCount: state.chat1.unReadCount }),
    { getUser }
)(Main)

/**
 * need to implement login automatic
 * * 1. if cookie includes userId (login in the past but right now no), send request to get user, don't do any perform temporary
 * * 2. if cookie doesn't include userId, auto go into login page
 */
/**
 * if already login, if request /
 * * according to user's type and header to calculate a redirect path, and auto redirect it
 * *
 */