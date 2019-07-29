import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Sidebar from '../components/sidebar/sidebar.jsx';
// import RightPanel from '../components/rightPanel/RightPanel';
import Footer from '../components/footer/footer.jsx';
import ThemeRoutes from '../routes/routing.jsx';
import Agent from '../utils/agent';
import { changeTheme } from '../state/ducks/settings/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Fulllayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.agent = new Agent();
    this.state = {
      isOpen: false,
      width: window.innerWidth,
      settings: [
        {
          theme: this.props.currentTheme,
          layout: 'vertical',
          dir: 'ltr',
          sidebartype: 'mini-sidebar',
          sidebarpos: 'fixed',
          headerpos: 'fixed',
          boxed: 'full',
          navbarbg: 'skin1',
          sidebarbg: 'skin1',
          logobg: 'skin1'
        }
      ]
    };

    this.props.history.listen((location, action) => {
      if (
        window.innerWidth < 767 &&
        document.getElementById('main-wrapper').className.indexOf('show-sidebar') !==
          -1
      ) {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
      }
    });
  }

  darkTheme = a => {
    if (a.target.checked) {
      let darktheme = JSON.parse(JSON.stringify(this.state.settings));
      darktheme[0].theme = 'dark';
      this.props.changeTheme(darktheme[0].theme);
      this.setState({ settings: darktheme });
    } else {
      let lighttheme = JSON.parse(JSON.stringify(this.state.settings));
      lighttheme[0].theme = 'light';
      this.props.changeTheme(lighttheme[0].theme);
      this.setState({ settings: lighttheme });
    }
  };

  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  componentDidMount() {
    window.addEventListener('load', this.updateDimensions);
    window.addEventListener('resize', this.updateDimensions);
  }
  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  updateDimensions() {
    let element = document.getElementById('main-wrapper');
    this.setState({
      width: window.innerWidth
    });
    switch (this.state.settings[0].sidebartype) {
      case 'full':
      case 'iconbar':
        if (this.state.width < 1170) {
          element.setAttribute('data-sidebartype', 'mini-sidebar');
          element.classList.add('mini-sidebar');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.state.settings[0].sidebartype
          );
          element.classList.remove('mini-sidebar');
        }
        break;

      case 'overlay':
        if (this.state.width < 767) {
          element.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          element.setAttribute(
            'data-sidebartype',
            this.state.settings[0].sidebartype
          );
        }
        break;

      default:
    }
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  componentWillUnmount() {
    window.removeEventListener('load', this.updateDimensions);
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div
        id="main-wrapper"
        dir={this.state.settings[0].dir}
        data-theme={this.state.settings[0].theme}
        data-layout={this.state.settings[0].layout}
        data-sidebartype={this.state.settings[0].sidebartype}
        data-sidebar-position={this.state.settings[0].sidebarpos}
        data-header-position={this.state.settings[0].headerpos}
        data-boxed-layout={this.state.settings[0].boxed}
      >
        <Header data={this.state} darkTheme={this.darkTheme} />
        <Sidebar data={this.state} {...this.props} routes={ThemeRoutes} />

        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Switch>
              {ThemeRoutes.map((prop, key) => {
                if (prop.navlabel) {
                  return null;
                } else if (prop.collapse) {
                  return prop.child.map((prop2, key2) => {
                    if (prop2.collapse) {
                      return prop2.subchild.map((prop3, key3) => {
                        return (
                          <Route
                            path={prop3.path}
                            component={prop3.component}
                            key={key3}
                          />
                        );
                      });
                    }
                    return (
                      <Route
                        path={prop2.path}
                        component={prop2.component}
                        key={key2}
                      />
                    );
                  });
                } else if (prop.redirect) {
                  return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                } else {
                  return (
                    <Route path={prop.path} component={prop.component} key={key} />
                  );
                }
              })}
            </Switch>
          </div>
          <Footer />
        </div>
        {/* <RightPanel /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTheme: state.settings.currentTheme
});

Fulllayout.propTypes = {
  currentTheme: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { changeTheme }
)(Fulllayout);
