import { Guard } from "./guard.interface"

export function createAuthGuard(router) {
  return (to, from, next) => {
    console.log("Auth fnc", to, from, next)
    if (!to.matched.some(record => record.meta.requiresAuth)) {
      next();
      return;
    }

    if (router.app.$svsAuth.isAuthenticated) {
      next();
      return;
    }

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}

export class AuthGuard extends Guard {

  constructor() {
    super()

    super.beforeEach = async function(to, from) {
      console.log("To:", to)
      console.log("From:", from)

      if(!this.hasMetaTrigger(to, 'requiresAuth'))
        return

      
        
    }
  }

}
