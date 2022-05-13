import Vue from "vue"

export const RouterHelperMixin = {
  computed: {
    /**
     * @returns {string}
     */
    baseRoute() {
      let l = this.$route.matched.length
      return this.$route.matched[l - 2].path
    },
    subpagePath() {
      let l = this.$route.matched.length
      let parentRoute = this.$route.matched[l - 2].path
      let actualRoute = this.$route.matched[l - 1].path
      let spp = actualRoute
        .substring(parentRoute.length)
        .replace(/:[A-Za-z0-9-_]+/g, '')
        .replace(/\//g, "")
      return spp
    },
    subpagePathWithoutId() {
      let l = this.$route.matched.length
      let parentRoute = this.$route.matched[l - 2].path
      let actualRoute = this.$route.matched[l - 1].path
      let spp = actualRoute
        .substring(parentRoute.length)
        .replace(/:[A-Za-z0-9-_]+/g, '')
        .replace(/\//g, "")
      return spp
    },
    queryString() {
      // let query = Object.assign({}, a)
      let query = this.$route.query
      return Object.entries(query).map(p => p.join('=')).join('&')
    },
    collectionInQuery() {
      return this.$route.query['col']
    }
  },
  methods: {
    __fuzeQuery(srcQuery, queryParams){
      if (!srcQuery && !queryParams) return {}
      if (srcQuery && !queryParams) return srcQuery
      if (!srcQuery && queryParams) return queryParams
      return Object.assign(Object.assign({}, srcQuery), queryParams)
    },
    __toQueryString(queryParams) {
      if (!queryParams) return null
      return Object.entries(queryParams).map(p => p.join('=')).join('&')
    },
    __addQueryToPath(path, queryParams, dropQuery) {
      let fullPathArray = [path]
      let query = {}
      if (this.subpagePath === 'collection') {
        query = { 'col': this.$route.params.id}
      }
      if (!dropQuery)
        query = this.__fuzeQuery(query, this.$route.query)
      query = this.__fuzeQuery(query, queryParams || {})
      if (query)
        fullPathArray.push(this.__toQueryString(query))
      
      return fullPathArray.join('?')
    },
    /**
     * @returns {string}
     */
    collectionRoute(collectionOrId, queryParams, dropQuery) {
      let id = typeof collectionOrId === 'string' ? collectionOrId : collectionOrId.id
      let path = [this.baseRoute, 'collection', id].join('/')
      return this.__addQueryToPath(path, queryParams)
    },
    /**
     * @returns {string}
     */
    albumRoute(albumOrId, queryParams, dropQuery) {
      let id = typeof albumOrId === 'string' ? albumOrId : albumOrId.id
      let path = [this.baseRoute, 'album', id].join('/')
      return this.__addQueryToPath(path, queryParams)
    },
    /**
     * @returns {string}
     */
    trackRoute(trackOrId, queryParams, dropQuery) {
      let id = typeof trackOrId === 'string' ? trackOrId : trackOrId.id
      let path = [this.baseRoute, 'track', id].join('/')
      return this.__addQueryToPath(path, queryParams)
    },
    navigateToAlbum(albumOrId) {
      this.$router.push(this.albumRoute(albumOrId))
    },
    navigateToTrack(trackOrId) {
      this.$router.push(this.trackRoute(trackOrId))
    },
    navigateToCollection(collectionOrId) {
      let col = this.collectionInQuery 
      if (collectionOrId) {
        if (typeof collectionOrId === 'string') {
          col = collectionOrId
        } else {
          col = collectionOrId.id
        }
      }
      col = col || 'svs-iv'
      this.subpagePath
      this.$router.push(this.collectionRoute(col))
    }
  }
} 