import { offerProps } from "@/app/smart-sales/services";
import { useOffersModel } from "./use-offers-model";
import { OffersView } from "./offers-view";

export type offersViewModelProps = {
  offers: offerProps[];
  onClick: (offer: {
    reason: string;
    id: string;
    idSecundary: string | number;
    idConcorrente: string  | number;
  }) => void;
};

export function OffersViewModel(props: offersViewModelProps) {
  const data = useOffersModel({ ...props });
  return <OffersView {...data} />;
}
