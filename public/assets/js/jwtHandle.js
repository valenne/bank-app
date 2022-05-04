module.exports = {
  getJwtToken: () => {
    return localStorage.getItem("jwt");
  },
  setJwtToken: (token) => {
    return localStorage.setItem("jwt", token);
  },
};
