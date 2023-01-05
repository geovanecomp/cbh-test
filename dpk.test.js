const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the expected encripted candidate", () => {
    randonName = 'pizza'
    encriptedValue = 'd76d5aac14363d0da9a22e8d9907c30ddd0e2254ff8c9a67586a4bc360c7faea9b849f9f80ff55ae3ed38f1d4a528d6f32734a96e869647815fce51da20ee29c'
    const texdtInput = deterministicPartitionKey(randonName);
    expect(texdtInput).toBe(encriptedValue);
  });

  it("Returns a different encripted value for small name difference", () => {
    randonName = 'pizzaa'
    encriptedValue = 'd76d5aac14363d0da9a22e8d9907c30ddd0e2254ff8c9a67586a4bc360c7faea9b849f9f80ff55ae3ed38f1d4a528d6f32734a96e869647815fce51da20ee29c'
    const texdtInput = deterministicPartitionKey(randonName);
    expect(texdtInput).not.toEqual(encriptedValue);
  });

  it("Encrypts correctly string as a number", () => {
    randonNumber = "1"
    encriptedValue = 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa'
    const texdtInput = deterministicPartitionKey(randonNumber);
    expect(texdtInput).toBe(encriptedValue);
  });

  it("Encrypts correctly numbers", () => {
    randonNumber = 1
    encriptedValue = 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa'
    const texdtInput = deterministicPartitionKey(randonNumber);
    expect(texdtInput).toBe(encriptedValue);
  });

  it("Encrypts correctly objects", () => {
    randonNumber = {}
    encriptedValue = '3bc9a4398c62cd22974725a0e8cc0729f747deeffe28ac9684c66b70118e62dfc894288e0707e190654aa1832b4e2fd82a9c582c9ced5b86f441d2ec5982f9fa'
    const texdtInput = deterministicPartitionKey(randonNumber);
    expect(texdtInput).toBe(encriptedValue);
  });

  // For Null cases, the event will not be trigged, so it should return  "0"
  it("Encrypts correctly Null", () => {
    randonNumber = null
    encriptedValue = '0'
    const texdtInput = deterministicPartitionKey(randonNumber);
    expect(texdtInput).toBe(encriptedValue);
  });

});
