import Image from "next/image";
import styles from "./styles.module.css";
import Select from "react-select";
import InputMask from "react-input-mask";
import altofalante from "@/assets/altofalante.png";
import { useAlertViewModel } from "./use-alert-model";
import { CircleX } from "lucide-react";

export function AlertView(props: ReturnType<typeof useAlertViewModel>) {
  const {
    title,
    description,
    type,
    phone,
    handleChangePhone,
    handleChangeCurrentView,
    handleChangeValue,
    handleSave,
    selectStyles,
    localVenda,
    tabulacao,
    tipos,
    tabulacaoSelecionada,
    tipoSelecionados,
    localVendaSelecionado,
  } = props;

  return (
    <aside className={styles.container}>
      <div className={styles.octogono}>
        <div className={styles.content}>
          {type === "end" && (
            <span className={styles.closeButton}>
              <CircleX
                className={styles.close}
                color="#637aef"
                size={32}
                onClick={handleSave}
              />
            </span>
          )}
          <strong className={styles.title}>{title}</strong>

          {type === "info" && (
            <p className={styles.description}>{description}</p>
          )}

          {type === "alert" && (
            <p className={styles.description}>
              {description?.split("*")[0]}
              <div className={styles.highlight}>
                {description?.split("*")[1]}
              </div>
              <div className={styles.highlight}>
                {description?.split("*")[3]}
              </div>
              {description?.split("*")[4]}
            </p>
          )}

          {type === "end" && (
            <section className={styles.container_selects}>
              <InputMask
                mask="(99) 9 9999-9999"
                value={phone}
                onChange={(e) => handleChangePhone(e)}
                placeholder="Melhor número p/ contato"
                className={styles.input}
              />
              <Select
                onChange={(option) => handleChangeValue("Tipo", option)}
                placeholder="Tipo"
                options={tipos}
                styles={selectStyles}
                value={tipoSelecionados}
              />
              <Select
                onChange={(option) => handleChangeValue("LocalVenda", option)}
                placeholder="Por onde foi finalizada a venda"
                options={localVenda}
                styles={selectStyles}
                value={localVendaSelecionado}
              />
              <Select
                onChange={(option) => handleChangeValue("Tabulacao", option)}
                placeholder="Venda foi tabulada no IRIDE"
                options={tabulacao}
                styles={selectStyles}
                value={tabulacaoSelecionada}
              />
            </section>
          )}
        </div>
      </div>
      {type !== "end" && (
        <div className={styles.image}>
          <Image
            src={altofalante}
            alt="Alto-falante"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      {type === "info" && (
        <div
          className={styles.button}
          onClick={() => handleChangeCurrentView("end")}
        >
          SEGUIR COM CADASTRO
        </div>
      )}

      {type === "end" && (
        <div className={styles.button} onClick={handleSave}>
          Salvar
        </div>
      )}

      {type === "alert" && <div className={styles.progressBar} />}
    </aside>
  );
}
