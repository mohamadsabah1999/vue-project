/* eslint-disable import/no-unresolved */
<template>
	<v-container id="login" class="fill-height justify-center" tag="section">
		<v-row justify="center">
			<v-slide-y-transition appear>
				<base-material-card color="success" light max-width="100%" width="500" class="px-5 py-3">
					<template v-slot:heading>
						<div class="text-center">
							<h1 class="display-2 font-weight-bold mb-2">{{$t("login.login")}}</h1>

							<v-btn
								v-for="(social, i) in socials"
								:key="i"
								:href="social.href"
								class="ma-1"
								icon
								rel="noopener"
								target="_blank"
							>
								<v-icon v-text="social.icon" />
							</v-btn>
						</div>
					</template>

					<v-card-text class="text-center">
						<!-- an alert to show server feedbacks -->
						<base-material-alert
							v-if="alert.show"
							border="left"
							:icon="
								alert.color == 'error'
									? 'mdi-alert-circle'
									: 'mdi-checkbox-marked-circle'
							"
							dense
							text
							:color="alert.color"
						>{{ alert.message }}</base-material-alert>

						<div
							prominent
							class="text-center grey--text body-1 font-weight-light"
						>{{$t("login.or_be_classical")}}</div>
						<v-form v-model="form.valid" @submit.prevent="login" ref="form">
							<v-text-field
								:disabled="loading"
								v-model="form.values.username"
								:rules="rules.usernameRules"
								color="secondary"
								:label="`${$t('login.username')}`"
								prepend-inner-icon="mdi-account"
							/>

							<v-text-field
								:disabled="loading"
								v-model="form.values.password"
								:rules="rules.passwordRules"
								:type="form.passwordSeen ? 'text' : 'password'"
								:append-icon="
									form.passwordSeen
										? 'mdi-eye'
										: 'mdi-eye-off'
								"
								@click:append="togglePassword"
								class="mb-8"
								color="secondary"
								:label="`${$t('login.password')}`"
								prepend-inner-icon="mdi-lock-outline"
							/>

							<pages-btn
								type="submit"
								:disabled="!form.valid"
								large
								color
								depressed
								:loading="loading"
								class="v-btn--text success--text"
							>{{$t('login.lets_go')}}</pages-btn>
							<pages-btn
								large
								depressed
								text
								color="secondary"
								link
								to="authentication/password/forgot"
								class="v-btn--text secondary--text"
							>{{$t('login.forgot_your_password')}}</pages-btn>
						</v-form>
					</v-card-text>
				</base-material-card>
			</v-slide-y-transition>
		</v-row>
	</v-container>
</template>

<script>
import http from "../../plugins/http";
export default {
	name: "PagesLogin",

	components: {
		PagesBtn: () => import("../components/Btn")
	},

	data: () => ({
		loading: false,
		alert: {
			show: false,
			message: "",
			color: "success"
		},
		form: {
			values: {
				username: "",
				password: ""
			},
			valid: false,
			passwordSeen: false
		},
		socials: [
			{
				href: "#",
				icon: "mdi-facebook"
			},
			{
				href: "#",
				icon: "mdi-twitter"
			},
			{
				href: "#",
				icon: "mdi-github"
			}
		]
	}),
	methods: {
		togglePassword() {
			this.form.passwordSeen = !this.form.passwordSeen;
		},
		async login() {
			if (this.$refs.form.validate()) {
				try {
					this.loading = true;

					let { username, password } = this.form.values;
					let res = await http(
						"api/login/",
						"POST",
						JSON.stringify({ username, password })
					);
					let data = await res.json();
					this.loading = false;
					if (data.access && data.refresh) {
						// this means that the user has successfully logged in.
						this.$store.dispatch("setToken", data);
						this.$router.push("/");
					} else {
						// when the api doesn't return tokens, this means the there is an error,
						// here we handle that error and show an alert with the error message.
						this.alert = {
							show: true,
							color: "error",
							message: data.detail
						};
					}
				} catch {
					this.alert = {
						show: true,
						color: "error",
						message: this.$t("internet_error")
					};
					this.loading = false;
				}
			}
		}
	},
	computed: {
		formData() {
			return `${this.form.values.username} ${this.form.values.password}`; // this will help us track any changes in the form.
		},
		rules() {
			return {
				passwordRules: [
					(v) => !!v || this.$t("login.rules.password.required"),
					(v) =>
						v.length >= 8 || this.$t("login.rules.password.length")
				],
				usernameRules: [
					(v) => !!v || this.$t("login.rules.username.required"),
					(v) =>
						/^[a-zA-Z_]{5,}[a-zA-Z0-9]*$/.test(v) ||
						this.$t("login.rules.username.valid")
				]
			};
		}
	},
	watch: {
		formData() {
			this.alert.show = false;
		}
	}
};
</script>
