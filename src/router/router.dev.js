import TractTest from '../views/test-views/TrackTest.vue'
import ValidatorTest from '../views/test-views/ValidatorTest.vue'
import MainTest from '../views/test-views/MainTest.vue'

const DEV_ROUTES = [
    {
      path: 'track',
      name: 'Track',
      component: TractTest
    },
    {
      path: 'validator',
      name: 'Validator',
      component: ValidatorTest
    }
]

function createTestBlockRouter(path) {
  console.log(process.env)
  return {
      path: path,
      name: 'Test',
      component: MainTest,
      children: DEV_ROUTES
    }
}

export function addTestBlockToRoutes(routes, path) {
  if (process.env.NODE_ENV === "development") {
    if (!path) path = "/test"
    routes.push(createTestBlockRouter(path))
    console.log(routes)
  }
}
