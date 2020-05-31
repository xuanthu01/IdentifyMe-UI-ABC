export const login = async user => {
  return new Promise(resolve => {
    setTimeout(() => resolve(user), 800);
  });
};
