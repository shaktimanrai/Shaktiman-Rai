const token = localStorage.getItem("direct");

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default auth;
