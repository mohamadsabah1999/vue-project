<template>
	<v-container id="register" class="fill-height justify-center" tag="section">
		<v-row justify="center">
			<v-col cols="12" md="9">
				<v-slide-y-transition appear>
					<v-card class="pa-3 pa-md-5 mx-auto" light>
						<pages-heading class="text-center display-3">Register</pages-heading>

						<v-row>
							<v-col cols="12" md="6">
								<v-row no-gutters>
									<v-col v-for="(section, i) in sections" :key="i" cols="12">
										<v-list-item three-line>
											<v-list-item-icon class="mr-4 mt-5 mt-md-4">
												<v-icon
													:large="
														$vuetify.breakpoint
															.mdAndUp
													"
													:color="section.iconColor"
													v-text="section.icon"
												/>
											</v-list-item-icon>

											<v-list-item-content>
												<v-list-item-title class="font-weight-light mb-4 mt-3" v-text="section.title" />

												<v-list-item-subtitle v-text="section.text" />
											</v-list-item-content>
										</v-list-item>
									</v-col>
								</v-row>
							</v-col>

							<v-col cols="12" md="6">
								<div class="text-center">
									<v-btn
										v-for="(social, i) in socials"
										:key="i"
										:color="social.iconColor"
										class="my-2 mr-1"
										dark
										depressed
										fab
										small
									>
										<v-icon v-text="social.icon" />
									</v-btn>

									<div class="my-2" />

									<div class="text-center grey--text body-1 font-weight-light">Or Be Classical</div>
									<!-- Alret start -->
									<div v-if="alert.shown">
										<!-- This will be shown when a the register request finished, if the proccess
                                        finished successfully and the user is now register it will show a green success
                                        message, otherwise it will be red with an error message.
										-->
										<v-alert
											border="left"
											dense
											outlined
											prominent
											:type="alert.type"
											tile
											elevation="15"
										>{{ alret.message }}</v-alert>
									</div>
									<!-- Alret ends -->

									<!--  -->
									<v-form v-model="form.valid" @submit.prevent="register" ref="form">
										<v-text-field
											:disabled="loading"
											v-model="form.values.firstname"
											:rules="form.rules.nameRules"
											color="secondary"
											label="First Name"
										/>
										<v-text-field
											:disabled="loading"
											v-model="form.values.lastname"
											:rules="form.rules.nameRules"
											color="secondary"
											label="Last Name"
										/>
										<v-text-field
											:disabled="loading"
											:error="form.errors.username.error"
											:error-messages="
												form.errors.username.message
											"
											v-model="form.values.username"
											:rules="form.rules.usernameRules"
											color="secondary"
											label="Username"
										/>
										<v-text-field
											:disabled="loading"
											:error="form.errors.email.error"
											:error-messages="
												form.errors.email.message
											"
											v-model="form.values.email"
											:rules="form.rules.emailRules"
											color="secondary"
											label="Email"
										/>

										<v-text-field
											:disabled="loading"
											v-model="form.values.password"
											:rules="form.rules.passwordRules"
											:type="
												form.passwordSeen
													? 'text'
													: 'password'
											"
											:append-icon="
												form.passwordSeen
													? 'mdi-eye'
													: 'mdi-eye-off'
											"
											@click:append="togglePassword"
											class="mb-8"
											color="secondary"
											label="Password"
										/>

										<v-checkbox
											:disabled="loading"
											class="pb-5"
											v-model="form.values.terms"
											color="secondary"
											:rules="form.rules.termsRules"
										>
											<span slot="label">
												<span class="text-no-wrap">I agree to the&nbsp;</span>

												<v-btn
													text
													@click="
														termsDialog = true;
														form.values.terms = !form
															.values.terms;
													"
													class="secondary--text"
												>terms and conditions</v-btn>.
											</span>
										</v-checkbox>

										<pages-btn
											:loading="loading"
											type="submit"
											:disabled="!form.valid"
											color="success"
										>Get Started</pages-btn>
									</v-form>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-slide-y-transition>
			</v-col>
		</v-row>
		<v-dialog v-model="termsDialog" width="500" :fullscreen="small" persistent>
			<v-card light>
				<v-card-title class="headline grey lighten-2" primary-title>Terms</v-card-title>

				<v-card-text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</v-card-text>

				<v-footer absolute v-if="small">
					<v-card-actions style="width:100%">
						<v-btn color="primary" text block @click="termsDialog = false">I accept</v-btn>
					</v-card-actions>
				</v-footer>
				<template v-else>
					<v-card-actions style="width:100%">
						<v-btn color="primary" text block @click="termsDialog = false">I accept</v-btn>
					</v-card-actions>
				</template>
			</v-card>
		</v-dialog>
		<v-snackbar
			top
			left
			:timeout="3000"
			v-model="snackbar.show"
			:color="snackbar.color"
		>{{ snackbar.message }}</v-snackbar>
	</v-container>
