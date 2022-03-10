/**
* Content of the navbar. Each item is linked to a route element by its name.
*/
export const navbarContent = [
  {
    name: 'SvS IV',
    children: [
      { name: 'SvS IV Overview', display: 'Overview' },
      { name: 'SvS IV Rules', display: 'Rules' },
      { name: 'SvS IV Server Application', display: 'Server Application' },
      { name: 'SvS IV EP Submission', display: 'EP Submission'}
    ]
  },
  {
    name:'Archives'
  },
  {
    name: 'Admin',
    children: [
      { name: 'DashboardAdmin' },
      { name: 'ServerListAdmin' },
      { name: 'AnonymousConcernsAdmin' }
    ]
  },
  {
    name: 'About', display: 'About Us'
  }
]

export { populateNavbar } from "./utils.js"
