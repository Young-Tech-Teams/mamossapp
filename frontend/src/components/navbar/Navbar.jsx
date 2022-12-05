import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthService from "../../utils/auth.service";
import { menuItems } from "./_menuItems";
import MenuItems from './MenuItems';
import { LogOut } from "react-feather";
import Logo from "../../assets/mamossa-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const anchorRef = useRef(null);
  const token = JSON.parse(localStorage.getItem("token"));
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = (event) => {
    AuthService.logout()
        .then(function (response) {
            localStorage.removeItem("token")
            navigate('/')
            setIsLoggedIn(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
}

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [location, token]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
         setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const disableRightClick = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <NavBar id="navbar-main" className={scrolled ? "scrolled" : ""}>
        <Container id="navbar">
          <HeroWrapper id="navbelt" className="wrapper d-flex">
            <Brand className="brand">
               <Link id="logo" to="/">
                 <img src={Logo} alt="logo" onContextMenu={disableRightClick} onDragStart={(e) => e.preventDefault()} />
              </Link>
            </Brand>

              <Div className="cta" onDragStart={(e) => e.preventDefault()}>
                  {!isLoggedIn && (
                     <>
                     <MyList className="hide menus">
                        {menuItems.map((menu, index) => {
                           const depthLevel = 0;
                           return (
                           <MenuItems
                              items={menu}
                              key={index}
                              className={menu.cname}
                              depthLevel={depthLevel}
                           />
                           );
                        })}
                     </MyList>
                     <Button className="btn btn-auth">
                        <Link to="/connexion" className="signin">Connexion</Link>
                     </Button>
                     <Button className="btn btn-auth">
                        <Link to="/inscription" className="signup">Inscription</Link>
                     </Button>
                     </>
                  )}
                  {isLoggedIn && (
                     <>
                     <Button className="btn btn-logout">
                        <Link to="/" className="icon logout" onClick={handleLogout} ><LogOut />Déconnexion</Link>
                     </Button>
                     </>
                  )}
               </Div>
            </HeroWrapper>
         </Container>
         </NavBar>
      </>
   )
}

const NavBar = styled.nav``
const Container = styled.div``
const HeroWrapper = styled.div``
const Div = styled.div``
const MyList = styled.ul``
const Brand = styled.h1``
const Button = styled.small``

export default Navbar