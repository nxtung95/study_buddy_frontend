import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import API_URL from "../../const/Constant";
import Messages from "./Messages";
import Input from "./Input";
import "./Chat.css";
import {useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";

const ChatMessage = ({openDialogChat, handleCloseDialogChat, question}) => {
    const [messages, setMessages] = useState([])
    const currentUser = useSelector(state => state.user.currentUser);
    var clientChat;

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (data) => {
        console.log('New Message Received!!', data);
        const allMessage = [...messages, data];
        setMessages(allMessage);
    }

    let onSendMessage = (msgText) => {
        const username = currentUser.firstName + " " + currentUser.lastName;
        const data = {
            'sender': username,
            'content': msgText,
            'questionId': question.id
        }
        clientChat.sendMessage('/message/chat/send', JSON.stringify(data));
        // const allMessage = [...messages, data];
        // setMessages(allMessage);
    }

    const setClientChat = (client) => {
        clientChat = client;
    }

    return (
        <Dialog
            open={openDialogChat}
            onClose={handleCloseDialogChat}
            fullWidth
            style={{minWidth: "600px"}}
        >
            <DialogTitle id="alert-dialog-title">
                {"Chat with tutor"}
            </DialogTitle>
            <DialogContent>
                <div className="AppChat">
                    {
                        currentUser && (
                            <React.Fragment>
                                <SockJsClient
                                    url={API_URL + "/ws-chat/"}
                                    topics={['/topic/question' + question.id]}
                                    onConnect={onConnected}
                                    onDisconnect={console.log("Disconnected!")}
                                    onMessage={msg => onMessageReceived(msg)}
                                    ref={(client) => setClientChat(client)}
                                    debug={false}
                                />
                                <Messages
                                    messages={messages}
                                    currentUser={currentUser}
                                />
                                <Input onSendMessage={onSendMessage} />
                            </React.Fragment>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChatMessage;