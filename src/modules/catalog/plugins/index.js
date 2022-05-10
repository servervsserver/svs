import * as Archive from "../models"

/**
 * @typedef {{ icon?: { klass: string }, text?: string, fnc: (track: Archive.Track, index: number) => void}} TrackListItemAction
 */

export default class CatalogPlugin {

  constructor(Vue) {

    this._catalog = new Archive.AsyncCatalog()

    this._trackListItemActions = []
  }

  /**
   * 
   * @param {TrackListItemAction} action 
   * @returns 
   */
  addActionToTrackListItem(action) {
    if (!action) return
    this._trackListItemActions.push(action)
  }

  get trackListItemActions() {
    return this._trackListItemActions
  }

  get mainCatalog() {
    return this._catalog
  }

  static install(Vue, options) {
    Vue.prototype.$svsCatalog = new CatalogPlugin(Vue)
  }

}