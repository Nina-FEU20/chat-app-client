export const getChatName = (authUser, chat) => {
  const { chatName, users } = chat;
  if (chatName !== '') return chatName;
  if (users[0]._id === authUser.id) {
    return users[1].username;
  } else return users[0].username;
};

// const getAllUsers = async (e) => {
//   e.preventDefault();

//   try {
//     const { data } = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getSingleUser = async (e) => {
//   e.preventDefault();

//   try {
//     const { data } = await axios.get('http://localhost:5000/api/user/61ee06142ce9392a507e467b', { withCredentials: true });
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

/* <button onClick={(e) => getAllUsers(e)}>Get all users</button>
      <button onClick={(e) => getSingleUser(e)}>Get single user</button> */
