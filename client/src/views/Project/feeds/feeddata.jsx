import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

class FeedData extends React.Component {
  render() {
    return (
      <div className="d-flex align-items-center content p-2 mt-2">
        <Button
          className={'btn-circle text-white btn btn-' + this.props.buttoncolor}
        >
          <i className={'text-white ' + this.props.iconname} />
        </Button>

        <div className="d-flex justify-content-between w-100">
          <span className="ml-2 text-truncate">{this.props.content}</span>
          <span className="ml-10 text-muted font-12">{this.props.smtext}</span>
        </div>
      </div>
    );
  }
}

FeedData.defaultProps = {
  buttoncolor: 'primary'
};

FeedData.propTypes = {
  buttoncolor: PropTypes.oneOf([
    'primary',
    'success',
    'info',
    'danger',
    'warning',
    'inverse'
  ]),
  smtext: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.string
};

export default FeedData;
