/* eslint-disable @next/next/no-img-element */
// Styles

import styles from "./styles.module.css";

// Hooks
import {
  SelectOption,
  useRegisterSalesViewModel,
} from "./use-register-sales-model";

// Images
import salesInfo from "../../../../assets/sales-info.png";

// Libraries
import Select, { SingleValue } from "react-select";
import CurrencyInput from "react-currency-input-field";
import { CircleArrowLeft } from "lucide-react";

// Utils
import { View } from "@/app/smart-sales/hooks/use-smart-sales-model";

// View
import { CloudViewModel } from "./components/cloud/cloud-view-model";
import { OffersViewModel } from "./components/offers/offers-view-model";

export function RegisterSalesView(
  props: ReturnType<typeof useRegisterSalesViewModel>
) {
  const {
    currentView,
    formData,
    reasons,
    velocity,
    operator,
    plan,
    offers,
    handleChange,
    handleContractCodeChange,
    hasActiveCloud,
    handleCityChange,
    hasActiveOffer,
    isFormValid,
    changeVisibilityOffer,
    handleSendOffer,
    handleReset,
    handleSubmit,
    cloud,
    getErrorStyle,
    changeCurrentView,
  } = props;

  return (
    <section
      className={styles.container}
      style={{
        display: currentView === "smart_sales" ? "flex" : "none",
      }}
    >
      <h1 className={styles.title}>
        <CircleArrowLeft
          size={40}
          onClick={() => changeCurrentView(View.MAIN)}
        />
        SMART SALES
      </h1>

      {!hasActiveOffer && (
        <div className={styles.content}>
          <section className={styles.left}>
            <div className={styles.sales_info}>
              <img
                src={salesInfo.src}
                alt="Rocco dinheiro"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </section>
          <section className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1>Informações do cliente</h1>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="contractCode">Cód. Contrato</label>
                  <input
                    type="text"
                    id="contractCode"
                    value={formData.contractCode}
                    onChange={(e) => handleContractCodeChange(e.target.value)}
                    style={getErrorStyle("contractCode")}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    style={getErrorStyle("city")}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="city">Nº Contrato</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.contractNumberCode}
                    onChange={(e) =>
                      handleChange("contractNumberCode", e.target.value)
                    }
                    style={getErrorStyle("contractNumberCode")}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Cliente Elegível?</label>
                  <Select
                    className={styles.select}
                    options={[
                      { value: true, label: "Sim" },
                      { value: false, label: "Não" },
                    ]}
                    onChange={(option: SingleValue<SelectOption>) =>
                      handleChange("isEligible", option?.value as boolean)
                    }
                    placeholder="Selecione uma opção"
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...getErrorStyle("isEligible"),
                      }),
                    }}
                    value={
                      formData.isEligible !== null
                        ? {
                            value: formData.isEligible,
                            label: formData.isEligible ? "Sim" : "Não",
                          }
                        : null
                    }
                  />
                </div>
              </div>
              {formData.isEligible === false && (
                <div className={styles.formGroup}>
                  <label>Motivo</label>
                  <Select
                    className={styles.select}
                    options={reasons}
                    onChange={(option: SingleValue<SelectOption>) =>
                      handleChange("reason", option?.value as string)
                    }
                    placeholder="Selecione uma opção"
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...getErrorStyle("reason"),
                      }),
                    }}
                  />
                </div>
              )}
              {formData.isEligible === true && (
                <>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Cliente Possui TV?</label>
                      <Select
                        className={styles.select}
                        options={[
                          { value: true, label: "Sim" },
                          { value: false, label: "Não" },
                        ]}
                        onChange={(option: SingleValue<SelectOption>) =>
                          handleChange("hasTV", option?.value as boolean)
                        }
                        placeholder="Selecione uma opção"
                        styles={{
                          control: (base) => ({
                            ...base,
                            ...getErrorStyle("hasTV"),
                          }),
                        }}
                      />
                    </div>
                    {formData.hasTV && (
                      <div className={styles.formGroup}>
                        <label>Valor Assinatura</label>

                        <CurrencyInput
                          placeholder="R$ "
                          value={formData.tvValue}
                          onValueChange={(value) =>
                            handleChange("tvValue", value)
                          }
                          style={getErrorStyle("tvValue")}
                          prefix="R$ "
                          decimalSeparator=","
                          groupSeparator="."
                          decimalsLimit={2}
                          allowNegativeValue={false}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Cliente Possui VIRTUA?</label>
                      <Select
                        className={styles.select}
                        options={[
                          { value: true, label: "Sim" },
                          { value: false, label: "Não" },
                        ]}
                        onChange={(option: SingleValue<SelectOption>) =>
                          handleChange("hasVirtua", option?.value as boolean)
                        }
                        placeholder="Selecione uma opção"
                        styles={{
                          control: (base) => ({
                            ...base,
                            ...getErrorStyle("hasVirtua"),
                          }),
                        }}
                      />
                    </div>
                    {formData.hasVirtua && (
                      <>
                        <div className={styles.formGroup}>
                          <label>Qual Velocidade?</label>
                          <Select
                            className={styles.select}
                            options={velocity}
                            onChange={(option: SingleValue<SelectOption>) =>
                              handleChange(
                                "virtuaSpeed",
                                option?.value as string
                              )
                            }
                            placeholder="Selecione uma velocidade"
                            styles={{
                              control: (base) => ({
                                ...base,
                                ...getErrorStyle("virtuaSpeed"),
                              }),
                            }}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Valor Assinatura</label>

                          <CurrencyInput
                            placeholder="R$ "
                            value={formData.virtuaValue}
                            onValueChange={(value) =>
                              handleChange("virtuaValue", value)
                            }
                            style={getErrorStyle("virtuaValue")}
                            prefix="R$ "
                            decimalSeparator=","
                            groupSeparator="."
                            decimalsLimit={2}
                            allowNegativeValue={false}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Cliente Possui FONE?</label>
                      <Select
                        className={styles.select}
                        options={[
                          { value: true, label: "Sim" },
                          { value: false, label: "Não" },
                        ]}
                        onChange={(option: SingleValue<SelectOption>) =>
                          handleChange("hasPhone", option?.value as boolean)
                        }
                        placeholder="Selecione uma opção"
                      />
                    </div>
                    {formData.hasPhone && (
                      <>
                        <div className={styles.formGroup}>
                          <label>Valor Assinatura</label>

                          <CurrencyInput
                            placeholder="R$ "
                            value={formData.phoneValue}
                            onValueChange={(value) =>
                              handleChange("phoneValue", value)
                            }
                            style={getErrorStyle("phoneValue")}
                            prefix="R$ "
                            decimalSeparator=","
                            groupSeparator="."
                            decimalsLimit={2}
                            allowNegativeValue={false}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Plano</label>
                          <Select
                            className={styles.select}
                            options={plan}
                            onChange={(option: SingleValue<SelectOption>) =>
                              handleChange("phonePlan", option?.value as string)
                            }
                            placeholder="Selecione um plano"
                            styles={{
                              control: (base) => ({
                                ...base,
                                ...getErrorStyle("phonePlan"),
                              }),
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label>Cliente Possui LINHA MOVEL ?</label>
                      <Select
                        className={styles.select}
                        options={[
                          { value: true, label: "Sim" },
                          { value: false, label: "Não" },
                        ]}
                        onChange={(option: SingleValue<SelectOption>) =>
                          handleChange(
                            "hasMobileLine",
                            option?.value as boolean
                          )
                        }
                        placeholder="Selecione uma opção"
                      />
                    </div>
                    {formData.hasMobileLine && (
                      <>
                        <div className={styles.formGroup}>
                          <label>Operadora</label>
                          <Select
                            className={styles.select}
                            options={operator}
                            onChange={(option: SingleValue<SelectOption>) =>
                              handleChange(
                                "mobileLineOperator",
                                option?.value as string
                              )
                            }
                            placeholder="Selecione uma operadora"
                            styles={{
                              control: (base) => ({
                                ...base,
                                ...getErrorStyle("mobileLineOperator"),
                              }),
                            }}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Valor Assinatura</label>

                          <CurrencyInput
                            placeholder="R$ "
                            value={formData.mobileLineValue}
                            onValueChange={(value) =>
                              handleChange("mobileLineValue", value)
                            }
                            style={getErrorStyle("mobileLineValue")}
                            prefix="R$ "
                            decimalSeparator=","
                            groupSeparator="."
                            decimalsLimit={2}
                            allowNegativeValue={false}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.finalizeButton}>
                  FINALIZAR
                </button>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleReset}
                >
                  LIMPAR
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {hasActiveCloud && isFormValid && (
        <CloudViewModel cloud={cloud} onClick={changeVisibilityOffer} />
      )}
      {hasActiveOffer && isFormValid && offers && (
        <OffersViewModel offers={offers} onClick={handleSendOffer} />
      )}
    </section>
  );
}
