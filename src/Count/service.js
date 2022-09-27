export const fetchCount = (params) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(params);
    }, 1000);
  });
};
