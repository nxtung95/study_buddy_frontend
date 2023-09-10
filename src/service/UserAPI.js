import API_URL from '../const/APIConstant'

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
}
export default userAPI;