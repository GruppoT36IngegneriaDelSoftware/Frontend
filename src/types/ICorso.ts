import { IDipartimentoAttr } from './IDipartimento';
import { IDocenteAttr } from './IDocente';
import { IValutazioneAttr } from './IValutazione';

type ICorso = {
  _id: string;
  nome: string;
  descrizione: string;
  corsoStudi: string;
  sitoWeb: string;
  dipartimento: Array<IDipartimentoAttr>;
  docenti: Array<IDocenteAttr>;
  avgValutazioni: Array<IValutazioneAttr>;
};

export default ICorso;
