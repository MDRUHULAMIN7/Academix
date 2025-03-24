
// for indian 

// export const formatPrice = (price) => {
//     return Intl.NumberFormat("en-in", {
//       style: "currency",
//       currency: "INR",
//     }).format(price);
//   };

// // for us
// export const formatPrice = (price) => {
//     return Intl.NumberFormat("en-us", {
//       style: "currency",
//       currency: "USD",
//     }).format(price);
//   };

// for bd

export const formatPrice = (price) => {
  return Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
};
