/**
 * personal center router page
 */
import React from 'react'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
class PersonalCenter extends React.Component {

    signOut = () => {
        Modal.alert('Sign Out', 'Are you sure to sign out?', [
            {
                text: 'Cancel',
                onPress: () => console.log('cancel')
            },
            {
                text: 'Confirm',
                onPress: () => {
                    // clear cookie: userid
                    Cookies.remove('userId')
                    // reset redux: state of user
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const { username, header, company, position, salary, info } = this.props.user;
        return (
            <div style={{ marginBottom: 50, marginTop: 45 }}>
                <Result
                    img={<img src={require(`../../assets/img/${header}.png`).default} style={{ width: 50 }}
                        alt="header" />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => 'Related Info'}>
                    <Item multipleLine>
                        <Brief>Position: {position}</Brief>
                        <Brief>Brief: {info}</Brief>
                        {salary ? <Brief>Salary: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.signOut}>Sign Out</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user1 }),
    { resetUser }
)(PersonalCenter)