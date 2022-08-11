<template>
    <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <div v-for="i in 100" 
        class="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all">
            <PostNotLoaded />
        </div>
    </div>
</template>
<script>
import PostNotLoaded from './posts/PostNotLoaded.vue'

export default {
    components: {
        PostNotLoaded
    },
}
</script>
