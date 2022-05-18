import { Route, VueRouter } from "vue-router"

/**
 * @typedef {(to: Route, from: Route) => Route | false | undefined} NavigationFnc
 */
export class Guard {

  constructor() {

    /**
     * @type {async NavigationFnc | NavigationFnc | null}
     */
    this.beforeEach = null
    /**
     * @type {VueRouter}
     */
    this.router = null
  }

  /**
   * 
   * @param {Route} to 
   * @param {string} triggerProperty 
   */
  hasMetaTrigger(to, triggerProperty) {
    return to.matched.some(record => record.meta[triggerProperty])
  }

  /**
   * 
   * @param {VueRouter} router Router to register the guard for
   */
  registerTo(router) {
    if (!router) {
      console.warn("Can't register, no router provided")
      return
    }

    this.router = router
    
    console.log(this, this.beforeEach)
    if (this.beforeEach) {
      router.beforeEach(
        async (to, from, next) => {
          console.log("New guard system")
          let res = await this.beforeEach(to, from)
          next(res)
        }
      )
    }
  }


}

/**
 * Registers a guard to a vue router
 * @param {Guard} guard
 * @param {VueRouter} router
 */
Guard.registerTo = function(guard, router) {
  if (!guard) {
    console.warn("No guard, can't register")
    return
  }

  guard.registerTo(router)
}