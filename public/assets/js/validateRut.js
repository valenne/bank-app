const validate = (rut) => {
  // format rut
  const lastCharacter = rut.substr(rut.length - 1);
  const rutValid = rut.replace(/[^0-9]/g, "");

  let patternK = /^[kK]+$/;
  let patternNumber = /^[0-9]/;

  if (rut.match(/[0-9]/g).length === 9) {
    return (rut = rutValid);
  } else if (
    (rut.match(/[0-9]/g).length === 8 &&
      lastCharacter.match(patternK) !== null) ||
    (rut.match(/[0-9]/g).length === 7 && lastCharacter.match(patternK) !== null)
  ) {
    return (rut = rutValid + "k");
  } else if (
    (rut.match(/[0-9]/g).length === 8 &&
      lastCharacter.match(patternNumber) !== null) ||
    (rut.match(/[0-9]/g).length === 7 &&
      lastCharacter.match(patternNumber) !== null)
  ) {
    rut = rutValid;

    if (rut.length <= 7) {
      return console.error("Error: Invalid RUT");
    }

    return rut;
  } else {
    console.log("Error: Invalid RUT");
  }
};

module.exports = { validate };
