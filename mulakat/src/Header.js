
import "bootstrap/dist/css/bootstrap.css";

import { useLocation} from "react-router-dom";


import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  
} from "reactstrap";

function Header(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && (
        <Navbar {...args}>
          <NavbarBrand href="/"> Banka</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">Log Out</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/bankaekle">Banka Ekle</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/hesaplama">Hesaplama</NavLink>
              </NavItem>
            </Nav>
           
          </Collapse>
        </Navbar>
      )}
    </div>
  );
}

export default Header;
