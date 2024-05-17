const calculateEmolument = require('../../utils/calculateEmolumentStrategy');

describe('calculateEmolument', () => {
  it('should calculate 5% for debt amount less than or equal to 1000', () => {
    const debtAmount = 1000;
    const expectedEmolument = debtAmount * 0.05;

    const result = calculateEmolument(debtAmount);

    expect(result).toEqual(expectedEmolument);
  });

  it('should calculate 7.5% for debt amount more than 1000 and less than or equal to 5000', () => {
    const debtAmount = 3000;
    const expectedEmolument = debtAmount * 0.075;

    const result = calculateEmolument(debtAmount);

    expect(result).toEqual(expectedEmolument);
  });

  it('should calculate 10% for debt amount more than 5000', () => {
    const debtAmount = 6000;
    const expectedEmolument = debtAmount * 0.10;

    const result = calculateEmolument(debtAmount);

    expect(result).toEqual(expectedEmolument);
  });
});