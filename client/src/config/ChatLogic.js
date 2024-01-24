export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// returns true if the next message is from a different user. 
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id !== m?.sender?._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.sender?._id !== userId
  );
};

// returns true if the current message is the last message sent by the user with whom we are chatting.
export const isLastMessage = (messages, idx, userId) => {
  return (
    idx === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId && messages[messages.length - 1]?.sender?._id
  );
};


export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return true;
  if (
    (i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m?.sender?._id &&
      messages[i]?.sender?._id !== userId) ||
    (i === messages.length - 1 && messages[i]?.sender?._id !== userId)
  )
    return false;

  return true;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};