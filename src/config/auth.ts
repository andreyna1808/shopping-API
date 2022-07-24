export const authConfig = {
  jwt: `${process.env.APP_SECRET}`, // -- md5 online generator
  dateExpires: '1d', // expira depois de um dia
};
