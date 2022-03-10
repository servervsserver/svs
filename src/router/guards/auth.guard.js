export default function(router) {
  return (to, from, next) => {
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
