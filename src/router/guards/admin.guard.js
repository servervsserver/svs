export default function(router) {
  return (to, from, next) => {
    console.log("Admin fnc")
    if (!to.matched.some(record => record.meta.requiresAdmin)) {
      next();
      return;
    }

    if (router.app.$svsAuth.isAdmin) {
      next();
      return;
    }

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}
