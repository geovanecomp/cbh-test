const crypto = require("crypto");

function _createHashSha(value) {
    return crypto.createHash("sha3-512").update(value.toString()).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event){
    candidate = event.partitionKey ? JSON.stringify(event.partitionKey) : _createHashSha(event);

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = _createHashSha(candidate);
    }
  }

  return candidate;
};
