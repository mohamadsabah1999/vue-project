/* eslint-disable import/no-unresolved */
<template>
	<v-container id="login" class="fill-height justify-center" tag="section">
		<v-row justify="center">
			<v-slide-y-transition appear>
				<base-material-card color="success" light max-width="100%" width="500" class="px-5 py-3">
					<template v-slot:heading>
						<div class="text-center">
							<h1 class="display-2 font-weight-bold mb-2">Reset your password</h1>
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
						>Please choice a new password.</div>
						<v-form v-model="form.valid" @submit.prevent="reset" ref="form">
							<v-text-field
								:disabled="loading"
								v-model="form.values.password"
								:rules="form.rules.passwordRules"
								:type="form.passwordSeen ? 'text' : 'password'"
								:append-icon="
									form.passwordSeen
										? 'mdi-eye'
										: 'mdi-eye-off'
								"
								@click:append="togglePassword"
								class="mb-8"
								color="secondary"
								label="Password"
								:error="form.errors.password.error"
								:error-messages="form.errors.password.message"
							/>

							<pages-btn
								type="submit"
								:disabled="!form.valid"
								large
								color
								depressed
								:loading="loading"
								class="v-btn--text success--text"
							>Reset</pages-btn>
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
	name: "Password-resetform",

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
				password: ""
			},
			rules: {
				passwordRules: [
					(v) => !!v || "Password is required",
					(v) =>
						v.length >= 8 ||
						"Password must contain at least eight characters."
				]
			},
			errors: {
				password: {
					error: false,
					message: ""
				}
			},
			valid: false,
			passwordSeen: false
		}
	}),
	methods: {
		togglePassword() {
			this.form.passwordSeen = !this.form.passwordSeen;
		},
		async reset() {
			if (this.$refs.form.validate()) {
				try {
					let urlParams = new URLSearchParams(window.location.search);
					let token = urlParams.get("token");
					let { password } = this.form.values;

					this.loading = true;

					let res = await http(
						"password/reset/confirm/",
						"POST",
						JSON.stringify({
							token,
							password
						})
					);
					let data = await res.json();
					if (data.status.toLowerCase() === "ok") {
						this.alert = {
							show: true,
							color: "success",
							message:
								"Your password have been changed successfully."
						};
					} else if (data.status === "notfound") {
						this.alert = {
							show: true,
							color: "error",
							message: "The password restoration link is expired"
						};
					} else if (data.password) {
						this.form.errors.password = {
							error: true,
							message: data.password.join("")
						};
					}
				} catch {
					this.alert = {
						show: true,
						color: "error",
						message:
							"An error has occurred, make sure you are connected to the internet."
					};
				}
				this.loading = false;
			}
		}
	},
	computed: {
		formData() {
			return this.form.values.password; // this will help us track any changes in the form.
		}
	},
	watch: {
		formData() {
			this.alert.show = false;
			this.form.errors.password = {
				error: false
			};
		}
	}
};
</script>
