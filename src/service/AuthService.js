const authService = {
    authHeader() {
        const token = localStorage.getItem("token");

        if (token) {
            return {
                headers: {
                    Authorization: "Bearer " + token
                }
            };
        } else {
            return {};
        }
    }
}

export default authService;