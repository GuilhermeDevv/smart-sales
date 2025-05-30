import styles from "./styles.module.css";
import { CircleArrowLeft, CloudDownload, FileUp } from "lucide-react";

import { useConfigurationModel } from "./use-configuration-model";
import { View } from "../../hooks/use-smart-sales-model";

export function ConfigurationView(
  props: ReturnType<typeof useConfigurationModel>
) {
  const {
    promocoesInputRef,
    concorrentesInputRef,
    handleFileChange,
    handleButtonClick,
    handleExport,
    changeCurrentView,
    theme,
  } = props;

  return (
    <section className={styles.container}>
      <h1 className={theme === "dark" ? styles.title : styles.title_light}>
        <CircleArrowLeft
          size={40}
          onClick={() => changeCurrentView(View.MAIN)}
        />
        IMPORTAÇÃO/EXPORTAÇÃO
      </h1>

      <aside className={styles.content}>
        <div className={styles.container_card}>
          <div>
            <div className={styles.left}>
              <h1>EXPORTAR PROMOÇÕES</h1>
              <button onClick={() => handleExport("promocoes")}>
                Exportar
              </button>
            </div>
            <div className={styles.right}>
              <FileUp color="#892dff" size={120} />
            </div>
          </div>
          <div>
            <div className={styles.left}>
              <h1>IMPORTAR PROMOÇÕES</h1>
              <button onClick={() => handleButtonClick("promocoes")}>
                Selecionar arquivo
              </button>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                ref={promocoesInputRef}
                onChange={(e) => handleFileChange(e, "promocoes")}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.right}>
              <CloudDownload color="#892dff" size={120} />
            </div>
          </div>
        </div>
        <div className={styles.container_card}>
          <div>
            <div className={styles.left}>
              <h1>EXPORTAR CONCORRENTES</h1>
              <button onClick={() => handleExport("concorrentes")}>
                Exportar
              </button>
            </div>
            <div className={styles.right}>
              <FileUp color="#892dff" size={120} />
            </div>
          </div>
          <div>
            <div className={styles.left}>
              <h1>IMPORTAR CONCORRENTES</h1>
              <button onClick={() => handleButtonClick("concorrentes")}>
                Selecionar arquivo
              </button>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                ref={concorrentesInputRef}
                onChange={(e) => handleFileChange(e, "concorrentes")}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.right}>
              <CloudDownload color="#892dff" size={120} />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
