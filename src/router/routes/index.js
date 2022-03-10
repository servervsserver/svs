import PageNotFound from '@/views/PageNotFound.vue'

/* ===== Test vues ===== */
import { routes } from "./base.routes.js"
import { addTestBlockToRoutes } from "./dev.routes.js"
import { addAdminBlockToRoutes } from "./admin.routes.js"
import { addArchiveBlockToRoutes } from "./archive.routes.js"

export { routes } from './base.routes.js'
export { ARCHIVE_ROUTES } from "./archive.routes.js"
export { ADMIN_ROUTES } from "./admin.routes.js"

addArchiveBlockToRoutes(routes)
addAdminBlockToRoutes(routes)
addTestBlockToRoutes(routes)

routes.push({ path: '*', name: '404', component: PageNotFound })
