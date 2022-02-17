import { v4 as generateUuid } from "uuid"

export class StaffCard {

  constructor(name, pronouns, role, description, discordTag, avatarUrl, extraSocialsLinks) {

    this._vueId = generateUuid()

    this.name = name || "Anon staff member"
    this.pronouns = pronouns || "he/she/they"
    this.role = role || "A role"
    this.description = description || "Rofl, this is a description but I don't want to make a correct description."
    this.discordTag = discordTag || "Anonstaffmember#1234"
    this.avatarUrl = avatarUrl || "/placeholders/ep_cover_art_placeholder_icon.jpg"
    this.extraSocialsLinks = extraSocialsLinks || {}
  }

  get vueId() {
    return this._vueId
  }

}
