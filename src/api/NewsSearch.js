const axios = require('axios').default;

class NewsSearch {

    constructor(options = {}) {

        this.url = options.api_url || "https://inform-me.najafi.cc/api/v1/NewsGen.php";
        this.queryUrl = "https://inform-me.najafi.cc/api/v1/NewsGen.php";
        this.postsPerPage = options.postsPerPage || 10;
        this.limit = options.limit || 10;
        this.skip = options.skip || 0;
        this.currentVirtualPage = 1;
        this.query = "";

        
    }

    search(query) {
        this.query = query;
        const builtUrl = this.url + "?q=" + encodeURI(query) + "&limit=" + encodeURI(this.limit) + "&skip=" + encodeURI(this.skip);
        this.queryUrl = builtUrl;
        console.log("THIS IS FROM THE 'NewsSearch.js' API FILE - builtUrl: " + builtUrl);
        return axios.get(builtUrl)
            .then(response => {

                console.log(response.data);
                if (response.data.length === 0) {
                    return false; 
                }
                return response.data;
            })
            .catch(error => {
                return false;
            })
    }



    nextPage() {
        this.skip += this.postsPerPage;
        this.currentVirtualPage++;
        const builtUrl = this.url + "?q=" + encodeURI(this.query) + "&limit=" + encodeURI(this.limit) + "&skip=" + encodeURI(this.skip);
        this.queryUrl = builtUrl;

        return axios.get(builtUrl)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return false;
        })
    }


    prevPage() {
        this.skip -= this.postsPerPage;
        this.currentVirtualPage--;
    }

    reset() {
        this.skip = 0;
        this.currentVirtualPage = 1;
    }
}

export default NewsSearch;

export const NewsSearchInstance = new NewsSearch();

export const NewsSearchEnum = {
    NewsSearchError: {
        NO_RESULTS: 0,
        NO_MORE_RESULTS: 1,

    }
};


