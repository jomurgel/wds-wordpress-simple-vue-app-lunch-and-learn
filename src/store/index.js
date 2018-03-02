import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	posts: []
}

const actions = {
	getPosts({ commit, state }) {
		axios.get( 'https://webdevstudios.com/wp-json/wp/v2/posts' ).then( response => {
			commit( 'mutate_posts', response.data )
		}).catch( function(error) {
			console.log(error)
		})
	}
}

const mutations = {
	mutate_posts( state, data ) {
		state.posts = data
	}
}

const getters = {
	posts( state ) {
		return state.posts
	},
	singlePost( state ) {
		return state.posts.filter( post => {
			return post.id === parseInt( state.route.params.id )
		})[0]
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})





