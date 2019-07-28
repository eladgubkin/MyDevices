import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NoDataComponent = props => {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      <h3>\(o_o)/</h3>
      <p className="text-flow">No rows found!</p>
    </div>
  );
};

const mapStateToProps = state => ({
  currentTheme: state.settings.currentTheme
});

NoDataComponent.propTypes = {
  currentTheme: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(NoDataComponent);
