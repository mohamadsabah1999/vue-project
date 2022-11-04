<template>
	<v-container class="mt-3">
		<v-row>
			<!-- This will contain files list -->
			<v-col cols="10" md="4" xl="3" v-for="i in 10" :key="i">
				<v-card flat>
					<base-material-card color="transparent" image hover-reveal>
						<template v-slot:image>
							<v-img
								src="https://picsum.photos/id/1000/1000/1000"
								lazy-src="https://picsum.photos/id/1000/50/50"
								max-width="500"
								max-height="300"
							>
								<template v-slot:placeholder>
									<v-row class="fill-height ma-0" align="center" justify="center">
										<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</template>

						<template v-slot:reveal-actions>
							<v-tooltip bottom>
								<!-- view in fullscreen -->
								<template v-slot:activator="{ attrs, on }">
									<v-btn class="mx-1" v-bind="attrs" icon v-on="on" @click="dialog = true">
										<v-icon>mdi-fullscreen</v-icon>
									</v-btn>
								</template>

								<span>View</span>
							</v-tooltip>

							<v-tooltip bottom>
								<!-- Edit image details -->
								<template v-slot:activator="{ attrs, on }">
									<v-btn v-bind="attrs" class="mx-1" color="success" light icon v-on="on">
										<v-icon class="success--text">mdi-pencil</v-icon>
									</v-btn>
								</template>

								<span>Edit</span>
							</v-tooltip>

							<v-tooltip bottom>
								<!-- Remove	 the image -->
								<template v-slot:activator="{ attrs, on }">
									<v-btn v-bind="attrs" class="mx-1" color="error" light icon v-on="on">
										<v-icon class="error--text">mdi-close</v-icon>
									</v-btn>
								</template>

								<span>Remove</span>
							</v-tooltip>
						</template>
					</base-material-card>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-text>
					<v-img
						src="https://picsum.photos/id/1000/1000/1000"
						lazy-src="https://picsum.photos/id/1000/50/50"
						max-width="500"
						max-height="300"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>
<script>
export default {
	data: () => ({
		dialog: false
	})
};
</script>
