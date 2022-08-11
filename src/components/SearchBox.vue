<template>
  <div class="absolute text-center w-full z-50 ">
    <div class="bg-neutral-50 rounded-lg w-11/12 md:w-9/12 h-max p-5 m-auto  mt-6 md:mt-24">
      <h1 class="font-bold text-gray-600  text-left transition-all"
        :class="searchFocused ? 'text-md md:text-xl' : 'text-xl md:text-2xl'">
        Inform me about:
      </h1>
      <div id="searchBox" class="w-full h-max rounded-lg mt-3 bg-white drop-shadow-2xl">
        <input @input="typingHandler" :placeholder="placeholder" @focus="placeholder = ''; searchFocused = true"
          @blur="placeholder = 'Search news...'; searchFocused = false" type="text" name="searchQuery" id="searchQuery"
          placeholder="Search news..."
          class="transition-all focus:text-2xl focus:drop-shadow-2xl focus:h-16 text-left w-full h-12 px-4 py-2 rounded-lg accent-gray-600 placeholder-gray-400">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchBox',
  data: () => ({
    placeholder: 'Search news...',
    searchFocused: false,
    query: "",
    typingHandler: function (e) {
      this.query = e.target.value
      this.$emit('search', this.query)
    },
  }),

}
</script>
