export class ServerApplication {

  constructor(name, discordInvite, icon, admins, description, submission_date) {
    this.vueId = Math.floor(Math.random() * 123456)
    if (!name) throw Error("Name cannot be null")
    this.name = name

    if (!discordInvite) throw Error("Discord link cannot be null")
    this.discordInvite = discordInvite

    // if (!icon) throw Error("Icon cannot be null")
    this.icon = icon
    this.icon_url = ""


    if (!admins || !(admins instanceof Array)) throw Error("Admins must be an array")
    this.admins = admins

    if (!description) throw Error("Description cannot be null")
    this.description = description

    if (!submission_date) {
      console.warn("No date provided, defaults to Now")
      submission_date = new Date()
    }
    this.submission_date = submission_date

  }


  toFirestore(serverApplication) {
    return {
      name: serverApplication.name,
      discord_invite: serverApplication.discordInvite,
      icon: serverApplication.icon,
      admins: serverApplication.admins,
      description: serverApplication.description
    }
  }

}

export const ServerApplicationConverter = {
  /**
  * Converts a server application object from its firestore data counter part
  */
  toFirestore(serverApplication) {
    return {
      name: serverApplication.name,
      discord_invite: serverApplication.discordInvite,
      iconExt: serverApplication.icon.name.split(".").pop(),
      admins: serverApplication.admins,
      description: serverApplication.description,
      submission_date: serverApplication.submission_date
    }
  },
  fromFirestore(data) {
    // console.log(data.submission_date.seconds)
    let sa = new ServerApplication(
      data.name,
      data.discord_invite,
      data.iconExt,
      data.admins,
      data.description,
      new Date(data.submission_date.seconds * 1000)
    )
    sa.icon_url = data.icon_url
    console.log(data, sa)
    return sa
  }
}
