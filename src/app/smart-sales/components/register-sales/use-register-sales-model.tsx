import { useState, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { RegisterSalesViewModelProps } from "./register-sales-view-model";
import { useQuery } from "@tanstack/react-query";
import {
  get_offers,
  get_tabulacao,
  get_localVenda,
  get_tipos,
  send_vendas,
} from "../../services";

interface FormData {
  contractNumberCode: string;
  contractCode: string;
  city: string;
  isEligible: boolean | null;
  reason: string | null;
  hasTV: boolean | null;
  tvValue: string;
  hasVirtua: boolean | null;
  virtuaSpeed: string;
  virtuaValue: string;
  hasPhone: boolean | null;
  phoneValue: string;
  phoneOperator: string;
  phonePlan: string;
  hasMobileLine: boolean | null;
  mobileLineValue: string;
  mobileLineOperator: string;
}

export type SelectOption = {
  value: boolean | string;
  label: string;
};

type FormErrors = {
  [key: string]: string;
};

export function useRegisterSalesViewModel(props: RegisterSalesViewModelProps) {
  const {
    currentView,
    city,
    reasons,
    velocity,
    operator,
    plan,
    createRegisterSales,
    sendOfferSales,
    changeCurrentView,
    cloud,
  } = props;

  const [hasActiveCloud, setHasActiveCloud] = useState<boolean>(false);

  const [hasActiveOffer, setHasActiveOffer] = useState<boolean>(false);

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const stateContractMapping = useMemo(() => {
    return city?.reduce((acc, item) => {
      acc[item.Cidade] = item.DDD;
      return acc;
    }, {} as Record<string, string>);
  }, [city]);

  const registerSalesSchema = useMemo(
    () =>
      z
        .object({
          contractCode: z
            .string()
            .nonempty("Código do contrato é obrigatório."),
          contractNumberCode: z
            .string()
            .nonempty("Número do contrato é obrigatório."),
          city: z.string().nonempty("Cidade é obrigatória."),
          isEligible: z.boolean().nullable(),
          reason: z.string().nullable(),
          hasTV: z.boolean().nullable(),
          tvValue: z.string().optional(),
          hasVirtua: z.boolean().nullable(),
          virtuaSpeed: z.string().optional(),
          virtuaValue: z.string().optional(),
          hasPhone: z.boolean().nullable(),
          phoneValue: z.string().optional(),
          phonePlan: z.string().optional(),
          hasMobileLine: z.boolean().nullable(),
          mobileLineValue: z.string().optional(),
          mobileLineOperator: z.string().optional(),
        })
        .superRefine((data, ctx) => {
          // Validação para isEligible
          if (data.isEligible === null) {
            ctx.addIssue({
              code: "custom",
              path: ["isEligible"],
              message: "É necessário informar se o cliente é elegível.",
            });
          }

          // Validação para reason
          if (
            data.isEligible === false &&
            (!data.reason || data.reason.trim() === "")
          ) {
            ctx.addIssue({
              code: "custom",
              path: ["reason"],
              message: "Motivo é obrigatório se o cliente não for elegível.",
            });
          }

          // Validação para hasTV e tvValue
          if (data.isEligible === true) {
            if (data.hasTV === null || data.hasTV === undefined) {
              ctx.addIssue({
                code: "custom",
                path: ["hasTV"],
                message: "É necessário informar se o cliente possui TV.",
              });
            }
            if (data.hasTV === true && !data.tvValue) {
              ctx.addIssue({
                code: "custom",
                path: ["tvValue"],
                message:
                  "Valor da assinatura é obrigatório se o cliente possui TV.",
              });
            }
          }

          // Validação para hasVirtua, virtuaSpeed e virtuaValue
          if (data.isEligible === true) {
            if (data.hasVirtua === null || data.hasVirtua === undefined) {
              ctx.addIssue({
                code: "custom",
                path: ["hasVirtua"],
                message: "É necessário informar se o cliente possui Virtua.",
              });
            }
            if (data.hasVirtua === true) {
              if (!data.virtuaSpeed) {
                ctx.addIssue({
                  code: "custom",
                  path: ["virtuaSpeed"],
                  message:
                    "Velocidade é obrigatória se o cliente possui Virtua.",
                });
              }
              if (!data.virtuaValue) {
                ctx.addIssue({
                  code: "custom",
                  path: ["virtuaValue"],
                  message:
                    "Valor da assinatura é obrigatório se o cliente possui Virtua.",
                });
              }
            }
          }

          // Validação para hasPhone, phoneValue e phonePlan
          if (data.isEligible === true) {
            if (data.hasPhone === null || data.hasPhone === undefined) {
              ctx.addIssue({
                code: "custom",
                path: ["hasPhone"],
                message: "É necessário informar se o cliente possui Fone.",
              });
            }
            if (data.hasPhone === true) {
              if (!data.phoneValue) {
                ctx.addIssue({
                  code: "custom",
                  path: ["phoneValue"],
                  message:
                    "Valor da assinatura é obrigatório se o cliente possui Fone.",
                });
              }
              if (!data.phonePlan) {
                ctx.addIssue({
                  code: "custom",
                  path: ["phonePlan"],
                  message: "Plano é obrigatório se o cliente possui Fone.",
                });
              }
            }
          }

          // Validação para hasMobileLine, mobileLineValue e mobileLineOperator
          if (data.isEligible === true) {
            if (
              data.hasMobileLine === null ||
              data.hasMobileLine === undefined
            ) {
              ctx.addIssue({
                code: "custom",
                path: ["hasMobileLine"],
                message:
                  "É necessário informar se o cliente possui Linha Móvel.",
              });
            }
            if (data.hasMobileLine === true) {
              if (!data.mobileLineValue) {
                ctx.addIssue({
                  code: "custom",
                  path: ["mobileLineValue"],
                  message:
                    "Valor da assinatura é obrigatório se o cliente possui Linha Móvel.",
                });
              }
              if (!data.mobileLineOperator) {
                ctx.addIssue({
                  code: "custom",
                  path: ["mobileLineOperator"],
                  message:
                    "Operadora é obrigatória se o cliente possui Linha Móvel.",
                });
              }
            }
          }
        }),
    []
  );

  const [formData, setFormData] = useState<FormData>({
    contractNumberCode: "",
    contractCode: "",
    city: "",
    isEligible: null,
    reason: null,
    hasTV: null,
    tvValue: "",
    hasVirtua: null,
    virtuaSpeed: "",
    virtuaValue: "",
    hasPhone: null,
    phoneValue: "",
    phoneOperator: "",
    phonePlan: "",
    hasMobileLine: null,
    mobileLineValue: "",
    mobileLineOperator: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleReset = useCallback((): void => {
    setFormData({
      contractNumberCode: "",
      contractCode: "",
      city: "",
      isEligible: null,
      reason: null,
      hasTV: null,
      tvValue: "",
      hasVirtua: null,
      virtuaSpeed: "",
      virtuaValue: "",
      hasPhone: null,
      phoneValue: "",
      phoneOperator: "",
      phonePlan: "",
      hasMobileLine: null,
      mobileLineValue: "",
      mobileLineOperator: "",
    });
    setErrors({});
    setIsRegistrationComplete(false);
  }, []);

  const handleChange = useCallback(
    (field: keyof FormData, value: unknown): void => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleContractCodeChange = useCallback(
    (value: string): void => {
      if (!stateContractMapping) return;

      handleChange("contractCode", value);
      const state = Object.keys(stateContractMapping).find(
        (key) =>
          stateContractMapping[key as keyof typeof stateContractMapping] ===
          value
      );
      handleChange("city", state || "NÃO IDENTIFICADO");
    },
    [handleChange, stateContractMapping]
  );

  // FUNÇÃO INCLUIR REGEX PARA IGNORAR ACENTOS NO NOME DA CIDADE.
  const handleCityChange = useCallback(
    (value: string): void => {
      if (!stateContractMapping) return;

      const normalizeText = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const normalizedValue = normalizeText(value);

      handleChange("city", value);

      const contract = Object.keys(stateContractMapping).find(
        (key) =>
          normalizeText(key).toLocaleLowerCase() ===
          normalizedValue.toLocaleLowerCase()
      );

      handleChange(
        "contractCode",
        contract
          ? stateContractMapping[contract as keyof typeof stateContractMapping]
          : ""
      );
    },
    [handleChange, stateContractMapping]
  );

  const changeVisibilityCloud = useCallback((v: boolean): void => {
    setHasActiveCloud(v);
  }, []);

  const changeVisibilityOffer = useCallback(
    (v: boolean): void => {
      setHasActiveOffer(true);
      changeVisibilityCloud(v);
    },
    [changeVisibilityCloud]
  );
  const changeVisibilityOfferReset = useCallback((v: boolean): void => {
    setHasActiveOffer(v);
  }, []);

  const isFormValid = useMemo(() => {
    return (
      formData.city.trim() !== "" &&
      formData.contractCode.trim() !== "" &&
      formData.contractNumberCode.trim() !== "" &&
      formData.isEligible !== null &&
      formData.isEligible === true
    );
  }, [
    formData.city,
    formData.contractCode,
    formData.contractNumberCode,
    formData.isEligible,
  ]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      try {
        const result = registerSalesSchema.safeParse(formData);

        if (!result.success) {
          const fieldErrors: FormErrors = Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value?.[0] || ""]
            )
          );
          setErrors(fieldErrors);

          const errorMessages = Object.values(fieldErrors)
            .filter((msg) => msg)
            .join("<br>");

          Swal.fire({
            icon: "error",
            title: "Erro de Validação",
            html: errorMessages,
          });

          console.error("Validation errors:", fieldErrors);
          return;
        }

        setErrors({});
        createRegisterSales(result.data);
        setIsRegistrationComplete(true);
        changeVisibilityCloud(true);
        if (!isFormValid) {
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Os dados foram validados com sucesso!",
          }).then(() => {
            handleReset();
            changeVisibilityCloud(false);
          });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        });
      }
    },
    [
      formData,
      registerSalesSchema,
      createRegisterSales,
      changeVisibilityCloud,
      isFormValid,
      handleReset,
    ]
  );

  const handleSendOffer = useCallback(
    (offer: {
      reason: string;
      id: string;
      idSecundary: string | number;
      idConcorrente: string | number;
    }): void => {
      if (offer.id === "Não Aceitou Oferta" && !offer.reason) {
        Swal.fire({
          icon: "warning",
          title: "Atenção",
          text: "Por favor, selecione um motivo para a recusa da oferta.",
        });
        return;
      }

      const offerData = {
        ...formData,
        reason: offer.reason || null,
        idOferta: offer.id,
        idSecundary: offer.idSecundary,
        idConcorrente: offer.idConcorrente,
      };

      sendOfferSales(offerData);
      changeVisibilityOfferReset(false);
      handleReset();
    },
    [formData, handleReset, sendOfferSales, changeVisibilityOfferReset]
  );

  const getErrorStyle = useCallback(
    (field: keyof FormData): React.CSSProperties =>
      errors[field] ? { border: "1px solid red" } : {},
    [errors]
  );

  const { data: offers } = useQuery({
    queryKey: [
      "get_offers",
      formData.city,
      formData.contractCode,
      formData.contractNumberCode,
    ],
    queryFn: () =>
      get_offers(
        `cidade=${formData.city}&ddd=${formData.contractCode}&contrato=${formData.contractNumberCode}`
      ),
    enabled: isRegistrationComplete,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const { data: localVenda } = useQuery({
    queryKey: [
      "get_localVenda",
      formData.city,
      formData.contractCode,
      formData.contractNumberCode,
    ],
    queryFn: () => get_localVenda(formData.contractNumberCode),
    enabled: isRegistrationComplete,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const { data: tabulacao } = useQuery({
    queryKey: [
      "get_tabulacao",
      formData.city,
      formData.contractCode,
      formData.contractNumberCode,
    ],
    queryFn: () => get_tabulacao(formData.contractNumberCode),
    enabled: isRegistrationComplete,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  const { data: tipos } = useQuery({
    queryKey: [
      "get_tipos",
      formData.city,
      formData.contractCode,
      formData.contractNumberCode,
    ],
    queryFn: () => get_tipos(formData.contractNumberCode),
    enabled: isRegistrationComplete,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  return {
    currentView,
    formData,
    errors,
    velocity,
    operator,
    plan,
    reasons,
    cloud,
    offers,
    hasActiveCloud,
    isFormValid,
    changeVisibilityCloud,
    handleSendOffer,
    handleChange,
    handleContractCodeChange,
    handleCityChange,
    changeVisibilityOffer,
    send_vendas,
    localVenda,
    tabulacao,
    tipos,
    isRegistrationComplete,
    hasActiveOffer,
    handleReset,
    handleSubmit,
    getErrorStyle,
    changeCurrentView,
  };
}
