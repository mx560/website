import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import css from './style.module.css';

const socket = new WebSocket('ws://127.0.0.1:3999');

const Chat = () => {

    const [status, setStatus] = useState('连接服务器中...')
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [receiveMessage, setReceiveMessage] = useState<string[]>([])
    const receivedMessageRef = useRef<string[]>(receiveMessage);
    receivedMessageRef.current = receiveMessage;

    const handleSend = () => {
        socket.send(message);
        // setMessage('');
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
                    {
                        receiveMessage.map((msg, index) => {
                            return <div className={css.message} key={`received_message_${index}`}>{msg}</div>
                        })
                    }
                    <Input value={message} onChange={handleMessageChange} style={{width: 180, marginRight: 12}}/>
                    <Button type={'primary'} onClick={handleSend}>Send</Button>
                </div>
            </div>
            <div className={css.foot}>
                <span>服务器状态:{status}</span>
            </div>
        </div>
    );
};

export default Chat;
