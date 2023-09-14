import API_URL from '../const/Constant'
import authService from "./AuthService";

const cardAPI = {
    add(data) {
        return fetch(API_URL + "/app/questions/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data)
        });
    },

    view(data) {
        return fetch(API_URL + "/app/questions/view?subjectId=" + data.subjectId + "&questionId=" + data.questionId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            }
        });
    },

    update(data) {
        return fetch(API_URL + "/app/questions/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data)
        });
    },


    delete(data) {
        return fetch(API_URL + "/app/questions/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data)
        });
    },

    updateContact(data) {
        return fetch(API_URL + "/app/questions/updateContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data)
        });
    },
}
export default cardAPI;