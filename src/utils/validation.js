export function validateInput(rate) {
  return rate.length !== 0;
}

export function validateResultSubmit({ filters, totalRate, comment }) {
  let result = true;

  Object.values(filters).forEach((filter) => {
    if (!validateInput(filter)) {
      result = false;
    }
  });

  return validateInput(totalRate) && validateInput(comment) && result;
}
