import { Menu } from "react-feather";

export const menuItems = [
   {
     title: <Menu />,
     url: '#',
     cname: 'icon',
     submenu: [
       {
         title: 'Connexion',
         url: '/connexion',
         cname: 'icon one',
       },
       {
        title: 'Inscription',
        url: '/inscription',
        cname: 'icon',
       },
     ],
   },
 ];
 