import { offerProps } from "@/app/smart-sales/services";
import { useState } from "react";
import { offersViewModelProps } from "./offers-view-model";

export function useOffersModel(props: offersViewModelProps) {
  const { offers, onClick } = props;

  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleClick = (offer: offerProps) => {
    if (offer.title === "Não Aceitou Oferta" && selectedReason) {
      onClick?.({
        reason: selectedReason,
        id: "-1",
        idSecundary: offer.idSecundario,
        idConcorrente: offer.anotherOffer?.idConcorrente || "",
      });
    } else {
      onClick?.({
        reason: "",
        id: offer.id.toString(),
        idSecundary: offer.idSecundario,
        idConcorrente: offer.anotherOffer?.idConcorrente || "",
      });
    }
  };

  const handleReasonChange = (selectedOption: string) => {
    setSelectedReason(selectedOption);
  };

  return {
    selectedReason,
    handleClick,
    handleReasonChange,
    offers,
  };
}
