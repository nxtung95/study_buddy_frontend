import API_URL from '../const/Constant'
import authService from "./AuthService";

const subjectAPI = {
    add(data) {
        return fetch(API_URL + "/app/subjects/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data),
        });
    },

    edit(data) {
        return fetch(API_URL + "/app/subjects/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data),
        });
    },

    delete(data) {
        return fetch(API_URL + "/app/subjects/delete/" + data, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
        });
    },

    view(data) {
        return fetch(API_URL + "/app/subjects/view/" + data, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
        });
    },
}
export default subjectAPI;