import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import chatAPI from "../../service/ChatAPI";
import API_URL from "../../const/Constant";
import Messages from "./Messages";
import Input from "./Input";
import "./Chat.css";
import {useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ChatMessage = ({openDialogChat, setOpenDialogChat, handleCloseDialogChat}) => {
    const [messages, setMessages] = useState([])
    const currentUser = useSelector(state => state.user.currentUser);

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        setMessages(messages.concat(msg));
    }

    let onSendMessage = (msgText) => {
        const username = currentUser.firstName + " " + currentUser.lastName;
        chatAPI.sendMessage(username, msgText).then(res => {
        console.log('Sent', res);
        }).catch(err => {
            console.log('Error Occured while sending message to api');
        })
    }

    return (
        <Dialog
            open={openDialogChat}
            onClose={handleCloseDialogChat}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Chat"}
            </DialogTitle>
            <DialogContent>
                <div className="AppChat">
                    {
                        currentUser && (
                            <React.Fragment>
                                <SockJsClient
                                    url={API_URL + "/ws-chat/"}
                                    topics={['/topic/group/']}
                                    onConnect={onConnected}
                                    onDisconnect={console.log("Disconnected!")}
                                    onMessage={msg => onMessageReceived(msg)}
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