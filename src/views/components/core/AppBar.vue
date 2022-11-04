<template>
	<v-app-bar absolute color="transparent" flat height="85">
		<v-container class="px-0 text-right d-flex align-center">
			<v-toolbar-title class="font-weight-light hidden-xs-only" v-text="title" />

			<v-spacer />

			<v-btn v-for="(item, i) in items" :key="i" :to="item.to" min-height="48" min-width="40" text>
				<v-icon :left="$vuetify.breakpoint.mdAndUp" size="20" v-text="item.icon" />

				<span class="hidden-sm-and-down" v-text="item.text" />
			</v-btn>
		</v-container>
	</v-app-bar>
</template>

<script>
/* eslint-disable no-mixed-spaces-and-tabs */
export default {
	name: "PagesCoreAppBar",

	computed: {
		items() {
			let urls = [
				{
					icon: "mdi-home",
					text: this.$t("index.components.appbar.items.urls.home"),
					to: "/"
				},
				{
					icon: "mdi-currency-usd",
					text: this.$t("index.components.appbar.items.urls.pricing"),
					to: "/pricing"
				}
			];
			if (this.isLoggedIn)
				urls.push({
					icon: "mdi-logout",
					text: this.$t("index.components.appbar.items.urls.logout"),
					to: "/logout"
				});
			if (this.role === "admin")
				urls.push({
					icon: "mdi-view-dashboard",
					text: this.$t(
						"index.components.appbar.items.urls.admin_panel"
					),
					to: "/admin-panel"
				});
			return urls;
		},
		titles() {
			return {
				"/": this.$t("index.components.appbar.titles.home_page"),
				"/pricing": this.$t(
					"index.components.appbar.titles.pricing_page"
				),
				"/login": this.$t("index.components.appbar.titles.login_page"),
				"/register": this.$t(
					"index.components.appbar.titles.register_page"
				),
				"/password/forgot": this.$t(
					"index.components.appbar.titles.password_forgot_form"
				)
			};
		},
		title() {
			if (/^(\/password\/reset\/)/.test(this.$route.path))
				return this.$t(
					"index.components.appbar.titles.password_forgot_confirm"
				);
			return this.titles[this.$route.path];
		},
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
		role() {
			return this.$store.getters.role;
		}
	}
};
</script>
