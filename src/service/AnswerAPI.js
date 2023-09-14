import API_URL from '../const/Constant'
import authService from "./AuthService";

const answerAPI = {
    add(data) {
        return fetch(API_URL + "/app/answers/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data)
        });
    }
}
export default answerAPI;