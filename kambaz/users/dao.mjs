import { randomUUID } from "node:crypto";

export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: randomUUID() };
    db.users = [...db.users, newUser];
    return newUser;
  };

  const findAllUsers = () => db.users;

  const findUserById = (userId) => db.users.find((user) => user._id === userId);

  const findUserByUsername = (username) =>
    db.users.find((user) => user.username === username);

  const findUserByCredentials = (username, password) =>
    db.users.find(
      (user) => user.username === username && user.password === password
    );

  const updateUser = (userId, userUpdates) => {
    db.users = db.users.map((user) =>
      user._id === userId ? { ...user, ...userUpdates, _id: userId } : user
    );
    return findUserById(userId);
  };

  const deleteUser = (userId) => {
    db.users = db.users.filter((user) => user._id !== userId);
    return { acknowledged: true };
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
