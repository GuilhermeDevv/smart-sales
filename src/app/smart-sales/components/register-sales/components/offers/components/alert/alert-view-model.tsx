import {
  localVendaProps,
  sendVendasProps,
  tabulacaoProps,
  tipoProps,
} from "@/app/smart-sales/services";
import { AlertView } from "./alert-view";
import { useAlertViewModel } from "./use-alert-model";

export type AlertViewModelProps = {
  localVenda: localVendaProps[];
  tabulacao: tabulacaoProps[];
  tipos: tipoProps[];
  cContrato: string;
  sendOfferSales: () => void;
  send_vendas: (data: sendVendasProps) => Promise<void>;
};

export function AlertViewModel(props: AlertViewModelProps) {
  const data = useAlertViewModel(props);

  return <AlertView {...data} />;
}
