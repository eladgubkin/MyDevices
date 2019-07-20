import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logodarkicon from '../../assets/images/logo-icon.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import profilephoto from '../../assets/images/users/1.jpg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.sidebarHandler = this.sidebarHandler.bind(this);
    this.state = {
      isOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    document.getElementById('search').classList.toggle('show-search');
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showMobilemenu() {
    document.getElementById('main-wrapper').classList.toggle('show-sidebar');
  }

  sidebarHandler = () => {
    let element = document.getElementById('main-wrapper');
    switch (this.props.data.settings[0].sidebartype) {
      case 'full':
      case 'iconbar':
        element.classList.toggle('mini-sidebar');
        if (element.classList.contains('mini-sidebar')) {
          element.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.props.data.settings[0].sidebartype
          );
        }
        break;

      case 'overlay':
      case 'mini-sidebar':
        element.classList.toggle('full');
        if (element.classList.contains('full')) {
          element.setAttribute('data-sidebartype', 'full');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.props.data.settings[0].sidebartype
          );
        }
        break;

      default:
    }
  };

  render() {
    return (
      <header
        className="topbar navbarbg"
        data-navbarbg={this.props.data.settings[0].navbarbg}
      >
        <Navbar
          className={
            'top-navbar ' +
            (this.props.data.settings[0].navbarbg === 'skin6'
              ? 'navbar-light'
              : 'navbar-dark')
          }
          expand="md"
        >
          <div
            className="navbar-header"
            id="logobg"
            data-logobg={this.props.data.settings[0].logobg}
          >
            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <a
              className="nav-toggler d-block d-md-none text-white"
              onClick={this.showMobilemenu}
            >
              <i className="ti-menu ti-close" />
            </a>
            {/*--------------------------------------------------------------------------------*/}
            {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
            {/*--------------------------------------------------------------------------------*/}

            <NavbarBrand tag={Link} to={'/'}>
              <b className="logo-icon">
                <img src={logodarkicon} alt="homepage" className="dark-logo" />
                <img src={logolighticon} alt="homepage" className="light-logo" />
              </b>
              <span className="logo-text">Home Page</span>
            </NavbarBrand>

            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <a
              className="topbartoggler d-block d-md-none text-white"
              onClick={this.toggle}
            >
              <i className="ti-more" />
            </a>
          </div>
          <Collapse
            className="navbarbg"
            isOpen={this.state.isOpen}
            navbar
            data-navbarbg={this.props.data.settings[0].navbarbg}
          >
            <Nav className="float-left" navbar>
              <NavItem>
                <NavLink
                  href="#"
                  className="d-none d-md-block"
                  onClick={this.sidebarHandler}
                >
                  <i className="ti-menu" />
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto float-right" navbar>
              {/*--------------------------------------------------------------------------------*/}
              {/* Start Profile Dropdown                                                         */}
              {/*--------------------------------------------------------------------------------*/}
              <div className="custom-control custom-checkbox my-2 d-flex  align-items-center">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="theme-view"
                  id="theme-view"
                  onClick={this.props.darkTheme}
                  defaultChecked
                />
                <label className="custom-control-label" htmlFor="theme-view">
                  Dark Theme
                </label>
              </div>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pro-pic">
                  <img
                    src={profilephoto}
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  />
                </DropdownToggle>
                <DropdownMenu right className="user-dd">
                  <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
                    <div className="">
                      <img
                        src={profilephoto}
                        alt="user"
                        className="rounded"
                        width="80"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="mb-0">Steave Jobs</h4>
                      <p className="text-muted mb-0">varun@gmail.com</p>
                      <Button color="danger" className="btn-rounded mt-2">
                        View Profile
                      </Button>
                    </div>
                  </div>
                  <DropdownItem>
                    <i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>
                  <DropdownItem className="border-bottom">
                    <i className="ti-settings mr-1 ml-1" /> Settings
                  </DropdownItem>
                  <DropdownItem href="/pages/login">
                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/*--------------------------------------------------------------------------------*/}
              {/* End Profile Dropdown                                                           */}
              {/*--------------------------------------------------------------------------------*/}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default Header;
