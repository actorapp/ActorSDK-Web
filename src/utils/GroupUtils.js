/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import { forEach } from 'lodash';
import ActorClient from './ActorClient';

export default hasMember = (gid, uid) => {
  const group = ActorClient.getGroup(gid);
  let isMember = false;

  forEach(group.members, member => {
    if (member.peerInfo.peer.id === uid) isMember = true;
  });

  return isMember;
};
