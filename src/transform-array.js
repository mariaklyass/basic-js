const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 * [
        "--discard-prev",
        "--discard-next",
        "--double-prev",
        "--double-next",
      ]
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const currElement = arr[i];

    if (currElement === "--discard-next") {
      i++;
    } else if (currElement === "--discard-prev") {
      if (i !== 0 && arr[i - 2] !== "--discard-next") {
        result.pop();
      }
    } else if (currElement === "--double-next") {
      if (i !== arr.length - 1) {
        result.push(arr[i + 1]);
      }
    } else if (currElement === "--double-prev") {
      if (i !== 0 && arr[i - 2] !== "--discard-next") {
        result.push(arr[i - 1]);
      }
    } else {
      result.push(currElement);
    }
  }

  return result;
}

module.exports = {
  transform,
};
