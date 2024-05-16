function calculateEmolument(debtAmount) {
  if (debtAmount <= 1000) {
    return debtAmount * 0.05;
  } else if (debtAmount <= 5000) {
    return debtAmount * 0.075;
  } else {
    return debtAmount * 0.10;
  }
}

module.exports = calculateEmolument;