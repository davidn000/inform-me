

<template>

    <div id="header-outer" class="md:sticky md:-top-20 md:h-96 ">

        <div class="relative md:sticky md:top-0 md:z-0 inline-block w-full overflow-hidden h-48 md:h-96 bg-white">

            <SearchBox @search="searchEventHandler" />

            <canvas id="background" class=""></canvas>

        </div>
    </div>



    <div ref="scrollComponent" class="">
        <NewsPosts @queryChange="queryChangeHandler" :querySuggestions="this.querySuggestions" :postsToPush="posts.concat(nPTA)" :title="this.title" :subTitle="this.subTitle" :isLoading="this.isLoading" />
    </div>

</template>

<script>

import { ref, onMounted, onUnmounted } from 'vue'
import  { NewsSearchInstance } from '@/api/NewsSearch'
import '@/assets/libraries/gradient/Gradient'
import SearchBox from '@/components/SearchBox.vue';
import NewsPosts from '@/components/NewsPosts.vue';






document.addEventListener('DOMContentLoaded', function () {

    new Gradient({
        canvas: '#background',
        colors: ['#4bff97', '#57ceff', '#a960ee', '#ff333d']
    });
    var xcanvas = document.getElementById('background')
    xcanvas.style.filter = "blur(8px)" // A nice blur effect over the gradient.
    xcanvas.style.transform = "scale(1.05)" // So I can remove the ugly white borders from canvas


})


export default {
    name: 'IndexPage',
    components: {
        SearchBox,
        NewsPosts
    },
    data: () => ({
        query: "",
        title: "Breaking news",
        subTitle: "The latest news from around the world.",
        posts: [],
        isLoading: true,
        querySuggestions: ['Tesla', 'London', 'Amazon', 'NFL', 'Football'],
    }),

    methods: {
        searchEventHandler(query) {
            this.posts = []
            this.isLoading = true;
            if (this.query === query) {
                return
            }

            if (query === "") {
                this.query = ""
                this.title = "Breaking news"
                this.subTitle = "The latest news from around the world."
            } else {
                this.query = query
                this.title = "Informing you about: " + query
                this.subTitle = `These are the latest search results for your query.`

            }
            this.nPTA = []
            NewsSearchInstance.reset()
            this.populateNewPostQuery()
        },
        populateNewPostQuery() {
            const virtual = this

            const searchResult = NewsSearchInstance.search(this.query)
            if (searchResult !== false) {

                const promiseValue = searchResult.then(function (result) {
                    if (result == false) {
                        virtual.noResults = true  
                        virtual.isLoading = false                      
                    }else {
                        virtual.posts = result
                        virtual.isLoading = false                        
                        virtual.noResults = false
                    }

                }).catch(function (error) {
                    console.log(error)
                }).finally(function () {
                    console.log("New query populated. - populateNewPostQuery()")
                })

            } else {
                alert('There was an error with the search.')
            }
        },
        getNewBlogPosts(){
            const searchResult = NewsSearchInstance.search(this.query)
            let returnValue = false;
            if (searchResult !== false) {

                const promiseValue = searchResult.then(function (result) {


                    returnValue = result

                }).catch(function (error) {
                    console.log(error)
                }).finally(function () {
                    console.log("New query populated. - getNewBlogPosts()")
                })

            } else {
                console.log('There was an error with the search')
            }     
            
            return returnValue
        },
        queryChangeHandler(newQuery) {
            this.searchEventHandler(newQuery)
        }




    },
    mounted() {
        const virtual = this

        const searchResult = NewsSearchInstance.search(this.query)
        if (searchResult !== false) {
            const promiseValue = searchResult.then(function (result) {
                virtual.posts = result
                virtual.isLoading = false
            }).catch(function (error) {
                console.log(error)
            }).finally(function () {
                console.log('Application is ready.')
            })
        } else {
            window.alert('Error with search. Please try again.')
        }
    },

    setup() {
        const nPTA = ref([])
        const scrollComponent = ref(null)

        const loadMorePosts = () => {
            const searchResult = NewsSearchInstance.nextPage()
            let newPosts = [];
            if (searchResult !== false) {

                const promiseValue = searchResult.then(function (result) {
                    newPosts = result
                    nPTA.value.push(...result)
                }).catch(function (error) {
                    console.log(error)
                })

            } else {
                window.alert('Error with search. Please try again.')
            }
            
        }


        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })

        const handleScroll = (e) => {

            // check to see if client is 500px from bottom then load more posts
            if (scrollComponent.value.getBoundingClientRect().bottom - window.innerHeight <= 500) {
                loadMorePosts()

            }

        }

        return {
            nPTA,
            scrollComponent,
        };
    }
}
</script>
