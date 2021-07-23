import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Auth from "../components/auth/Login.vue";

import TemplateDashboard from "../components/template/TemplateDashboard";
import Home from "../components/home/Home.vue";
import Users from "../components/users/Users.vue";
import Consoles from "../components/consoles/Consoles.vue";

import PageNotFound from '../components/partitials/PageNotFound'

const guest = async (to, from, next) => {
    if (!localStorage.getItem("authToken")) {
        return next();
    } else {
        return next("/admin/dashboard");
    }
}; 
const auth = async (to, from, next) => {
    if (localStorage.getItem("authToken")) {
        return next();
    } else {
        return next('/');
    }
};


const routes = [
    {
        path: "/",
        name: "Login",
        beforeEnter: guest,
        component: Auth
    },
    {
        path: '/admin',
        name: 'TemplateDashboard',
        component: TemplateDashboard,
        beforeEnter: auth,
        redirect: '/admin/dashboard',
        children:[
            {
                path: 'dashboard',
                name: 'Dashboard',
                beforeEnter: auth,
                component: Home
            },
            {
                path: 'users',
                name: 'Users',
                beforeEnter: auth,
                component: Users
            },
            {
                path: 'consoles',
                name: 'Consoles',
                beforeEnter: auth,
                component: Consoles
            },
        ]
    },
    {
        path: "*",
        component: PageNotFound
    },
];

const router = new VueRouter({
    mode: "history",
    //base: "http://127.0.0.1:8000/api",
    routes
});

export default router;