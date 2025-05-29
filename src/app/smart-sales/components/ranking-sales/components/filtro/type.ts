import { userProps } from "@/app/smart-sales/services";

export interface IFiltroProps {
  usuario?: userProps;
  onClose: () => void;
  almope?: string | undefined;
  dataInicialUrl: string | null;
  dataFinalUrl: string | null;
  setCurrentQuery: (query: string) => void;
  isOpenFilter: boolean;
  cliente?: { value: string | number; label: string }[] | undefined;
  campanha?: { value: string | number; label: string }[] | undefined;
  gerente?: { value: string | number; label: string }[] | undefined;
  coordenador?: { value: string | number; label: string }[] | undefined;
  supervisor?: { value: string | number; label: string }[] | undefined;
  diretoriaGeral?: { value: string | number; label: string }[] | undefined;
  diretor?: { value: string | number; label: string }[] | undefined;
  superintendente?: { value: string | number; label: string }[] | undefined;
  gerenteGeral?: { value: string | number; label: string }[] | undefined;
  operador?: { value: string | number; label: string }[] | undefined;
  grupoPrograma?: { value: string | number; label: string }[] | undefined;
  programa?: { value: string | number; label: string }[] | undefined;
  centroDeCusto?: { value: string | number; label: string }[] | undefined;
  site?: { value: string | number; label: string }[] | undefined;
}
