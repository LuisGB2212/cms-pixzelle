import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Auth from "../components/auth/Login.vue";

import TemplateDashboard from "../components/template/TemplateDashboard";
import Home from "../components/home/Home.vue";
import Users from "../components/users/Users.vue";
// import SectionProducts from "../components/SectionProducts";
// import ProductDetail from "../components/ProductDetail";
// import CommunityDetail from "../components/CommunityDetail";
// import ListEvents from "../components/ListEvents";
// import IsiEventDetails from "../components/IsiEventDetails";
// import TournamentDetail from '../components/TournamentDetail';
// import RegisterTorunament from '../components/RegisterTorunament';

// import PageNotFound from '../components/PageNotFound'

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
        ]
    }
    // {
    //     path: "/producto/:product_id",
    //     name: "ProductDetail",
    //     //beforeEnter: guest,
    //     component: ProductDetail
    // },
    // {
    //     path: "/comunidad/:product_id",
    //     name: "CommunityDetail",
    //     //beforeEnter: guest,
    //     component: CommunityDetail
    // },
    // {
    //     path: "/eventos",
    //     name: "ListEvents",
    //     //beforeEnter: guest,
    //     component: ListEvents
    // },
    // {
    //     path: "/evento/:event_slug",
    //     name: "IsiEventDetails",
    //     //beforeEnter: guest,
    //     component: IsiEventDetails
    // },
    // {
    //     path: "/evento/torneo/:tournamentId",
    //     name: "TournamentDetail",
    //     //beforeEnter: guest,
    //     component: TournamentDetail
    // },
    // {
    //     path: "/evento/torneo/:tournamentId/registro",
    //     name: "RegisterTorunament",
    //     //beforeEnter: guest,
    //     component: RegisterTorunament
    // },
    // {
    //     path: "*",
    //     component: PageNotFound
    // },
];

const router = new VueRouter({
    mode: "history",
    //base: "http://127.0.0.1:8000/api",
    routes
});

export default router;