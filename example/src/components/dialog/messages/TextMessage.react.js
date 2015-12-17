/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';

/**
 * Class that represents a component for display text message content
 */
export default class Text extends Component {
  static propTypes = {
    text: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { text, className } = this.props;

    return (
      <div className={className}>
        <div className="text" style={{color: 'red'}}>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}
