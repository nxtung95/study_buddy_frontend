import React from 'react'

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (message) => {
        const { sender, content } = message;
        const username = currentUser.firstName + " " + currentUser.lastName;
        const messageFromMe = username === message.sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{ backgroundColor: "#FBA" }}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}


export default Messages;