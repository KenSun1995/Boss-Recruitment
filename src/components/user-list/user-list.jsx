/**
 * user List UI component
 */
import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const { userList } = this.props;

        return (
            <WingBlank style={{ marginBottom: 50, marginTop: 45 }}>
                <QueueAnim type='left' delay={100}>
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace />
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={user.header && require(`../../assets/img/${user.header}.png`).default}
                                        extra={user.username}
                                    />
                                    <Body>
                                        <div>Position: {user.position}</div>
                                        {user.company ? <div>Company: {user.company}</div> : null}
                                        {user.salary ? <div>Salary: {user.salary}</div> : null}
                                        <div>Description: {user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)