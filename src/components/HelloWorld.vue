<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul v-if="posts">
      <li v-for="post in posts">

        <router-link :to="{ name: 'Single', params: { id: post.id }}">
          <h2>{{ post.title.rendered }}</h2>
        </router-link>
        <p v-html="post.excerpt.rendered"></p>
      </li>
    </ul>
    <div v-else>Nothing here.</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.$store.dispatch( 'getPosts' )
  },
  methods: {

  },
  computed: {
    ...mapGetters({
      posts: 'posts'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
