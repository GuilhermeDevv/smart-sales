import { useState, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { RegisterSalesViewModelProps } from "./register-sales-view-model";

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
    changeCurrentView,
    cloud,
  } = props;

  const [hasActiveCloud, setHasActiveCloud] = useState<boolean>(false);

  const [hasActiveOffer, setHasActiveOffer] = useState<boolean>(false);

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

  const changeVisibilityCloud = useCallback((): void => {
    setHasActiveCloud((prev) => !prev);
  }, []);

  const changeVisibilityOffer = useCallback((): void => {
    setHasActiveOffer((prev) => !prev);
    changeVisibilityCloud();
  }, [changeVisibilityCloud]);

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
        console.log("Form data is valid:", result.data);
        createRegisterSales(result.data);

        changeVisibilityCloud();
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Os dados foram validados com sucesso!",
        });
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        });
      }
    },
    [formData, registerSalesSchema, createRegisterSales, changeVisibilityCloud]
  );

  const getErrorStyle = useCallback(
    (field: keyof FormData): React.CSSProperties =>
      errors[field] ? { border: "1px solid red" } : {},
    [errors]
  );

  return {
    currentView,
    formData,
    errors,
    velocity,
    operator,
    plan,
    reasons,
    cloud,
    hasActiveCloud,
    changeVisibilityCloud,
    handleChange,
    handleContractCodeChange,
    handleCityChange,
    changeVisibilityOffer,
    hasActiveOffer,
    handleReset,
    handleSubmit,
    getErrorStyle,
    changeCurrentView,
  };
}
