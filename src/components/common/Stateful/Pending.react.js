/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';

class Pending extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

export default Pending;
