type IModeratore = {
  _id: string;
  nome_utente: string;
};

type IModeratoreAttr = {
  id: string;
  nome_utente: string;
};

type IModeratorePut = {
  nome_utente: string;
  client_salt: string;
  client_hash: string;
};

type IModeratoreLoginReq = {
  nome_utente: string;
  client_hash: string;
};

type IModeratoreLoginRes = {
  auth: string;
  isAdmin: boolean;
};

type IModeratoreSaltReq = {
  nome_utente: string;
};
type IModeratoreSaltRes = {
  client_salt: string;
};

export default IModeratore;
export {
  type IModeratoreAttr,
  type IModeratorePut,
  type IModeratoreLoginReq,
  type IModeratoreLoginRes,
  type IModeratoreSaltReq,
  type IModeratoreSaltRes,
};
