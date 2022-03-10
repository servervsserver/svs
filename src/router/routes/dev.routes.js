import TractTest from '@/views/test-views/TrackTest.vue'
import ValidatorTest from '@/views/test-views/ValidatorTest.vue'
import MainTest from '@/views/test-views/MainTest.vue'
import ColorPaletteTest from '@/views/test-views/ColorPalette.vue'
import ProfileTest from '@/views/test-views/ProfileTest.vue'
import CookieBanner from '@/components/cookie/CookieBanner.vue'
import OpenVoting from '@/components/OpenVoting.vue'

const DEV_ROUTES = [
  {
    path: 'track',
    name: 'Track Dev',
    component: TractTest
  },
  {
    path: 'togglevoting',
    name: 'Toggle Voting Dev',
    component : OpenVoting
  },
  {
    path: 'profile',
    name: 'Profile Dev',
    component: ProfileTest
  },
  {
    path: 'validator',
    name: 'Validator Dev',
    component: ValidatorTest
  },
  {
    path: 'color-palette',
    name: 'ColorPaletteTest Dev',
    component: ColorPaletteTest
  },
  {
    path: 'cookie-banner',
    name: 'Cookie Banner Dev',
    component: CookieBanner
  }
]

function createTestBlockRouter(path) {
  return {
      path: path,
      name: 'Dev',
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
