import TractTest from '../views/test-views/TrackTest.vue'
import ValidatorTest from '../views/test-views/ValidatorTest.vue'
import MainTest from '../views/test-views/MainTest.vue'
import ColorPaletteTest from '../views/test-views/ColorPalette.vue'

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
    },
    {
      path: 'color-palette',
      name: 'ColorPaletteTest',
      component: ColorPaletteTest
    }
]

function createTestBlockRouter(path) {
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
  }
}
