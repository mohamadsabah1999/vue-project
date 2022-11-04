/* eslint-disable import/no-unresolved */
<template>
	<v-content>
		<section id="hero">
			<v-row no-gutters>
				<v-img
					:min-height="
						'calc(100vh - ' + $vuetify.application.top + 'px)'
					"
					src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
				>
					<v-theme-provider>
						<v-container fill-height>
							<v-row
								align="center"
								class="white--text mx-auto"
								justify="center"
							>
								<v-col
									class="white--text text-center"
									cols="12"
									tag="h1"
								>
									<span
										:class="[
											$vuetify.breakpoint.smAndDown
												? 'display-1'
												: 'display-2'
										]"
										class="font-weight-light"
									>
										WELCOME TO
									</span>

									<br />

									<span
										:class="[
											$vuetify.breakpoint.smAndDown
												? 'display-3'
												: 'display-4'
										]"
										class="font-weight-black"
									>
										Turtanu
									</span>
								</v-col>

								<v-btn
									class="align-self-end"
									fab
									outlined
									@click="$vuetify.goTo('#about-me')"
								>
									<v-icon>mdi-chevron-double-down</v-icon>
								</v-btn>
							</v-row>
						</v-container>
					</v-theme-provider>
				</v-img>
			</v-row>
		</section>

		<section id="about-me">
			<div class="py-12"></div>

			<v-container class="text-center">
				<h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

				<v-responsive class="mx-auto mb-8" width="56">
					<v-divider class="mb-1"></v-divider>

					<v-divider></v-divider>
				</v-responsive>

				<v-responsive
					class="mx-auto title font-weight-light mb-8"
					max-width="720"
				>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Eum molestiae, tenetur eius et quibusdam rerum quaerat
					praesentium sit officia quos cumque nisi libero aut
					consequuntur cum? Officia, veniam! Delectus, eos. Cupiditate
					nemo, doloremque molestiae numquam repudiandae et. Minima
					eveniet amet deleniti sit eaque minus sed accusamus
					repudiandae cum itaque? Praesentium id ex deleniti. Quo modi
					ipsam eligendi libero quas accusamus. Excepturi dolorum,
					temporibus officia vero eos animi? Ducimus recusandae
					provident, officiis quos labore suscipit delectus magnam
					maiores cum sapiente voluptatibus ipsum sed! Recusandae
					temporibus at et atque, omnis quidem quia?
				</v-responsive>

				<v-avatar class="elevation-12 mb-12" size="128">
					<v-img
						src="https://cdn.vuetifyjs.com/images/john.png"
					></v-img>
				</v-avatar>

				<div></div>

				<v-btn color="grey" link to="/pricing" outlined large>
					<span class="grey--text text--darken-1 font-weight-bold">
						Learn More
					</span>
				</v-btn>
			</v-container>

			<div class="py-12"></div>
		</section>
		<section id="features" class="grey lighten-3">
			<div class="py-12"></div>

			<v-container class="text-center">
				<h2 class="display-2 font-weight-bold mb-3">OUR PLANS</h2>

				<v-responsive class="mx-auto mb-12" width="56">
					<v-divider class="mb-1"></v-divider>

					<v-divider></v-divider>
				</v-responsive>

				<v-row>
					<v-col
						v-for="({ icon, title, text }, i) in features"
						:key="i"
						cols="12"
						md="4"
					>
						<v-card class="py-12 px-4" color="grey lighten-5" flat>
							<v-theme-provider dark>
								<div>
									<v-avatar color="primary" size="88">
										<v-icon large v-text="icon"></v-icon>
									</v-avatar>
								</div>
							</v-theme-provider>

							<v-card-title
								class="justify-center font-weight-black text-uppercase"
								v-text="title"
							></v-card-title>

							<v-card-text class="subtitle-1" v-text="text">
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>

			<div class="py-12"></div>
		</section>

		<section id="stats">
			<v-parallax
				:height="$vuetify.breakpoint.smAndDown ? 700 : 500"
				src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
			>
				<v-container fill-height>
					<v-row class="mx-auto">
						<v-col
							v-for="[value, title] of stats"
							:key="title"
							cols="12"
							md="3"
						>
							<div class="text-center">
								<div
									class="display-3 font-weight-black mb-4"
									v-text="value"
								></div>

								<div
									class="title font-weight-regular text-uppercase"
									v-text="title"
								></div>
							</div>
						</v-col>
					</v-row>
				</v-container>
			</v-parallax>
		</section>

		<section id="blog">
			<div class="py-12"></div>

			<v-container>
				<h2
					class="display-2 font-weight-bold mb-3 text-uppercase text-center"
				>
					Blog
				</h2><v-timeline align-top>
          <v-timeline-item
            v-for="(timeline, i) in timelines"
            :key="i"
            :color="timeline.color"
            :icon="timeline.icon"
            fill-dot
            large
          >
            <v-card class="pa-6">
              <v-chip
                :color="timeline.color"
                class="overline mb-3"
                small
              >
                {{ timeline.chip }}
              </v-chip>

              <p
                class="subtitle-1 font-weight-light"
                v-text="timeline.text"
              />

              <div
                class="text-uppercase body-2"
                v-text="timeline.subtext"
              />

              <template v-if="timeline.action">
                <v-divider class="mb-3" />

                <v-menu
                  v-model="menu"
                  bottom
                  offset-y
                  origin="top left"
                  right
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      :color="timeline.action"
                      large
                      rounded
                      v-on="on"
                    >
                      <v-icon
                        left
                        v-text="timeline.actionIcon"
                      />
                      <v-icon right>
                        {{ menu ? 'mdi-menu-up' : 'mdi-menu-down' }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-sheet>
                    <v-list>
                      <v-list-item
                        v-for="a in timeline.actions"
                        :key="a"
                        link
                      >
                        <v-list-item-title v-text="a" />
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-menu>
              </template>
            </v-card>
          </v-timeline-item>

				<v-responsive class="mx-auto mb-12" width="56">
					<v-divider class="mb-1"></v-divider>

					<v-divider></v-divider>
				</v-responsive>

				<v-row>
					<v-col
						v-for="({ src, text, title }, i) in articles"
						:key="i"
						cols="12"
						md="4"
					>
						<v-img
							:src="src"
							class="mb-4"
							height="275"
							max-width="100%"
						></v-img>

						<h3
							class="font-weight-black mb-4 text-uppercase"
							v-text="title"
						></h3>

						<div
							class="title font-weight-light mb-5"
							v-text="text"
						></div>

						<v-btn class="ml-n4 font-weight-black" text>
							Continue Reading
						</v-btn>
					</v-col>
				</v-row>
			</v-container>

			<div class="py-12"></div>
		</section>

		<v-sheet id="contact" color="#333333" dark tag="section" tile>
			<div class="py-12"></div>

			<v-container>
				<h2
					class="display-2 font-weight-bold mb-3 text-uppercase text-center"
				>
					Contact Us
				</h2>

				<v-responsive class="mx-auto mb-12" width="56">
					<v-divider class="mb-1"></v-divider>

					<v-divider></v-divider>
				</v-responsive>

				<v-theme-provider light>
					<v-row>
						<v-col cols="12">
							<v-text-field
								flat
								label="Name*"
								solo
							></v-text-field>
						</v-col>

						<v-col cols="12">
							<v-text-field
								flat
								label="Email*"
								solo
							></v-text-field>
						</v-col>

						<v-col cols="12">
							<v-text-field
								flat
								label="Subject*"
								solo
							></v-text-field>
						</v-col>

						<v-col cols="12">
							<v-textarea flat label="Message*" solo></v-textarea>
						</v-col>

						<v-col class="mx-auto" cols="auto">
							<v-btn color="accent" x-large> Submit </v-btn>
						</v-col>
					</v-row>
				</v-theme-provider>
			</v-container>

			<div class="py-12"></div>
		</v-sheet>
	</v-content>
</template>
<script>
export default {
	data: () => ({
		articles: [
			{
				src:
					"https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				title: "Mobile first & Responsive",
				text:
					"Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum."
			},
			{
				src:
					"https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				title: "Think outside the box",
				text:
					"Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh."
			},
			{
				src:
					"https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80",
				title: "Small changes, big difference",
				text:
					"Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget."
			}
		],
		features: [
			{
				icon: "mdi-account-group-outline",
				title: "Vibrant Community",
				text:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam"
			},
			{
				icon: "mdi-update",
				title: "Frequent Updates",
				text:
					"Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit."
			},
			{
				icon: "mdi-shield-outline",
				title: "Long-term Support",
				text:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam"
			}
		],
		stats: [
			["24k", "Github Stars"],
			["330+", "Releases"],
			["1m", "Downloads/mo"],
			["5m", "Total Downloads"]
		],
		menu: false,
		timelines: [
			{
				chip: "Some title",
				color: "error",
				icon: "mdi-briefcase",
				text:
					"Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.",
				subtext: "11 hours ago via twitter"
			},
			{
				chip: "Another one",
				color: "success",
				icon: "mdi-puzzle",
				text:
					"Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it...."
			},
			{
				chip: "Another title",
				color: "info",
				icon: "mdi-fingerprint",
				text:
					"Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM. What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye",
				action: "info",
				actionIcon: "mdi-wrench",
				actions: ["Action", "Another Action", "Something else here"]
			},
			{
				chip: "Another one",
				color: "warning",
				icon: "mdi-airplane-landing",
				text:
					"Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the whole style squad at Balmain and the Yeezy team. Thank you Anna for the invite thank you to the whole Vogue team"
			}
		]
	})
};
</script>
