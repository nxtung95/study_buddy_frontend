import API_URL from '../const/Constant'
import authService from "./AuthService";

const questionAPI = {
    add(data) {
        return fetch(API_URL + "/app/questions/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authService.getAccessTokenHeader()
            },
            body: JSON.stringify(data),
        });
    },

    // edit(data) {
    //     return fetch(API_URL + "/app/subjects/edit", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + authService.getAccessTokenHeader()
    //         },
    //         body: JSON.stringify(data),
    //     });
    // },
    //
    // delete(data) {
    //     return fetch(API_URL + "/app/subjects/delete/" + data, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + authService.getAccessTokenHeader()
    //         },
    //     });
    // },
}
export default questionAPI;