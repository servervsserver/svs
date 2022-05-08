import Vue from 'vue'

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

/**
* Flags of the cookie type. They can be combined like flags
*/
export const COOKIE_TYPE = Object.freeze({
  STRICTLY_NECESSARY: 1,
  FUNCTIONAL: 2,
  ANALYTICAL: 4
})

const COOKIE_TYPE_NAMES = Object.freeze({
  "1": "Strictly necessary",
  "2": "Functional",
  "4": "Analytical",
})

/** Number of seconds for a one minute expiracy */
const ONE_MINUTE_EXPIRACY = 60
/** Number of seconds for a one hour expiracy */
const ONE_HOUR_EXPIRACY = ONE_MINUTE_EXPIRACY * 60
/** Number of seconds for a one day expiracy */
const ONE_DAY_EXPIRACY = ONE_HOUR_EXPIRACY * 24
/** Number of seconds for a one month expiracy */
const ONE_MONTH_EXPIRACY = ONE_DAY_EXPIRACY * 30
/** Number of seconds for a one semester expiracy */
const ONE_SEMESTER_EXPIRACY = ONE_DAY_EXPIRACY * 182
/** Number of seconds for a one year expiracy */
const ONE_YEAR_EXPIRACY = ONE_DAY_EXPIRACY * 365

function humanlyReadableExpiracy(expiracy) {
  switch(expiracy) {
    case ONE_MINUTE_EXPIRACY:
      return "1 minute"
    case ONE_HOUR_EXPIRACY:
      return "1 hour"
    case ONE_DAY_EXPIRACY:
      return "1 day"
    case ONE_MONTH_EXPIRACY:
      return "1 month"
    case ONE_SEMESTER_EXPIRACY:
      return "6 months"
    case ONE_YEAR_EXPIRACY:
      return "1 year"
  }
}

function decomposeType(type) {
  let decomposedTypes = []
  for(const potentialType in COOKIE_TYPE) {
    let value = COOKIE_TYPE[potentialType]
    if (value & type) {
      decomposedTypes.push(value)
    }
  }
  return decomposedTypes
}
function humanlyReadableTypes(type) {
  return decomposeType(type)
    .map(t => COOKIE_TYPE_NAMES[t])
    .join(", ")
}

class Cookie {

  /**
  * Creates a new cookie with meta informations
  * @param name : String the name of the cookie
  * @param purpose : string A short description of the cookie's purpose
  * @param expiracy : number The duration of the cookie in seconds
  * @param types : COOKIE_TYPE Type of the cookie. Can be combined like flags
  */
  constructor(name, purpose, expiracy , types) {
    /**
    * The name of the cookie
    */
    this.name = name

    /**
    *
    */
    this.purpose = purpose

    /**
    * The duration of the cookie in seconds
    */
    this.expiracy = expiracy


    this._types = types
  }

  isOfType(type) {
    return this._types & type
  }

  get isStrictlyNecessary() {
    return this.isOfType(COOKIE_TYPE.STRICTLY_NECESSARY)
  }

  get isFunctional() {
    return this.isOfType(COOKIE_TYPE.FUNCTIONAL)
  }

  get isAnalytical() {
    return this.isOfType(COOKIE_TYPE.ANALYTICAL)
  }

  get humanlyReadableExpiracy() {
    return humanlyReadableExpiracy(this.expiracy)
  }

}

class ThirdPartyCookie {

  /**
  * Creates meta informations for third party cookie
  * @param thirdPartyName : String the name of the service that needs these Cookies
  * @param type : String the type of cookie they need
  * @param cookiePolicyLink : String A link to their cookie policy
  */
  constructor(thirdPartyName, type, cookiePolicyLink) {

    this.thirdPartyName = thirdPartyName
    this.type = type
    this.cookiePolicyLink = cookiePolicyLink
  }

  get humanlyReadableTypes() {
    return humanlyReadableTypes(this.type)
  }
}


