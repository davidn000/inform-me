<template>
    <div class="flex-shrink-0">
        <img class="h-48 w-full object-cover skeleton" :src="post.image" alt=""  />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
        <div class="flex-1">
            <p class="text-sm font-medium text-gray-600">
                <a target="__blank" :href="post.url" class="hover:underline">
                    {{ post.author }}
                </a>
            </p>
            <a target="__blank" :href="post.url" class="block mt-2">
            <p class="text-xl font-semibold text-gray-900">
                {{ post.title }}
            </p>
            <p class="mt-3 text-base text-gray-500">
                {{ post.summary }}
            </p>
            </a>
        </div>
        <div class="mt-6 flex items-center">
            <div>
                <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="{{new Date(post.dateLong).getFullYear()}} {{new Date(post.dateLong).getMonth()}} {{new Date(post.dateLong).getDate()}}">
                        {{ monthNumberRepresentation[new Date(post.dateLong).getMonth()] }}  {{ new Date(post.dateLong).getDate() }}, {{ new Date(post.dateLong).getFullYear() }}
                    </time>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            monthNumberRepresentation: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    },

}
</script>
