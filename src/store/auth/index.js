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
            state.userData = user.user;
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

        // sendRegisterRequest({ commit }, data) {
        // commit("setErrors", {}, { root: true });
        // return axios
        //     .post(process.env.VUE_APP_API_URL + "register", data)
        //     .then(response => {
        //     commit("setUserData", response.data.user);
        //     localStorage.setItem("authToken", response.data.token);
        //     });
        // },

        sendLogoutRequest({ commit }) {
            axios.post("admin/logout").then(() => {
                commit("setUserData", null);
                localStorage.removeItem("authToken");
            });
        },

        // sendVerifyResendRequest() {
        // return axios.get(process.env.VUE_APP_API_URL + "email/resend");
        // },
        // sendVerifyRequest({ dispatch }, hash) {
        // return axios
        //     .get(process.env.VUE_APP_API_URL + "email/verify/" + hash)
        //     .then(() => {
        //     dispatch("getUserData");
        //     });
        // }
    }
};
