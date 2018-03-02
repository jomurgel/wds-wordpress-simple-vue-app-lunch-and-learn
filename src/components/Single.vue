<template>
	<div>
		<router-link to="/">Home</router-link>
		<h1>{{ post.title.rendered }}</h1>
        <div v-html="post.content.rendered"></div>
	</div>
</template>

<script>
export default {
	name: 'Single',
	mounted() {
		this.$store.dispatch( 'getPosts' )
	},
	computed: {
		post() {
			return this.$store.getters.singlePost
		}
	}
}
</script>

<style>
</style>