import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import { sendMsg, readMsg } from '../../redux/actions'
const Item = List.Item
class Chat extends Component {

    state = {
        content: '',
        isShow: false // show emoji list or not
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentWillUnmount() {
        // update un read msg
        const targetId = this.props.match.params.userId;
        const userId = this.props.user._id;
        this.props.readMsg(targetId, userId);
    }

    // first render before
    UNSAFE_componentWillMount() {
        // init emoji list data
        const emojis = [
            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
            '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
            '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜',
            '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
            '🤨', '😐', '😑', '😶', '😶‍🌫️', '😏', '😒', '🙄',
            '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴',
            '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶'];
        this.emojis = emojis.map(emoji => ({ text: emoji }));
    }

    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const content = this.state.content.trim();
        // send request send msg
        if (content) {
            this.props.sendMsg({ from, to, content });
        }
        // clear input data
        this.setState({ content: '', isShow: false });
    }

    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({ isShow });
        if (isShow) {
            // fix bug, this bug is anti-mobile component internal bug, just fix it
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    render() {
        const { user } = this.props;
        const { users, chatMsgs } = this.props.chat;
        // filter chatMsgs
        const my_id = user._id;
        if (!users[my_id]) { // control async, async sometimes no data
            return null;
        }
        const target_id = this.props.match.params.userId;
        const chatId = [my_id, target_id].sort().join('_');
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

        // get target user header
        const target_header = users[target_id].header;
        const target_icon = target_header ? require(`../../assets/img/${target_header}.png`).default : null;

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left' />}
                    className='sticky-header'
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[target_id].username}
                </NavBar>
                <List style={{ marginTop: 50, marginBottom: 40 }}>
                    <QueueAnim type='left' delay={100}>
                        {
                            msgs.map(msg => {
                                if (my_id === msg.to) { // msg from the other
                                    return (
                                        <Item key={msg._id} thumb={target_icon}>
                                            {msg.content}
                                        </Item>
                                    )
                                } else {
                                    return (
                                        <Item key={msg._id} className='chat-me' extra='Me'>
                                            {msg.content}
                                        </Item>
                                    )
                                }
                            })
                        }
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="Please input your words"
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{ marginRight: 5 }}>😀</span>
                                <span onClick={this.handleSend}>Send</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text })
                            }}
                        />
                    ) : null}

                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user1, chat: state.chat1 }),
    { sendMsg, readMsg }
)(Chat)