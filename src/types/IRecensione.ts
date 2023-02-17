import { IValutazioneAttr } from './IValutazione';

type IRecensione = {
  _id: string;
  nominativo: string;
  anonima: boolean;
  segnalazioni: number;
  recensioneCorso: IRecensioneCorso;
  recensioniDocenti: Array<IRecensioneDocente>;
};

type IRecensioneCorso = {
  id_corso: string;
  contenuto: string;
  valutazioni: Array<IValutazioneAttr>;
};

type IRecensioneDocente = {
  id_docente: string;
  contenuto: string;
  valutazioni: Array<IValutazioneAttr>;
};

type IRecensionePost = {
  anonima: boolean;
  recensioneCorso: IRecensioneCorso;
  recensioneDocente: IRecensioneDocente;
};

type IRecensionePut = {
  _id: string;
  anonima: boolean;
  recensioneCorso: IRecensioneCorso;
  recensioneDocente: IRecensioneDocente;
};

export default IRecensione;
export {
  type IRecensioneCorso,
  type IRecensioneDocente,
  type IRecensionePost,
  type IRecensionePut,
};
