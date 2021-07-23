import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        errors: [],
        isLoading: false,
    },

    getters: {
        errors: state => state.errors
    },

    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        },
        loading(state, isLoading) {
            state.isLoading = isLoading;
        }
    },

    actions: {},

    modules: {
        auth
    }
});
