let { listFiltering } = require('./utils');

describe('listFiltering', () => {
  it('should return an array with 2 elements', () => {
    const inputArray = [1,2,'a','b'];
    expect(listFiltering(inputArray)).toHaveLength(2);
    expect(listFiltering(inputArray)).toEqual([1,2]);
  });

  it('should return an array with 3 elements', () => {
    const inputArray = [1,'a','b',0,15];
    expect(listFiltering(inputArray)).toHaveLength(3);
    expect(listFiltering(inputArray)).toEqual([1,0,15]);
  });
});
