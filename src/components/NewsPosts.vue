<template>
  <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3"></div>
    </div>
    <div class="relative max-w-7xl mx-auto">


      <!-- Title  -->
      <div class="text-left">
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          {{ this.title }}
        </h2>
        <!--  Sub Title -->
        <p class="mt-3  text-xl text-gray-500 sm:mt-4 pb-4  w-full">
          {{ this.subTitle }}
        </p>


        
        <div class="pb-9 w-full border-b-2 border-gray-300 flex flex-wrap">
          <div v-for="querySuggestion in querySuggestions" :key="querySuggestion" class="">
            <button @click="this.$emit('queryChange', querySuggestion); currentlyActive=querySuggestion" :class="currentlyActive==querySuggestion ? 'bg-gray-800 text-white' : 'bg-slate-200 text-slate-500' " 
            class="ml-2 mt-2 shadow-2xl p-2.5  rounded-2xl ">
              {{ querySuggestion }}
            </button>
          </div>

        </div>

      </div>



      <div id="showIfLoading" v-if="isLoading">
        <!-- News Post Loading Component -->
        <LoadingPosts />
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none" v-if="!isLoading">
        <div v-for="post in postsToPush" :key="post.title"
          class="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all border-gray-600 hover:border-2">
            <Post :post="post" />
        </div>

      </div>

      <FooterCredits />

    </div>

  </div>

</template>

<script>

const axios = require('axios').default;

import FooterCredits from "./FooterCredits.vue";
import LoadingPosts from "./LoadingPosts.vue";
import Post from "./posts/Post.vue";
import PostNotLoaded from "./posts/PostNotLoaded.vue";



export default {
  data() {
    return {
      currentlyActive: '',
      postsImageLoading: [],
    }

  },
  props: {
    title: String,
    subTitle: String,
    isLoading: Boolean,
    postsToPush: Array,
    querySuggestions: Array,
  },
  components: { FooterCredits, LoadingPosts, Post, PostNotLoaded, PostNotLoaded }
}
</script>

<style lang="css">
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

.skeleton-text {
  width: 100%;
  height: .5rem;
  margin-bottom: .25rem;
  border-radius: .25rem;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }

  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>