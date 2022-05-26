import { Guard } from "./guard.interface"

export class AdminGuard extends Guard {

  constructor() {
    super()

    super.beforeEach = async function(to, from) {
      // console.log("To:", to)
      // console.log("From:", from)

      if(!this.hasMetaTrigger(to, 'requiresAdmin'))
        return

      await this.authPlugin.whenReady()

      if (this.authPlugin.isAdmin)
        return
      
      return {
        path: '/login',
        query: { 
          origin: new URL(window.location.href).origin,
          redirect: to.fullPath 
        }
      }
    }
  }


  get authPlugin() {
    return super.app.$svsAuth
  }
}
