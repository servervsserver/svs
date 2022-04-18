export class User {

  constructor() {
    this.id = "123456789"
    this.nickname = "default user name"
    this.discordTag = "default discord tag"
    this.icon = "/placeholders/uwu_colored_svs.jpg"
    this.isStaff = true
    this.isServerLeader = true
    
  }

  static fromAuthServData(data) {

    console.log(data)
    if (data === "string") {
      try {
        data = JSON.parse(data)
      } catch (err) {
        console.warn("Couldn't parse the string auth data")
        return null
      }
    }

    if (!data) return null

    let user = new User()
    user.id = data["id"]
    user.nickname = data["name"] || ""
    user.discordTag = data["tag"] || ""
    user.isStaff = data["isStaff"] || ""
    user.isServerLeader = data["isLeaders"] || ""
    user.icon = data["icon"]

    return user
  }

  stringify() {
    return JSON.stringify(this)
  }

  fromPlainObject(obj) {
    if (!obj) return this
    this.id               = obj["id"]
    this.nickname         = obj["nickname"]
    this.discordTag       = obj["discordTag"]
    this.isStaff          = obj["isStaff"]
    this.isServerLeader   = obj["isServerLeader"]
    this.icon             = obj["icon"]
    return this
  }

  fromJsonString(str) {
    return this.fromPlainObject(JSON.parse(str))
  }

  static fromPlainObject(obj) {
    if (!obj) return null
    return new User().fromPlainObject(obj)
  }

  static fromJsonString(str) {
    if (!str) return null
    let obj = JSON.parse(str)
    if (!obj) return null
    return new User().fromPlainObject(obj)
  }

}
