<template>
	<v-app>
		<pages-core-app-bar />
		<pages-core-view />
	</v-app>
</template>

<script>
export default {
	name: "PagesIndex",

	components: {
		PagesCoreAppBar: () => import("./components/core/AppBar"),
		PagesCoreView: () => import("./components/core/View")
	}
};
</script>
