import styled from 'styled-components';
import MenuItems from './MenuItems';

const Dropdown = ({ submenus, dropdown, depthLevel }) => {

  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  
  return (
    <List
      className={`dropdown ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}
    >
      {submenus.map((submenu, index) => (
        <MenuItems
          className={submenu.cname}
          items={submenu}
          key={index}
          depthLevel={depthLevel}
        />
      ))}
    </List>
  );
};

const List = styled.li``

export default Dropdown;