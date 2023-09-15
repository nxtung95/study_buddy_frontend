import API_URL from "../const/Constant";
import authService from "./AuthService";

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return fetch(API_URL + "/app/chat/messages/" + groupId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            }
        });
    },

    sendMessage: (username, text) => {
        const msg = {
            sender: username,
            content: text
        }

        return fetch(API_URL + "/app/chat/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(msg),
        });
    }
}


export default chatAPI;