// LOCAL STORAGE
export const setAuthUser = (data) => {
  //  Save Object to the Local Storage
  // STRINGIFY Object to Text
  localStorage.setItem("user", JSON.stringify(data));
};

export const getAuthUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user && user.length > 0 ? user[0] : null;
};

export const removeAuthUser = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
