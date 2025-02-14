import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Manager",
        component: () => import("../views/Manager.vue"),
        redirect: "/home",
        children: [
            {path: '/403', name: 'Auth', component: () => import("../views/manager/Auth.vue")},
            {path: '/home', name: 'Home', component: () => import("../views/manager/Home.vue")},
            {path: '/user', name: 'User', component: () => import("../views/manager/User.vue")},
        ]
    },
    {path: "/login", name: "Login", component: () => import("../views/Login.vue")},
    {path: "/register", name: "Register", component: () => import("../views/Register.vue")},
    {path: "*", name: "404", component: () => import("../views/404.vue")},
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next)
router.beforeEach((to, from, next) => {
    // to (destination)
    // from (origin)
    // next (method to help move to the next page)
    let adminPaths = ['/user']
    let user = JSON.parse(localStorage.getItem("honey-user") || '{}')

    // Redirect to 403 page if no permission to access
    if (user.role !== 'admin' && adminPaths.includes(to.path)) {
        next('/403')
    } else {
        next()
    }
})

export default router