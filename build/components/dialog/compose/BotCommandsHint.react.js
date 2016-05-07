'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventListener = require('fbjs/lib/EventListener');

var _EventListener2 = _interopRequireDefault(_EventListener);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DROPDOWN_ITEM_HEIGHT = 33;
var scrollIndex = 0;

var BotCommandsHint = function (_Component) {
  _inherits(BotCommandsHint, _Component);

  function BotCommandsHint(props) {
    _classCallCheck(this, BotCommandsHint);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      selectedIndex: 0
    };

    _this.scrollTo = _this.scrollTo.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    _this.onDocumentKeyDown = _this.onDocumentKeyDown.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  BotCommandsHint.prototype.componentDidMount = function componentDidMount() {
    this.listeners = [_EventListener2.default.listen(document, 'click', this.onDocumentClick), _EventListener2.default.listen(document, 'keydown', this.onDocumentKeyDown)];
  };

  BotCommandsHint.prototype.componentWillUnmount = function componentWillUnmount() {
    this.listeners.forEach(function (listener) {
      return listener.remove();
    });
    this.listeners = null;
  };

  BotCommandsHint.prototype.onDocumentClick = function onDocumentClick() {
    this.props.onClose();
  };

  BotCommandsHint.prototype.onDocumentKeyDown = function onDocumentKeyDown(event) {
    this.onKeyDown(event);
  };

  BotCommandsHint.prototype.scrollTo = function scrollTo(top) {
    var menuListNode = (0, _reactDom.findDOMNode)(this.refs.mentionList);
    menuListNode.scrollTop = top;
  };

  BotCommandsHint.prototype.onKeyDown = function onKeyDown(event) {
    var commands = this.props.commands;
    var selectedIndex = this.state.selectedIndex;

    var visibleItems = 6;
    var index = selectedIndex;

    if (index !== null) {
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ENTER:
          event.stopPropagation();
          event.preventDefault();
          this.props.onSelect(commands[selectedIndex].command);
          break;

        case _ActorAppConstants.KeyCodes.ARROW_UP:
          event.stopPropagation();
          event.preventDefault();

          if (index > 0) {
            index -= 1;
          } else if (index === 0) {
            index = commands.length - 1;
          }

          if (scrollIndex > index) {
            scrollIndex = index;
          } else if (index === commands.length - 1) {
            scrollIndex = commands.length - visibleItems;
          }

          this.scrollTo(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          this.setState({ selectedIndex: index });
          break;
        case _ActorAppConstants.KeyCodes.ARROW_DOWN:
        case _ActorAppConstants.KeyCodes.TAB:
          event.stopPropagation();
          event.preventDefault();

          if (index < commands.length - 1) {
            index += 1;
          } else if (index === commands.length - 1) {
            index = 0;
          }

          if (index + 1 > scrollIndex + visibleItems) {
            scrollIndex = index + 1 - visibleItems;
          } else if (index === 0) {
            scrollIndex = 0;
          }

          this.scrollTo(scrollIndex * DROPDOWN_ITEM_HEIGHT);
          this.setState({ selectedIndex: index });
          break;
        default:
      }
    }

    if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
      this.props.onClose();
    }
  };

  BotCommandsHint.prototype.renderCommands = function renderCommands() {
    var _this2 = this;

    var selectedIndex = this.state.selectedIndex;


    return this.props.commands.map(function (_ref, index) {
      var command = _ref.command;
      var description = _ref.description;

      var className = (0, _classnames2.default)('mention__list__item', {
        'mention__list__item--active': selectedIndex === index
      });

      return _react2.default.createElement(
        'li',
        {
          key: command,
          className: className,
          onClick: function onClick() {
            return _this2.props.onSelect(command);
          },
          onMouseOver: function onMouseOver() {
            return _this2.setState({ selectedIndex: index });
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          _react2.default.createElement(
            'span',
            { className: 'nickname' },
            '/' + command
          ),
          _react2.default.createElement(
            'span',
            { className: 'name' },
            description
          )
        )
      );
    });
  };

  BotCommandsHint.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'mention mention--opened' },
      _react2.default.createElement(
        'div',
        { className: 'mention__wrapper' },
        _react2.default.createElement(
          'header',
          { className: 'mention__header' },
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            _react2.default.createElement(
              'strong',
              null,
              'tab'
            ),
            '  or  ',
            _react2.default.createElement(
              'strong',
              null,
              '↑'
            ),
            _react2.default.createElement(
              'strong',
              null,
              '↓'
            ),
            '  to navigate'
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            _react2.default.createElement(
              'strong',
              null,
              '↵'
            ),
            '  to select'
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'strong',
              null,
              'esc'
            ),
            '  to close'
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'mention__list', ref: 'mentionList' },
          this.renderCommands()
        )
      )
    );
  };

  return BotCommandsHint;
}(_react.Component);

BotCommandsHint.propTypes = {
  commands: _react.PropTypes.array.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired
};
exports.default = BotCommandsHint;
//# sourceMappingURL=BotCommandsHint.react.js.map