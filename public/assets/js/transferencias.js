const form = document.querySelector("form");
console.log(form);

const btnTransfer = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const payload = Object.fromEntries(data);

  try {
    await axios.post(form.action, payload);
    alert(`Transferencia realizada`);
    console.log(`Transferencia realizada`);
    await axios.get("/dashboard/index");
    window.location.href = "/dashboard/index";
  } catch ({ response }) {
    const { data } = response;

    console.log({ Error: `${data.error}`, code: `${data.code}` });

    alert(`${data.error}`);
  }
};

form.addEventListener("submit", btnTransfer);
