export class Server {

  constructor(id, name, iconUrl, description, discordInvite) {

    /**
     * @type {string} Id of the server
     */
    this.id     = id || null

    /**
     * @type {string} Name of the server
     */
    this.name   =  name || null

    /**
     * @type {string} url of the icon of the server
     */
    this.icon_url   = iconUrl || null

    /**
     * @type {string} Short description of the server
     */
    this.description  = description || null

    /**
     * @type {string} Discord invite link
     */
    this.discord_invite = discordInvite || null

  }

}