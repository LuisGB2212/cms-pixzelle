import axios from "axios";

export default {
    namespaced: true,

    state: {
        userData: null,
    },

    getters: {
        user: state => state.userData,
    },

    mutations: {
        setUserData(state, user) {
            if(user == null){
                state.userData = null;
            }else{
                state.userData = user.user.data;
            }
        }
    },

    actions: {
        getUserData({ commit }) {
            axios
            .get("/admin/user")
            .then(response => {
                commit("setUserData", response.data);
            })
            .catch(() => {
                localStorage.removeItem("authToken");
            });
        },

        sendLoginRequest({ commit }, data) {
            commit("setErrors", {}, { root: true });
            return axios
            .post("admin/login", data)
            .then(response => {
                commit("setUserData", response.data);
                localStorage.setItem("authToken", response.data.access_token);
            }).catch(error =>{
                console.log(error);
            });
        },

        sendLogoutRequest({ commit }) {
            axios.post("admin/logout").then(() => {
                commit("setUserData", null);
                localStorage.removeItem("authToken");
                setTimeout(() => {
                    window.location.reload();
                },500);
            });
        },
    }
};
