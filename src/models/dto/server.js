export class Server {

  constructor () {
    this._uid = ""
    this.name = ""
    this.discordInviteLink = ""
    this.iconUrl = ""
    this.adminIds = []
    this.description = ""
    this.memberCount = 0
  }

  /**
  * Sets the content of this server based on the properties of an other server like object.
  * Any property undefined in the server will be untouched
  */
  setFrom (server) {
    if (server._uid !== undefined)
      this._uid = server._uid

    if (server.name !== undefined)
      this.name = server.name

    if (server.discordInviteLink !== undefined)
      this.discordInviteLink = server.discordInviteLink

    if (server.iconUrl !== undefined)
      this.iconUrl = server.iconUrl

    if (server.adminIds !== undefined) {
      this.adminIds = []
      for (let id of server.adminIds) {
        this.adminIds.push(id)
      }
    }

    if (server.description !== undefined)
      this.description = server.description

    if (server.memberCount !== undefined)
      this.memberCount = server.memberCount

    return this
  }

  copy () {
    return new Server().setFrom(this)
  }

}
