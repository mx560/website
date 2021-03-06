import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import css from './style.module.less';

const address = '10.11.4.195:3999';

const socket = new WebSocket(`ws://${address}`);

const Chat = () => {

    const [status, setStatus] = useState('连接服务器中...')
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [receiveMessage, setReceiveMessage] = useState<string[]>([])
    const receivedMessageRef = useRef<string[]>(receiveMessage);
    receivedMessageRef.current = receiveMessage;

    const handleSend = () => {
        socket.send(message);
        setMessage('');
    }

    const handleMessageChange = (v) => {
        setMessage(v.target.value)
    }

    useEffect(() => {
        socket.addEventListener('open', () => {
            setStatus('连接成功');
        });
        socket.addEventListener('message', (receivedMessage) => {
            setReceiveMessage(receivedMessageRef.current.concat([receivedMessage.data]));
        })
    }, []);

    return (
        <div className={css.chat}>
            <div className={css.main}>
                <div className={css.chatList}></div>
                <div className={css.content}>
                    <div className={css.head}></div>
                    <div className={css.messages}>
                        {
                            receiveMessage.map((msg, index) => {
                                return <div className={css.message} key={`received_message_${index}`}>{msg}</div>
                            })
                        }
                    </div>
                    <div className={css.editor}>
                        <Input.TextArea bordered={false} className={css.textArea} value={message} onChange={handleMessageChange} onPressEnter={handleSend}/>
                        <div className={css.btnContainer}>
                            <Button  size={'small'} onClick={handleSend} className={css.sendBtn}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.foot}>
                <span>服务器状态:[{address}]{status}</span>
            </div>
        </div>
    );
};

export default Chat;
