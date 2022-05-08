import * as Archive from "../models"

export default class CatalogPlugin {

  constructor(Vue) {

    this._catalog = new Archive.AsyncCatalog()

  }

  get mainCatalog() {
    return this._catalog
  }

  static install(Vue, options) {
    Vue.prototype.$svsCatalog = new CatalogPlugin(Vue)
  }

}