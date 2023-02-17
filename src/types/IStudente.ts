type IStudenteLoginReq = {
  matricola: string;
  password: string;
};

type ISTudenteLoginRes = {
  idp_token: string;
};

export { type IStudenteLoginReq, type ISTudenteLoginRes };
