// exports.alphaAZ = (a, b) => {
//   if (a.name < b.name) {
//     return -1;
//   }
//   if (a.name > b.name) {
//     return 1;
//   }
//   return 0;
// };

// exports.alphaZA = (a, b) => {
//   if (a.name < b.name) {
//     return 1;
//   }
//   if (a.name > b.name) {
//     return -1;
//   }
//   return 0;
// };
// exports.numeric12 = (a, b) => {
//   return a.price - b.price;
// };

// exports.numeric21 = (a, b) => {
//   return b.price - a.price;
// };

exports.productSort = (s) => {
  switch (s) {
    case "price-Low-High":
      return {
        price: 1,
      };
    case "price-High-Low":
      return {
        price: -1,
      };
    case "A-Z":
      return {
        name: 1,
      };
    case "Z-A":
      return {
        name: -1,
      };
    case "rating-high-low":
      return {
        ratings: -1,
      };
    case "rating-low-high":
      return {
        ratings: 1,
      };
    default:
      return null;
  }
};
