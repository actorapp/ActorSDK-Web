import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react/addons';
import classNames from 'classnames';

import DialogStore from '../../stores/DialogStore';

const {addons: { PureRenderMixin }} = addons;

class TypingSection extends Component {

  constructor(props) {
    super(props);

    this.state =  {
      typing: null,
      show: false
    };
  }

  componentDidMount() {
    DialogStore.addTypingListener(this.onTypingChange);
  }

  componentWillUnmount() {
    DialogStore.removeTypingListener(this.onTypingChange);
  }

  onTypingChange = () => {
    const typing = DialogStore.getSelectedDialogTyping();
    if (typing === null) {
      this.setState({show: false});
    } else {
      this.setState({typing: typing, show: true});
    }
  };

  render() {
    const { show, typing } = this.state;
    const typingClassName = classNames('typing', {
      'typing--hidden': show === false
    });

    return (
      <div className={typingClassName}>
        <div className="typing-indicator"><i></i><i></i><i></i></div>
        <span>{typing}</span>
      </div>
    );
  }
}

ReactMixin.onClass(TypingSection, PureRenderMixin);

export default TypingSection;