const COOKIES = [
  new Cookie(
    'cookiepreference',
    "Saves the user's cookie settings.",
    ONE_YEAR_EXPIRACY,
    COOKIE_TYPE.STRICTLY_NECESSARY
  ),
  new Cookie(
    "usertheme",
    "Stores the users preferred application theme",
    ONE_SEMESTER_EXPIRACY,
    COOKIE_TYPE.FUNCTIONAL
  )
]

const THIRD_PARTY_COOKIES = [
  new ThirdPartyCookie(
    "Soundcloud",
    COOKIE_TYPE.ANALYTICAL,
    "https://soundcloud.com/pages/cookies"
  )
]

export class CookiePreference {

  constructor() {
    this.functional = false
    this.analytical = false
    this.thirdparty = false
  }

  rejectAll() {
    this.functional = false
    this.analytical = false
    this.thirdparty = false
  }

  acceptAll() {
    this.functional = true
    this.analytical = true
    this.thirdparty = true
  }

  stringify() {
    return JSON.stringify(this)
  }

  setFromString(str) {
    if (!str) return this
    return this.setFromPlainObject(JSON.parse(str))
  }

  setFromPlainObject(obj) {
    if (!obj) return this
    this.functional = !!obj["functional"]
    this.analytical = !!obj["analytical"]
    this.thirdparty = !!obj["thirdparty"]
    return this
  }

  static fromString(str) {
    if (!str) return null
    return new CookiePreference().setFromString(str)
  }

  static fromPlainObject(obj) {
    if (!obj) return null
    return new CookiePreference().setFromPlainObject(obj)
  }


}

export default class SettingsPlugin {

  constructor() {

    this._vue = new Vue({
      data: {
        theme: "dark-theme",
        cookies: COOKIES,
        thirdPartyCookies: THIRD_PARTY_COOKIES,
        hasCookiePreference: false
      }
    })

    this._vue.$data.hasCookiePreference = !!this.cookiePreference

    if (this.canUseFunctionalCookies) {
      let cookieTheme = this._vue.$cookie.get('usertheme')
      if (cookieTheme) {
        this._vue.$data.theme = cookieTheme
      }
    }

  }

  // =================== Theme

  setTheme(theme) {
    this._vue.$data.theme = theme

    if (this.canUseFunctionalCookies)
      this._vue.$cookie.set("usertheme", theme)
  }

  set theme(value) {
    this.setTheme(theme)
  }

  get theme() {
    return this._vue.$data.theme
  }

  // ================= Adminstration

  get showDevInfos() {
    console.log(this.$svsAuth)
    return true
  }

  // ================= Cookies

  /**
  * Sets the cookie preferences
  * @param preference : CookiePreference
  */
  set cookiePreference(preference) {
    this._vue.$cookie.set("cookiepreference", preference.stringify())
    this._vue.$data.hasCookiePreference = true
  }

  get cookiePreference() {
    return CookiePreference.fromString(this._vue.$cookie.get("cookiepreference"))
  }

  get hasCookiePreference() {
    return this._vue.$data.hasCookiePreference
  }

  get canUseFunctionalCookies() {
    let cp = this.cookiePreference
    if (!cp) return false
    return cp.functional
  }

  deleteCookiePereference () {
    this._vue.$cookie.delete("cookiepreference")
    this._vue.$data.hasCookiePreference = false
  }

  /**
  * Get the list of strictly necessary cookies we use
  */
  get strictlyNecessaryCookies () {
    return this._vue.$data.cookies.filter(cookie => cookie.isStrictlyNecessary)
  }

  /**
  * Get the list of function cookies we use
  */
  get functionalCookies () {
    return this._vue.$data.cookies.filter(cookie => cookie.isFunctional)
  }

  /**
  * Get the list of analytical cookies we use
  */
  get analyticalCookies () {
    return this._vue.$data.cookies.filter(cookie => cookie.isAnalytical)
  }

  /**
  * Get the list of third party cookies we use
  */
  get thirdPartyCookies () {
    return this._vue.$data.thirdPartyCookies
  }


  static install (Vue, options) {
    Vue.prototype.$svsSettings = new SettingsPlugin()
  }

}
