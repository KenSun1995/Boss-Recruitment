import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

/**
 *  group chatMsgs by chat_id, get last item
 * 1. find out last msg for each chat, and store it by obj container {chat_id: lastMsgs}
 * 2. get all array of lastMsgs
 * 3. sort the array by (create_time desc)
 */
function getLastMsgs(chatMsgs, userId) {
    const lastMsgObjs = {};
    chatMsgs.forEach(msg => {
        if (msg.to === userId && !msg.read) {
            msg.unReadCount = 1; // just is a flag: 0 or 1
        } else {
            msg.unReadCount = 0;
        }
        const chatId = msg.chat_id;
        const lastMsg = lastMsgObjs[chatId];
        if (!lastMsg) {
            lastMsgObjs[chatId] = msg;
        } else {
            // save already count the number
            const unReadCount = lastMsg.unReadCount;
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg;
            }
            lastMsgObjs[chatId].unReadCount = unReadCount + msg.unReadCount;
        }
    })
    let lastMsgs = Object.values(lastMsgObjs); // lastMsgObjs is obj container, to get array with all values
    lastMsgs.sort((m1, m2) => { // if result < 0, put m1 first, if result = 0, don't do anything, if result > 0, put m2 first
        return m2.create_time - m1.create_time
    });
    return lastMsgs;
}

class Message extends Component {

    render() {
        const { user } = this.props;
        const { users, chatMsgs } = this.props.chat;
        const lastMsgs = getLastMsgs(chatMsgs, user._id);
        return (
            <List style={{ marginTop: 50, marginBottom: 40 }}>
                {
                    lastMsgs.map(msg => {
                        const targetUserId = msg.to === user._id ? msg.from : msg.to;
                        const targetUser = users[targetUserId];
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={targetUser.header ? require(`../../assets/img/${targetUser.header}.png`).default : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}
export default connect(
    state => ({ user: state.user1, chat: state.chat1 }),
    {}
)(Message)