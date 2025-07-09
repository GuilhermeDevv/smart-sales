import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertViewModelProps } from "./alert-view-model";
import { GroupBase, StylesConfig } from "react-select";
import {
  tabulacaoProps,
  localVendaProps,
  tipoProps,
} from "@/app/smart-sales/services";

export function useAlertViewModel(props: AlertViewModelProps) {
  const {
    localVenda,
    tabulacao,
    tipos,
    sendOfferSales,
    send_vendas,
    cContrato,
  } = props;

  const alertContent = {
    alert: {
      title: "AVISO IMPORTANTE",
      description:
        "Você sabia que o principal motivo de estorno de comissionamento é a *NÃO UTILIZAÇÃO DA LINHA APÓS ATIVAÇÃO* *O CLIENTE DEVE FAZER USO DA LINHA* Utilize o script a seguir",
    },
    info: {
      title: "Novo Script de Encerramento S2S",
      description: `“Meus parabéns Sr. | Sra. “, agora você é um cliente COMBO MULTI,
quero reforçar que essa OFERTA e os BENEFÍCIOS só ficarão disponíveis a partir da ATIVAÇÃO e UTILIZAÇÃO da sua linha móvel,
então aproveita bastante suas ligações ilimitadas para todo BRASIL com o 021 e seu pacote de dados móveis!”`,
    },
    end: {
      title: "Finalizar Venda",
      description: null,
    },
  };

  const [type, setType] = useState<"info" | "alert" | "end">("alert");
  const [phone, setPhone] = useState("");
  const [tabulacaoSelecionada, setTabulacaoSelecionada] =
    useState<tabulacaoProps | null>(null);
  const [localVendaSelecionado, setLocalVendaSelecionado] =
    useState<localVendaProps | null>(null);
  const [tipoSelecionados, setTipoSelecionados] = useState<tipoProps | null>(
    null
  );

  useEffect(() => {
    if (type === "alert") {
      const timer = setTimeout(() => setType("info"), 5000);
      return () => clearTimeout(timer);
    }
  }, [type]);

  const handleChangePhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
    },
    []
  );

  const handleChangeCurrentView = useCallback(
    (newType: "info" | "alert" | "end") => {
      setType(newType);
    },
    []
  );

  const handleSave = useCallback(async () => {
    await send_vendas({
      contato: phone,
      tabulacaoIride: tabulacaoSelecionada?.value || "",
      localVenda: localVendaSelecionado?.value || "",
      cTipo: tipoSelecionados?.value || "",
      cContrato,
    });
    sendOfferSales();
  }, [
    phone,
    tabulacaoSelecionada,
    localVendaSelecionado,
    tipoSelecionados,
    cContrato,
    send_vendas,
    sendOfferSales,
  ]);

  const selectStyles = useMemo<
    StylesConfig<unknown, false, GroupBase<unknown>>
  >(
    () => ({
      menu: (provided) => ({
        ...provided,
        "& > div": {
          maxHeight: "140px",
        },
        fontSize: 13,
      }),
    }),
    []
  );

  const handleChangeValue = useCallback(
    (field: "Tabulacao" | "LocalVenda" | "Tipo", value: unknown) => {
      if (field === "Tabulacao")
        setTabulacaoSelecionada(value as tabulacaoProps);

      if (field === "LocalVenda")
        setLocalVendaSelecionado(value as localVendaProps);

      if (field === "Tipo") setTipoSelecionados(value as tipoProps);
    },
    []
  );

  const { title, description } = alertContent[type];

  return {
    alertContent,
    type,
    title,
    phone,
    description,
    handleChangePhone,
    handleChangeCurrentView,
    handleSave,
    handleChangeValue,
    selectStyles,
    sendOfferSales,
    localVenda,
    tabulacao,
    tipos,
    localVendaSelecionado,
    tabulacaoSelecionada,
    tipoSelecionados,
  };
}
