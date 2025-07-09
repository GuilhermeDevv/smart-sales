import {
  offerProps,
  tipoProps,
  localVendaProps,
  tabulacaoProps,
  sendVendasProps,
} from "@/app/smart-sales/services";
import { useOffersModel } from "./use-offers-model";
import { OffersView } from "./offers-view";

export type offersViewModelProps = {
  offers: offerProps[];
  onClick: (offer: {
    reason: string;
    id: string;
    idSecundary: string | number;
    idConcorrente: string | number;
  }) => void;
  isRegistrationComplete: boolean;
  tipos: tipoProps[];
  localVenda: localVendaProps[];
  tabulacao: tabulacaoProps[];
  send_vendas:(data:sendVendasProps) => Promise<void>;
};

export function OffersViewModel(props: offersViewModelProps) {
  const data = useOffersModel({ ...props });
  return <OffersView {...data} />;
}
