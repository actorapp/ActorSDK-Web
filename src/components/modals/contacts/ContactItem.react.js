/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react/addons';
import classnames from 'classnames';

import { escapeWithEmoji } from '../../../utils/EmojiUtils';

import AvatarItem from '../../../components/common/AvatarItem.react';

const {addons: { PureRenderMixin }} = addons;

class ContactItem extends Component {
  static propTypes = {
    contact: React.PropTypes.object,
    onSelect: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { contact, onSelect } = this.props;
    onSelect(contact);
  };

  render() {
    const { contact } = this.props;

    return (
      <li className="contacts__list__item row" onClick={this.handleClick}>
        <AvatarItem image={contact.avatar}
                    placeholder={contact.placeholder}
                    size="medium"
                    title={contact.name}/>

        <div className="col-xs">
          <span className="title" dangerouslySetInnerHTML={{__html: escapeWithEmoji(contact.name)}}/>
        </div>
      </li>
    );
  }
}

ReactMixin.onClass(ContactItem, PureRenderMixin);

export default ContactItem;
