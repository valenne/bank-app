const li = document.querySelectorAll(".pagination > li");
// console.log(li);

for (let i = 0; i < li.length; i++) {
  li[i].addEventListener("click", async (e) => {
    try {
      // e.preventDefault();
      if (!li[i].classList.contains("active")) {
        li[i].classList.add("active");

        for (let j = 0; j < li.length; j++) {
          if (j !== i) {
            li[j].classList.remove("active");
          }
        }

        // await axios.get(`/dashboard/historial?page=${i}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

const prev = document.getElementById("prev");
console.log(prev);

prev.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    // get the parameters from the url
    const urlParams = new URLSearchParams(window.location.search);
    // get the page number
    const page = urlParams.get("page");

    await axios.get(`/dashboard/historial?page=${page - 1}`);
  } catch (err) {
    console.log(err);
  }
});
