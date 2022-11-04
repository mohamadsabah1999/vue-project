<template>
	<router-view />
</template>

<script>
export default {
	name: "App",
	computed: {
		locale() {
			return this.$store.getters.locale;
		}
	},
	watch: {
		locale() {
			this.$vuetify.rtl = ["ar"].includes(this.locale);
			this.$i18n.locale = this.locale;
		}
	}
};
</script>
<style>
html {
	overflow-y: auto;
}
</style>