// const btnRegister = document.getElementById("btnRegister");
const form = document.querySelector("form");
console.log(form);

const register = async (e) => {
  e.preventDefault();
  const dataForm = new FormData(form);
  const payload = Object.fromEntries(dataForm);

  console.log(payload);

  try {
    const { data } = await axios.post(`/register`, payload);
    // console.log(`user registered:`, data);
    alert(`Welcome ${data.name}, successfully registered`);
    window.location.href = "/login";
  } catch ({ response }) {
    const { data } = response;

    console.log({ Error: `${data.error}`, code: `${data.code}` });

    alert(`${data.error}`);
  }
};

form.addEventListener("submit", register);
