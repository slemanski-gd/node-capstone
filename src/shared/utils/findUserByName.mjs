const findUserByName = (users, username) =>
  users.some((u) => u.username === username);

export { findUserByName };
