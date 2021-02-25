const logo = document.querySelector(".logo");
const loginForm = document.querySelector(".login-form");
const signOut = document.querySelector(".signOut");

const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    // const token = result.data.token;
    const { user } = result.data.data;
    if (user) {
      setTimeout(() => {
        window.location.assign("/home");
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
  }
};

logo.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(`email: ${email}, password: ${password}`);
    login(email, password);
  });
}

if (signOut) {
  signOut.addEventListener("click", async (e) => {
    await axios.get("http://localhost:3000/api/v1/users/logout");
    window.location.assign("/");
  });
}
