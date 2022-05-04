/* ----- format a number to clp ----- */

function formatNumber(number) {
  return new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(number);
}

/* ----- format a date to dayweek, daynumber, month, year, hour  ----- */
function formatDate(date) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(date);
}

/* ----- format a date to dayweek, daynumber, month, year, hour  ----- */

function fomatDateForTransactions(date) {
  return date.toLocaleString("en-ZA", { timeZone: "America/New_York" });
}

/* ----- modify the account information  ----- */

function modificarDatos() {
  window.location.href = "/dashboard/datos-personales/edit";
}

/* ----- delete cookie and redirects to login page ----- */
function deleteCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/login";
}

/* ----- update ammount on the account ----- */
async function updateAmount() {
  window.location.reload();
}

function portionOfData(page, historial) {
  let n = 10;
  const historialData = [];
  if (page == 1) {
    historialData.push(historial.slice(0, n));
    console.log(`Page: `, page);
  } else if (page == 2) {
    historialData.push(historial.slice(n, n * page));
    console.log(`Page: `, page);
  } else if (page == 3) {
    historialData.push(historial.slice(n * 2, n * page));
    console.log(`Page: `, page);
  } else if (page == 4) {
    historialData.push(historial.slice(n * 3, n * page));
    console.log(`Page: `, page);
  } else if (page == 5) {
    historialData.push(historial.slice(n * 4, n * page));
    console.log(`Page: `, page);
  } else if (page == 6) {
    historialData.push(historial.slice(n * 5, n * page));
    console.log(`Page: `, page);
  } else if (page == 7) {
    historialData.push(historial.slice(n * 6, n * page));
    console.log(`Page: `, page);
  } else if (page == 8) {
    historialData.push(historial.slice(n * 7, n * page));
    console.log(`Page: `, page);
  }
  return historialData;
}

module.exports = {
  formatNumber,
  formatDate,
  fomatDateForTransactions,
  portionOfData,
};
