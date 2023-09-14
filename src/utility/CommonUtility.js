const commonUtility = {
    isSuccess(code) {
        if (code != null && code !== "" && code === '00') {
            return true;
        }
        return false;
    },

    checkNullOrEmpty(str) {
        return (str == null || str === "");
    },

    isFail(code) {
        if (code == null && code === "" && code !== '00') {
            return true;
        }
        return false;
    },

    checkRoleUser(role) {
        if (role !== null && role !== "" && role === "student") {
            return true;
        }
        return false;
    }
}

export default commonUtility;