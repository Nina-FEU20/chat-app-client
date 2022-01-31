
export const getChatName = (authUser, chat) => {
    const { chatName, users } = chat; 
    if (chatName !== '') return chatName;
    if (users[0]._id === authUser.id) {
      return users[1].username;
    } else return users[0].username;
  };