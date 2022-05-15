import * as Archive from "../models"
import { clearCache } from "../models/db"

/**
 * @typedef {{ icon?: { klass: string }, text?: string, fnc: (track: Archive.Track, index: number) => void}} TrackListItemAction
 * @typedef {{ icon?: { klass: string }, text?: string, fnc: (track: Archive.Track[]) => void}} TracksTopAction
 */

export default class CatalogPlugin {

  constructor(Vue) {

    this._catalog = new Archive.AsyncCatalog()

    this._trackListItemActions = []

    this._tracksTopActions = []

    this._version = 1

    {
      let v = localStorage.getItem('catalog-plugin/version')
      if (!v) {
        clearCache().then(v => { 
          console.log("Cache cleared automatically because its version was too old"
        )})
      }
      localStorage.setItem('catalog-plugin/version', this.version)
    }
  }

  get version() {
    return this._version
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

  /**
   * 
   * @param {TracksTopAction} action 
   * @returns 
   */
  addActionToTracksTopActions(action) {
    if (!action) return
    this._tracksTopActions.push(action)
  }

  get trackListItemActions() {
    return this._trackListItemActions
  }

  get tracksTopActions() {
    return this._tracksTopActions
  }

  get mainCatalog() {
    return this._catalog
  }

  static install(Vue, options) {
    Vue.prototype.$svsCatalog = new CatalogPlugin(Vue)
  }

}