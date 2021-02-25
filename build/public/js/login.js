const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      {
        email,
        password,
      }
    );
  } catch (err) {
    const { message } = err.response.data;
    console.log(message);
  }
};

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  login(email, password);
});
