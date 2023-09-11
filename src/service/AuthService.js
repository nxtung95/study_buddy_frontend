const authService = {
    getAccessTokenHeader() {
        const token = localStorage.getItem("access_token");
        return token;
    }
}

export default authService;