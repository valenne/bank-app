const form = document.querySelector("form");

const editarDatos = async (e) => {
  const dataForm = new FormData(form);
  const payload = Object.fromEntries(dataForm);

  try {
    const { data } = await axios.put(
      "/dashboard/datos-personales/edit",
      payload
    );

    alert(`User ${data.name} modified`);
    window.location.href = "/dashboard/datos-personales";
  } catch ({ response }) {
    const { data } = response;

    console.log({ Error: `${data.error}`, code: `${data.code}` });

    alert(`${data.error}`);
  }
};

form.addEventListener("submit", editarDatos);
