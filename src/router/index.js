import Vue from "vue"
import VueRouter from "vue-router"

// Solve frequent click menu error
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Manager",
        component: () => import("../views/Manager.vue"),
        redirect: "/home",
        children: [
            {path: '/403', name: 'Auth', meta: {name: 'No permission'}, component: () => import("../views/manager/Auth.vue")},
            {path: '/home', name: 'Home', meta: {name: 'System Home page'}, component: () => import("../views/manager/Home.vue")},
            {path: '/element', name: 'Element', meta: {name: 'Element demo page'}, component: () => import("../views/notUse/Element.vue")},
            {path: '/user', name: 'User', meta: {name: 'User information'}, component: () => import("../views/manager/User.vue")},
            {path: '/person', name: 'Person', meta: {name: 'Personal information'}, component: () => import("../views/manager/Person.vue")},
            {path: '/password', name: 'Password', meta: {name: 'Change password'}, component: () => import("../views/manager/Password.vue")},
        ]
    },
    {path: "/login", name: "Login", meta: {name: 'Login'}, component: () => import("../views/Login.vue")},
    {path: "/register", name: "Register", meta: {name: 'Register'}, component: () => import("../views/Register.vue")},
    {path: "*", name: "404", meta: {name: 'Not found'}, component: () => import("../views/404.vue")},
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