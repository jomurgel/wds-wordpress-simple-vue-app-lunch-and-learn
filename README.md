# Basic Vue.js + WP REST API App for Lunch and Learn — WDS

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


[[TOC]]

# Note

I will be foregoing data validation for sake of time in some places.

# Utilizing

[https://webdevstudios.com/wp-json/wp/v2/posts](https://webdevstudios.com/wp-json/wp/v2/posts) 

[https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) 

# Reference

[https://vuejs.org/v2/guide/](https://vuejs.org/v2/guide/) 

[https://router.vuejs.org/en/](https://router.vuejs.org/en/)

[https://vuex.vuejs.org/en/](https://vuex.vuejs.org/en/)

[https://github.com/axios/axios](https://github.com/axios/axios)  

[https://vuejs.org/v2/guide/instance.html](https://vuejs.org/v2/guide/instance.html)

# Setup

[https://github.com/vuejs-templates/webpack](https://github.com/vuejs-templates/webpack) 

`npm install -g vue-cli`

`vue init webpack vue-test`

`npm install`

`npm run dev`

## Alt

# Run Through Basic Parts

* **main.js** configures app, the element to render to and the parent component, imports parent component.

* **index.html** houses app div.

* **App.vue **is the parent component, houses the router-view.

* **HelloWorld** is our `/` component defined by the router.

* **router/index.js** is our router config. Imports component, defines use of router and creates routes.

Generally touch on this, but the ones that we’ll need/want to know most specifically is `mounted()` because we already have access to `this`, but the app hasn’t rendered yet.

Reference IMAGE on [https://vuejs.org/v2/guide/instance.html](https://vuejs.org/v2/guide/instance.html).

# Adding

We’ll be adding use of Vue’s VUEX which is much like React’s REDUX for storing our post data from our api request to our WordPress install.

`npm install vuex axios vuex-router-sync --save`

Add to `main.js`

```

import { sync } from 'vuex-router-sync'

```

And

```

sync( store, router )

```

Add a new folder inside `src` called `store` and an `index.js` inside that.

Import those from source

```

import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

```

Tell Vue to use VUEX.

`Vue.use(Vuex)`

Setup our new store.

```

*const* state = {

}

*const* actions = {

}

*const* mutations = {

}

*const* getters = {

}

// Setup new store.

export default new Vuex.Store({

    state,

    actions,

    mutations,

    getters

})

```

## Parts

**State**

All of our application-level data. Our single source of truth.

**Actions**

Actions commit mutations. Do a thing and push data to mutations.

**Mutations**

How we actually change our state in the Vuex store.

**Getters**

Functions that reevaluate based on changes in the state data. Our reactive component of the Vuex store.

Add our state object.

```

*const* state = {

	posts: []

}

```

Update our actions, which will utilize our axios request.

```

*const* actions = {

	getPosts({ commit, state }) {

		axios.get( ‘https://webdevstudios.com/wp-json/wp/v2/posts’ ).then( response => {

			commit( ‘mutate_posts’, response.data )

		}), ( error ) => {

			console.log( error )

		}

	}

}

```

Update our mutation object.

```

*const* mutations = {

	mutate_posts( state, posts ) {

		state.posts = posts

	}

}

```

Getters we’ll add two. One to return all of our posts, and one to return just our single post by route.

```

*const* getters = {

posts( state ) {

return state.posts

},

singlePost( state ) {

return state.posts.filter( post => {

return post.id === parseInt( state.route.params.id )

})[0]

}

}

```

Before our store will be accessible in our Vue instance we must add it to your `main.js` file.

```

import store from './store'

```

```

new Vue({

 el: '#app',

 router,

 **store**,

 components: { App },

 template: '<App/>'

})

```

# The Vue DevTools

![image alt text](https://user-images.githubusercontent.com/5230729/36917415-0655024a-1e14-11e8-98e9-96f7f56f25cf.jpg)![image alt text](https://user-images.githubusercontent.com/5230729/36917416-066ee7c8-1e14-11e8-8338-f95c6a68e6e0.jpg)

# Playing with Data

In order to actually hydrate our store we need to dispatch a request.

We will do this inside `HelloWorld.vue` using the `mounted()` hook.

We’ve already setup our axios requets, so all we need to do is tell vuex to make the request. We do that using the `[store.dispatch](https://vuex.vuejs.org/en/actions.html)` method.

```

mounted() {

*this*.$store.dispatch( 'getPosts' )

}

```

As we can see, once our component has mounted our data has been dispatched using the action, committed for mutation, and the store hydrated.

![image alt text](https://user-images.githubusercontent.com/5230729/36917417-068868e2-1e14-11e8-9c96-77b29b11bc97.jpg)

## *this*

`this` inside our components references the Vue instance so we need to prefix our functions to invoke it.

*CAVEAT: Since arrow functions are bound to the parent context*

## The Computed Property

So we have our data, but in order to actually manipulate it we need to return the data using the computed property.

```

computed: {

	posts() {

		Return this.$store.state.posts

	}

}

```

Vuex offers another options for this to retrieve our getters directly by doing this.

Import dependency.

```

import { mapGetters } from 'vuex'

```

Add our computed function.

```

...mapGetters({

posts: 'posts'

})

```

And back in our store

```

*const* getters = {

posts( state ) {

return state.posts

}

}

```

This is better if you’re manipulating data in the store, but for our use isn’t necessarily more efficient.

Using the Method Property can also return data as we’re doing here, but given that Computed Properties are reactive based on it’s dependencies, this property better fits our needs.

[https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods](https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods) 

# Using our Data

We can simply dump our data like this `{{ posts }}` which is inside the Vue instance and thus doesn’t need the `this` prefix.

![image alt text](https://user-images.githubusercontent.com/5230729/36917418-06a6bec8-1e14-11e8-9795-95c39f550f45.jpg)

Vue offers several checks to manipulate list/array data directly in the Vue instance without needing additional javascript function to loop through the data.

## List Rendering

[https://vuejs.org/v2/guide/list.html](https://vuejs.org/v2/guide/list.html)

```

<ul>

<li *v-for*="post in posts"></li>

</ul>

```

This will loop through our posts and output separate list items.

You can then utilize post like you would any javascript item to render data.

```

<ul>

<li *v-for*="post in posts">

	<h2>{{ post.title.rendered }}</h2>

	{{ post.excerpt.rendered }}

</li>

</ul>

```

We’ll notice that our excerpt is rendering our html tags, etc. We can get around this by using the `v-html` directive.

```

<div *v-html*="post.excerpt.rendered"></div>

```

Curly braces are not required when we’re inside a `v-*` directive.

![image alt text](https://user-images.githubusercontent.com/5230729/36917421-06bf13e2-1e14-11e8-9625-72c577051626.jpg)

## Conditional Rendering

[https://vuejs.org/v2/guide/conditional.html](https://vuejs.org/v2/guide/conditional.html) 

We may want to make sure that we’ve got data before rendering our post or posts, so we’ll take advantage of the `v-if` directive.

```

<ul v-if="posts”>

<li *v-for*="post in posts">

	<h2>{{ post.title.rendered }}</h2>

	{{ post.excerpt.rendered }}

</li>

</ul>

```

If, however, we end up without posts we might want to have a fallback.  We can do that easily by using the `v-else` directive.

```

<div v-else>

	Nothing here.

</div>

```

Removing the computed property, cutting off the flow of data, will show us our result.

# Routing

Our main component, as we saw earlier, is in used where our main route is `/`. In this case HelloWorld.  We do the same thing if we want to add or change routes.

Back over on the `router/index.js` file we can setup some routes and components so that we can render individual posts.

We’re already utilizing our `HelloWorld` component for our root path `/`, but we want to also create a component for our posts, which we’ll call `Posts.vue` and add it to the `components` folder.

We will import the component.

```

import Posts from '@/components/Posts'

```

And then add a route.

```

routes: [

{

path: '/',

name: 'HelloWorld',

component: HelloWorld

},

{

	Path: ‘/:id’,

	Name: ‘Posts’,

	Component: Posts

}

]

```

This essentially tells the router to use the Posts component for any route that is equal to `/ + number`.

## Single Post Component

In our newly-created `Posts.vue` file we’ll need to add some of the template structure which is simply:

```

<template>

</template>

<script>

</script>

<style>

</style>

```

We’ll then add the couple of things required to display the route.

```

<template>

	<div>

		Single Post Here

	</div>

</template>

<script>

export default {

	Name: ‘Posts’

}

</script>

<style>

</style>

```

If we test the url [http://localhost:8080/#/44](http://localhost:8080/#/44) for instance, we can see our component rendering as expected.  Now the question is how do we get there from our main blog component?

## Back over on the HelloWorld.vue Component

[https://vuejs.org/v2/guide/routing.html](https://vuejs.org/v2/guide/routing.html) 

We need to take advantage of some of the vue router magic to link to said routes.

In this case we will replace:

```

<ul v-if="posts”>

<li *v-for*="post in posts">

	<h2>{{ post.title.rendered }}</h2>

	{{ post.excerpt.rendered }}

</li>

</ul>

```

With this

```

<ul v-if="posts”>

<li *v-for*="post in posts">

	<h2>

		<router-link :*to*="’/’ + post.id">

{{ post.title.rendered }}

</router-link>

</h2>

	{{ post.excerpt.rendered }}

</li>

</ul>

```

ADDITIONAL REFERENCE: [https://vuejs.org/v2/guide/syntax.html#v-on-Shorthand](https://vuejs.org/v2/guide/syntax.html#v-on-Shorthand) for the meaning of `@` and `:` inside components.

In this case `v-bind:to` and `:to` are identical.

There are a few ways we could actually do this.  Here’s we’re being explicit with our router link, but we could also be more dynamic by referencing the route name like this.

```

<router-link :*to*="**{ name: 'Posts', pa****rams****: { id: post.id }}**">{{ post.title.rendered }}</router-link>

```

ADDITIONAL REFERENCE: [https://router.vuejs.org/en/essentials/history-mode.html](https://router.vuejs.org/en/essentials/history-mode.html) what’s with the `/#/` in the url?

## Back over on the Post.vue Component

We could then add a link back to the homepage, just so we don’t have to rely on the back button.

```

<router-link :*to*="/">Home</router-link>

```

# Displaying our Single Post Data

The last thing we need to do is render our single post data into our `Posts.vue` component.

There are several ways we could do this, for sake of time, we’re going to use our router to determine our post id, and fetch the post id with a computed property.

The router, like state is available directly within the Vue instance. We can dump it into our template to see the result.

```

Route ID: {{ $route.params.id }}

```

Next we’ll add a computed property.

```

computed: {

post() {

*return this.$store.getters.singlePost*

}

}

```

And then in our template above we can simply output the same info as we did in our `HelloWorld` component.

```

<div v-if="post”>

<h1>{{ post.title.rendered }}</h1>

<div *v-html*="post.content.rendered"></div>

</div>

```

![image alt text](https://user-images.githubusercontent.com/5230729/36917422-06d7dcec-1e14-11e8-93f4-0b9361f6c1d9.jpg)

# If there’s time

## Transitions

The transition between the two routes is pretty harsh.  We can make things a little nicer with a vue router transition and some css around our `<router-view/>` component.

[https://vuejs.org/v2/guide/transitions.html](https://vuejs.org/v2/guide/transitions.html) 

```

<template>

<div *id*="app">

	<transition name="fade”>

<router-view/>

</transition>

</div>

</template>

```

And the style

```

<style>

.fade-enter-active, .fade-leave-active {

 transition: opacity .5s;

}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {

 opacity: 0;

}

</style>

```

