import { offerProps } from "@/app/smart-sales/services";
import { useMemo, useState, useCallback } from "react";
import { offersViewModelProps } from "./offers-view-model";

export function useOffersModel(props: offersViewModelProps) {
  const {
    offers,
    onClick,
    localVenda,
    tabulacao,
    tipos,
    isRegistrationComplete,
    send_vendas,
  } = props;

  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const [selectedOffer, setSelectedOffer] = useState<offerProps | null>(null);

  
  const handleClick = useCallback(
    (offer: offerProps) => {
      setSelectedOffer(offer);
    },
    [setSelectedOffer]
  );

  const handleSendOffer = useCallback(() => {
    if (selectedOffer?.title === "Não Aceitou Oferta" && selectedReason) {
      onClick?.({
        reason: selectedReason,
        id: "-1",
        idSecundary: selectedOffer.idSecundario,
        idConcorrente: selectedOffer.anotherOffer?.idConcorrente || "",
      });
    } else {
      onClick?.({
        reason: "",
        id: selectedOffer?.id.toString() || "",
        idSecundary: selectedOffer?.idSecundario || "",
        idConcorrente: selectedOffer?.anotherOffer?.idConcorrente || "",
      });
    }
  }, [selectedOffer, selectedReason, onClick]);

  const handleReasonChange = useCallback((selectedOption: string) => {
    setSelectedReason(selectedOption);
  }, []);

  const openAlert = useMemo(() => {
    return isRegistrationComplete && selectedOffer !== null;
  }, [isRegistrationComplete, selectedOffer]);



  return {
    openAlert,
    selectedReason,
    handleClick,
    handleReasonChange,
    handleSendOffer,
    selectedOffer,
    offers,
    localVenda,
    tabulacao,
    tipos,
    send_vendas,
  };
}
