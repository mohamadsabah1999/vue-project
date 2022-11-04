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

						<v-form v-model="form.valid" @submit.prevent="reset" ref="form">
							<v-text-field
								type="email"
								:disabled="loading"
								v-model="form.values.email"
								:rules="form.rules.emailRules"
								color="secondary"
								label="Email"
								prepend-inner-icon="mdi-account"
								:error="form.errors.email.error"
								:error-messages="form.errors.email.message"
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
				email: ""
			},
			rules: {
				emailRules: [
					(v) => !!v || "E-mail is required",
					(v) =>
						/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
						"E-mail must be valid"
				]
			},
			errors: {
				email: {
					error: false,
					message: ""
				}
			},
			valid: false
		}
	}),
	methods: {
		async reset() {
			if (this.$refs.form.validate()) {
				try {
					this.loading = true;

					let { email } = this.form.values;
					let res = await http(
						"password/reset/",
						"POST",
						JSON.stringify({ email })
					);
					let data = await res.json();
					if (data.email) {
						this.form.errors.email = {
							error: true,
							message: data.email[0]
						};
					} else {
						// this means that the user has successfully logged in.
						this.alert = {
							show: true,
							color: "success",
							message:
								"If we found an account associated with that email we will send the reset link to it, please check your email."
						};
					}
					console.log(data);
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
			return this.form.values.email; // this will help us track any changes in the form.
		}
	},
	watch: {
		formData() {
			this.form.errors.email = { error: false };
			this.alert.show = false;
		}
	}
};
</script>
