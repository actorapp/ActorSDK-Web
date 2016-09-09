export default {
  'locale': 'zh',
  'messages': {
    // Login
    'login': {
      'signIn': '登录',
      'wrong': '错误？',
      'phone': '手机号码',
      'email': '邮箱地址',
      'phone_or_email': '手机号码或者邮箱地址',
      'authCode': '验证码',
      'yourName': '你的姓名',
      'errors': {
        'numberInvalid': '无效的手机号码',
        'nameInvalid': '无效的姓名',
        'codeInvalid': '错误的验证码',
        'codeExpired': '验证码过期',
        'codeWait': '请稍后再请求验证码'
      },
      'welcome': {
        'header': '欢迎来到<strong>{appName}</strong>',
        'text': '<p>{appName}将您的所有网络业务连接至一处。</p>' +
                '<p>我们的目标是使您的工作更便捷，让您可以更容易与人联系。</p>',
        'copyright': '{appName} Messenger © 2016'
      }
    },

    // Menus
    'menu': {
      // Sidebar menu
      editProfile: '个人信息',
      addToContacts: '添加联系人',
      createGroup: '创建群',
      blockedUsers: '黑名单',
      helpAndFeedback: '帮助与反馈',
      twitter: '我们的推特',
      preferences: '设置',
      signOut: '登出',
      homePage: '主页',
      facebook: '我们的脸书'
    },

    // Buttons
    'button': {
      'ok': '确定',
      'cancel': '取消',
      'done': '完成',
      'requestCode': '申请验证码',
      'checkCode': '检查验证码',
      'signUp': '注册',
      'add': '添加',
      'send': '发送',
      'sendAll': '发送所有',
      'createGroup': '创建群组',
      'addMembers': '添加用户',
      'quickSearch': '快速搜索',
      'close': '关系',
      'save': '保持',
      'call': '拨打语音',
      'archive': '归档',
      'invite': '+ 邀请'
    },
    // Messages
    'message': {
      'pin': '大头针',
      'reply': '回复',
      'forward': '转发',
      'download': '下载',
      'delete': '删除',
      'quote': '引用',
      'uploading': '上传中...',
      'welcome': {
        'private': '<p>这是一个和 <strong>{name}</strong> 非常私密的会话。</p><p>所有的消息只有你们俩能看到。</p>',
        'group': {
          'main': '<p>这是一个群组 <strong>{name}</strong> 的开始，由 {creator} 创建。</p>',
          'you': '你',
          'actions': {
            'start': '你能 ',
            'end': ' 到这个群组来。',
            'invite': '邀请更多的用户'
          }
        }
      },
      'loading': '从服务器中载入历史记录',
      'unread': '新消息'
    },

    // Connection state
    'connectionState': {
      'connecting': '靠北哦，我有问题了！到 {appName} 服务器连接已丢失。 正在尝试重新连接...',
      'online': '欢迎您的归来',
      'updating': '更新连接'
    },

    // Compose
    'compose': {
      'attach': '附件',
      'sendFile': '发送文件',
      'sendPhoto': '发送照片',
      'send': '发送',
      'edit': '保持',
      'cancel': '取消',
      'editTitle': '编辑消息：',
      'markdown': {
        'bold': '黑体',
        'italic': '斜体',
        'preformatted': '预定义格式'
      },
      'dropzone': '拖拽到这里发送',
      'notMember': '你不是这个群组的成员',
      'start': '开始',
      'unblock': '黑名单'
    },

    // Modals
    'modal': {
      'profile': {
        'title': '个人信息',
        'name': '姓名',
        'nick': '昵称',
        'phone': '手机号码',
        'email': '邮箱',
        'about': '关于我',
        'avatarChange': '更换头像',
        'avatarRemove': '移除',
        errors: {
          nick: {
            length: '昵称必须大于5个字符，小于32个字符',
            chars: '请使用拉丁字符、数字和下划线'
          }
        }
      },
      'group': {
        'title': '编辑群组',
        'name': '群组名',
        'about': '群组简介',
        'avatarChange': '更改群组图标',
        'avatarRemove': '移除'
      },
      'crop': {
        'title': '裁剪图片'
      },
      'contacts': {
        'title': '人',
        'search': '搜索联系人',
        'notFound': '抱歉，没有找到此人 :(',
        'loading': '载入中'
      },
      'groups': {
        'title': '群组',
        'search': '搜索',
        'loading': '载入中',
        'notFound': '没有找到 <strong>{query}</strong>.'
      },
      'attachments': {
        'title': '发送文件',
        'name': '文件名',
        'type': '类型',
        'size': '大小',
        'extra': '额外信息',
        'sendAsPicture': '作为图片发送'
      },
      'addContact': {
        'title': '添加联系人',
        'query': '邮箱，姓名或者手机号码',
        'phone': '手机号码',
        'notFound': '没找到此用户',
        'empty': '输入文字开始查找',
        'searching': '搜索 "{query}"'
      },
      'createGroup': {
        'title': '创建群',
        'groupName': '群名称'
      },
      'quickSearch': {
        'title': '全局搜索',
        'placeholder': '开始输入',
        'toNavigate': '导航',
        'toSelect': '选择',
        'toClose': '关闭',
        'openDialog': '打开聊天',
        'startDialog': '开始一个新聊天',
        'notFound': '没有找到与 <strong>{query}</strong> 相关的内容。<br/>请检查拼写是否正确'
      },
      'confirm': {
        'logout': '确定离开吗？',
        'user': {
          'clear': '确定清除与 <strong>{name}</strong> 的所有聊天吗？',
          'delete': '确定删除与  <strong>{name}</strong> 的聊天吗？',
          'block': '确定把 <strong>{name}</strong> 拉入黑名单吗？',
          'removeContact': '确定把 <strong>{name}</strong> 从你的联系人列表中删除吗？'
        },
        'group': {
          'clear': '确定清除群组 <strong>{name}</strong> 的聊天记录吗？',
          'delete': '确定删除群组 <strong>{name}</strong> 的聊天记录吗？',
          'leave': '确定离开群组 <strong>{name}</strong> 吗？',
          'kick': '确定把用户从群组 <strong>{name}</strong> 中移除吗？'
        },
        'nonContactHide': {
          'title': '确定隐藏此聊天吗？',
          'body': '用户 {name} 不在您的联系人列表中'
        },
        delete: '删除这个群组？',
        kick: '踢出这个用户？'
      }
    },

    // Profiles
    'profile': {
      'email': '邮箱',
      'phone': '手机',
      'nickname': '昵称',
      'about': '关于我'
    },
    'createdBy': '创建者',
    'addPeople': '添加成员',
    'more': '更多',
    'actions': '操作',
    'addToContacts': '添加到联系人',
    'removeFromContacts': '从联系人中删除',
    'setGroupPhoto': '设置群头像',
    'addIntegration': '添加一个服务集成',
    'editGroup': '编辑群',
    'clearGroup': '清除群',
    'deleteGroup': '删除群',
    'clearConversation': '清除会话',
    'deleteConversation': '删除会话',
    'blockUser': '封锁用户',
    'unblockUser': '解除封锁',
    'leaveGroup': '离开群',
    'sharedMedia': '已分享的媒体',
    'notifications': '通知',
    'integrationTokenCopied': '集成链接已复制',
    'members': '{numMembers, plural,' +
      '=0 {没有成员}' +
      '=1 {# 成员}' +
      'other {# 成员}' +
    '}',
    'kick': '踢出',
    'integrationToken': '集成Token',
    'integrationTokenHint': '如果你有编程经验,或者知道的人——这种集成标记允许最大的灵活性和与自己的系统交流。',
    'integrationTokenHelp': '学习如何使用',

    // Sidebar
    'sidebar': {
      'recents': {
        'empty': {
          'first': '你当前没有任何进行中的聊天。',
          'second': {
            'start': '你能 ',
            'or': ' 或者 ',
            'end': '。'
          }
        },
        'newDialog': '新聊天',
        'addPeople': '添加用户',
        'favourites': '最爱',
        'groups': '群组',
        'privates': '私密消息',
        'history': '历史'
      },
      'group': {
        'empty': '创建您的第一个群组聊天'
      },
      'private': {
        'empty': '无人在线'
      }
    },

    'main': {
      'empty': '尝试比昨天更好',
      'install': '<h1>The Web version of <b>{appName}</b> only works in desktop browsers at this time</h1>' +
                 '<h3>Try our apps for using <b>{appName}</b> on your phone!</h3>' +
                 '<p><a href="//actor.im/ios">iPhone</a> | <a href="//actor.im/android">Android</a></p>',
      'deactivated': {
        'header': '停止使用',
        'text': '抱歉，发现另一个选项卡正在运行{appName}！我们必须防止同时使用打开2个web终端。'
      }
    },

    preferences: {
      title: '参数选择',
      general: {
        title: '一般',
        send: {
          title: '发送消息',
          sendMessage: '发送消息',
          newLine: '换行'
        }
      },
      interface: {
        title: '界面',
        animation: {
          title: '自动播放动画'
        }
      },
      notifications: {
        title: '通知和音效',
        effects: {
          title: '音效',
          enable: '启用声音提醒'
        },
        notification: {
          title: '通知',
          enable: '启用群组通知',
          onlyMentionEnable: '启用提到我通知',
          onlyMentionHint: '仅当聊天中有其他用户@我的时候才发送通知'
        },
        privacy: {
          title: '隐私',
          messagePreview: '消息预览',
          messagePreviewHint: '禁止在通知中预览消息内容'
        }
      },
      security: {
        title: '安全',
        sessions: {
          title: '作用中的连接',
          current: '当前连接',
          authTime: '授权时间',
          terminate: '断开',
          terminateAll: '断开所有连接'
        }
      },
      blocked: {
        title: '黑名单',
        notExists: '你没有黑名单用户',
        notFound: '抱歉，没有找到此用户',
        search: '搜索联系人或者用户名',
        unblock: '从黑名单中解锁'
      },
      about: {
        title: '关于'
      }
    },

    invite: {
      title: '添加更多用户',
      search: '搜索联系人或者用户名',
      notFound: '抱歉，没有找到此用户',
      inviteByLink: '使用链接邀请至群组',
      byLink: {
        title: '邀请链接',
        description: '所有人将可以通过此链接而加入群组 ”<b>{groupName}</b>” ：',
        copy: '复制链接',
        revoke: '移除链接'
      }
    },

    call: {
      outgoing: '拨出语音',
      incoming: '拨入语音',
      mute: '禁言',
      unmute: '取消禁言',
      answer: '应答',
      decline: '拒绝',
      end: '结束通话',
      addUser: '添加用户',
      fullScreen: '全屏',
      video: '视频',
      state: {
        calling: '通话中',
        connecting: '连接中',
        in_progress: '正在通话：{time}',
        ended: '已结束'
      }
    },

    tooltip: {
      toolbar: {
        info: '关于此会话的描述',
        favorite: '最爱切换'
      },
      recent: {
        groupsList: '群组聊天列表',
        privatesList: '私密聊天列表',
        groupsCreate: '创建群组',
        privatesCreate: '添加联系人'
      },
      quicksearch: '最快的途径找到信息'
    },

    context: {
      favorite: {
        add: '最爱',
        remove: '取消'
      },
      archive: '发送至归档',
      delete: '删除'
    },

    search: {
      'placeholder': '搜索',
      'emptyQuery': '输入文字开始搜索',
      'searching': '搜索 "{query}"',
      'notFound': '没有找到跟 "{query}" 相关的内容<br/>可能你需要更换搜索关键字',
      hint: '<h4>快速搜索</h4><p>你可以在当前会话中搜素联系人，聊天记录。</p>',
      inDialog: '在当前会话中搜索'
    }
  }
};
