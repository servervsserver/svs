/**
* Content of the navbar. Each item is linked to a route element by its name.
*/
export const navbarContent = [
  {
    name: 'SvS IV',
    children: [
      { name: 'SvS IV Overview', display: 'Overview' },
      { name: 'SvS IV Rules', display: 'Rules' },
      { name: 'SvS IV Participants', display: 'SvS IV Servers' },
      { name: 'SvS IV Catalog', display: 'The EPs!' },
      { name: 'SvS IV Vote', display: 'Vote for the awards!' }
      // { name: 'SvS IV EP Submission', display: 'EP Submission' }
    ]
  },
  {
    name: 'Archives'
  },
  {
    name: 'Admin',
    // children: [
    //   { name: 'DashboardAdmin' },
    //   { name: 'ServerListAdmin' },
    //   { name: 'AnonymousConcernsAdmin' },
    //   { name: 'Administration For Devs' }
    // ]
  },
  {
    name: 'About', display: 'About Us'
  }
]

if (process.env.VUE_APP_SHOW_DEVNAVBAR == "true") {

  navbarContent.push(
    {
      name: 'Dev',
      children: [
        { name: 'Track Dev' },
        { name: 'Toggle Voting Dev' },
        { name: 'Profile Dev' },
        { name: 'Validator Dev' },
        { name: 'ColorPaletteTest Dev' },
        { name: 'Backend Tests Dev' }
      ]
    }
  )

}



export { populateNavbar } from "./utils.js"
