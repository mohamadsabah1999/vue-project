import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: () => import("@/views/Index"),
			children: [
				{
					path: "/",
					component: () => import("@/views/HomePage"),
					name: "Home"
				},
				{
					name: "Pricing",
					path: "pricing",
					component: () => import("@/views/Pricing")
				},
			]
		},
		{
			path: "/authentication",
			component: () => import("@/views/Index"),
			children: [
				{
					name: "Login",
					path: "login",
					component: () => import("@/views/authentication/Login")
				},
				{
					name: "Register",
					path: "register",
					component: () => import("@/views/authentication/Register")
				},
				{
					name: "Password reset",
					path: "password/forgot",
					component: () => import("@/views/authentication/Password-resetform"),
				},
				{
					name: "Password reset confirm",
					path: "password/reset",
					component: () => import("@/views/authentication/Change-password-form.vue")
				},
			]
		},
		{
			path: "/dashboard",
			component: () => import("@/views/dashboard/Index.vue"),
			children: [
				{
					name: "Files crud",
					path: "files",
					component: () => import("@/views/dashboard/Files")
				}
			]
		},
		{
			path: "*",
			component: () => import("@/views/Index"),
			children: [
				{
					name: "404 Error",
					path: "",
					component: () => import("@/views/Error")
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	let isLoggedIn = store.getters.isLoggedIn;
	//let isAdmin = store.getters.isAdmin;
	if (to.path === "/logout" && isLoggedIn) {
		store.dispatch("logout");
		next("/");
	} else if (isLoggedIn && ["/login", "/register"].includes(to.path)) {
		next("/");
	} else {
		next();
	}
});

export default router;
