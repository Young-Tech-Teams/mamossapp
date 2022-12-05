import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import styled from "styled-components";

const MenuItems = ({ items, depthLevel }) => {
   const [dropdown, setDropdown] = useState(false);

   let ref = useRef();

   useEffect(() => {
      const handler = (event) => {
         if (
            dropdown &&
            ref.current &&
            !ref.current.contains(event.target)
         ) {
            setDropdown(false);
         }
      };
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
      return () => {
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
      };
   }, [dropdown]);

   const onMouseEnter = () => {
      window.innerWidth > 960 && setDropdown(true);
   };

   const onMouseLeave = () => {
      window.innerWidth > 960 && setDropdown(true);
   };

   const closeDropdown = () => {
      dropdown && setDropdown(false);
   };

   return (
      <List 
         className="menu-items" 
         ref={ref}
         onMouseEnter={onMouseEnter} 
         onMouseLeave={onMouseLeave}
         onClick={closeDropdown}
      >
         {items.url && items.submenu ? (
            <>
               <Button 
                  type="button" 
                  aria-haspopup="menu" 
                  aria-expanded={dropdown ? "true" : "false"} 
                  onClick={() => setDropdown((prev) => !prev)}
               >
                  {window.innerWidth < 960 && depthLevel === 0 ? (
                     items.title
                  ) : (
                     <Link to={items.url}>{items.title}</Link>
                  )}

                  {depthLevel > 0 && 
                     window.innerWidth < 960 ? null : depthLevel > 0 && 
                     window.innerWidth > 960 ? (
                     <Span>&raquo;</Span>
                  ) : (
                     <Span className="arrow" />
                  )}
               </Button>
               <Dropdown 
                  submenus={items.submenu} 
                  dropdown={dropdown} 
               />
            </>
         ) : !items.url && items.submenu ? (
            <>
               <Button 
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown((prev) => !prev)}
               >
                  {items.title}{" "}
                  {depthLevel > 0 ? (
                     <Span>&raquo;</Span>
                  ) : (
                     <Span className="arrow"></Span>
                  )}
               </Button>
               <Dropdown
                  depthLevel={depthLevel}
                  submenus={items.submenu}
                  dropdown={dropdown}
               />
            </>
         ) : (
            <Link to={items.url} className="link-title">{items.title}</Link>
         )}
      </List>
   );
};

const List  = styled.ul``
const Button = styled.button``
const Span = styled.span``

export default MenuItems;