</template>

<script>
// this will be used to send http requests
import http from "../../plugins/http";

export default {
	name: "PagesRegister",

	components: {
		PagesBtn: () => import("../components/Btn"),
		PagesHeading: () => import("../components/Heading")
	},

	data: () => ({
		snackbar: {
			show: false,
			message: "",
			color: ""
		},
		loading: false,
		// includes all fields that alert needs.
		alert: {
			shown: false,
			type: "success",
			message: ""
		},
		form: {
			values: {
				username: "",
				firstname: "",
				lastname: "",
				email: "",
				password: "",
				terms: false
			},
			rules: {
				usernameRules: [
					(v) => !!v || "Username is required",
					(v) =>
						/^[a-zA-Z_]{5,}[a-zA-Z0-9]*$/.test(v) ||
						"Username is must consists of at least 5 letters and numbers, and can't start with a number"
				],
				passwordRules: [
					(v) => !!v || "Password is required",
					(v) =>
						v.length >= 8 ||
						"Password must contain at least eight characters."
				],
				nameRules: [
					(v) => !!v || "Name is required",
					(v) =>
						v.length <= 16 || "Name must be less than 16 characters"
				],
				emailRules: [
					(v) => !!v || "E-mail is required",
					(v) =>
						/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
						"E-mail must be valid"
				],
				termsRules: [(v) => v || "You must accept"]
			},
			valid: false,
			passwordSeen: false,
			errors: {
				username: {
					error: false,
					message: ""
				},
				email: {
					error: false,
					message: ""
				}
			}
		},
		sections: [
			{
				icon: "mdi-chart-timeline-variant",
				iconColor: "primary",
				title: "Marketing",
				text:
					"We've created the marketing campaign of the website. It was a very interesting collaboration."
			},
			{
				icon: "mdi-code-tags",
				iconColor: "secondary",
				title: "Fully Coded in HTML5",
				text:
					"We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
			},
			{
				icon: "mdi-account-multiple",
				iconColor: "cyan",
				title: "Built Audience",
				text:
					"There is also a Fully Customizable CMS Admin Dashboard for this product."
			}
		],
		socials: [
			{
				href: "#",
				icon: "mdi-twitter",
				iconColor: "#1DA1F2"
			},
			{
				href: "#",
				icon: "mdi-github",
				iconColor: "#ea4c89"
			},
			{
				href: "#",
				icon: "mdi-facebook",
				iconColor: "#3B5998"
			}
		],
		termsDialog: false
	}),
	computed: {
		small() {
			return this.$vuetify.breakpoint.smAndDown;
		},
		formData() {
			return `${this.form.values.username}${this.form.values.email}`;
		}
	},
	methods: {
		togglePassword() {
			this.form.passwordSeen = !this.form.passwordSeen;
		},
		async register() {
			if (this.$refs.form.validate()) {
				try {
					this.loading = true;
					let {
						firstname,
						lastname,
						username,
						email,
						password
					} = this.form.values;
					let res = await http(
						"api/register/",
						"POST",
						JSON.stringify({
							first_name: firstname,
							last_name: lastname,
							username,
							email,
							password
						})
					);
					let data = await res.json();
					// check if there is an error:
					if (Object.keys(data).includes("username")) {
						this.form.errors.username = {
							error: true,
							message: data.username[0]
						};
					}
					if (Object.keys(data).includes("email")) {
						this.form.errors.email = {
							error: true,
							message: data.email[0]
						};
					} else if (Object.keys(data).includes("user")) {
						this.snackbar = {
							show: true,
							message:
								"Account created successfully, please head over to login page.",
							color: "success"
						};
					}
					this.loading = false;
				} catch {
					this.snackbar = {
						show: true,
						message:
							"An error has occurred, make sure you are connected to the internet.",
						color: "error"
					};
					this.loading = false;
				}
			}
		}
	},
	watch: {
		formData() {
			this.form.errors = {
				email: {
					error: false,
					message: ""
				},
				username: {
					error: false,
					message: ""
				}
			};
		}
	}
};
</script>

<style lang="sass">
#register
	.v-list-item__subtitle
		-webkic-line-clamp: initial
		-webkit-box-orient: initial
</style>
