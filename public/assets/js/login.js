const form = document.querySelector(".form");

const login = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const payload = Object.fromEntries(data);

  try {
    const { data } = await axios.post(form.action, payload);
    console.log(`User ${data.name} logged in`);

    alert(`Welcome ${data.name}`);
    window.location.href = `/dashboard/index`;
  } catch ({ response }) {
    const { data } = response;

    console.log({ Error: `${data.error}`, code: `${data.code}` });

    alert(`${data.error}`);
  }
};

form.addEventListener("submit", login);
