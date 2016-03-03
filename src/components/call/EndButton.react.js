/*
* Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
*/

import React, {Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';

class EndButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <button className="button button--rised button--pink button--wide" onClick={this.props.onClick}>
        <i className="material-icons" key="icon">call_end</i>
        <FormattedMessage id="call.end" key="message"/>
      </button>
    );
  }
}

export default EndButton;
