export const DiscordFlags = Object.freeze({
  STAFF: 1 << 0,
  PARTNER: 1 << 1,
  HYPESQUAD: 1 << 2,
  BUG_HUNTER_LEVEL_1: 1 << 3,
  HYPESQUAD_ONLINE_HOUSE_1: 1 << 6,
  HYPESQUAD_ONLINE_HOUSE_2: 1 << 7,
  HYPESQUAD_ONLINE_HOUSE_3: 1 << 8,
  PREMIUM_EARLY_SUPPORTER: 1 << 9,
  TEAM_PSEUDO_USER: 1 << 10,
  BUG_HUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT: 1 << 16,
  VERIFIED_DEVELOPER: 1 << 17,
  CERTIFIED_MODERATOR: 1 << 18,
  BOT_HTTP_INTERACTIONS: 1 << 19,
})


export class DiscordUserProfile {

  constructor() {

    this.accentColor  = null

    /** @type {string} */
    this.avatar       = null

    this.avatarDecoration = null

    this.banner         = null

    this.bannerColor   = null

    /** @type {string} 4-digits string discriminating two users with the same username */
    this.discriminator  = null
    
    /**
     * @type {string} Mail
     */
    this.email          = null

    /** @type {number} Flags of the user @see DiscordFlags */
    this.flags          = 0

    /**
     * @type {string} Id of the user
     */
    this.id             = null

    /** @type {string} Language of the user */
    this.locale         = "en-US"

    /** @type {boolean} Has Multi Factor Authentication enabled */
    this.mfaEnabled    = true
    
    /** @type {number} Public flags of the user @see DiscordFlags */
    this.publicFlags   = 256

    /** @type {string} Username */
    this.username       = "Jiway"

    /** @type {boolean} Whether or not the profile is verified */
    this.verified       = false

  }

  get fullName() {
    return `${this.username}#${this.discriminator}`
  }
  fromDiscordApi(apiDiscordUser) {
    if (!apiDiscordUser) return

    this.accentColor = apiDiscordUser['accent_color']
    this.avatarDecoration = apiDiscordUser['avatar_decoration']
    this.banner = apiDiscordUser['banner']
    this.bannerColor = apiDiscordUser['banner_color']
    this.discriminator = apiDiscordUser['discriminator']
    this.email = apiDiscordUser['email']
    this.flags = apiDiscordUser['flags']
    this.id = apiDiscordUser['id']
    this.locale = apiDiscordUser['locale']
    this.mfaEnabled = apiDiscordUser['mfa_enabled']
    this.publicFlags = apiDiscordUser['public_flags']
    this.username = apiDiscordUser['username']
    this.verified = apiDiscordUser['verified']

    return this
  }

  static fromDiscordApi(apiDiscordUser) {
    if (!apiDiscordUser) return null

    return new DiscordUserProfile().fromDiscordApi(apiDiscordUser)
  }

}