import API_URL from '../const/Constant'
import authService from "./AuthService";

const userAPI = {
    register(data) {
        return fetch(API_URL + "/app/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    login(data) {
        return fetch(API_URL + "/app/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    findTutor() {
        return fetch(API_URL + "/app/user/tutors", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            }
        });
    },
}
export default userAPI;