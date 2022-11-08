import { Menu } from "react-feather";

export const menuItems = [
   {
     title: <Menu />,
     url: '#',
     cname: 'icon',
     submenu: [
       {
         title: 'Home',
         url: '#home',
         cname: 'icon one',
       },
       {
        title: 'Skills',
        url: '#skills',
        cname: 'icon',
       },
       {
        title: 'Projects',
        url: '#projects',
        cname: 'icon',
       },
       {
        title: `Contact`,
        url: '#contact',
        cname: 'icon',
       },
     ],
   },
 ];
 