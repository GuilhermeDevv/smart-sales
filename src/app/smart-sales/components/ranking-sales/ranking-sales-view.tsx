import "@theme-toggles/react/css/Classic.css";
// model
import { useRankingModel } from "./use-ranking-sales-model";

// view
import { CardView } from "./components/card/card-view";
import { BarsView } from "./components/bars/bars-view";
import { TableView } from "./components/table/table-view";
import { Filtro } from "./components/filtro";
import { MenuView } from "../menu/menu-view";

// styles
import styles from "./styles.module.css";

// switch
import { Classic } from "@theme-toggles/react";
import { CircleArrowLeft, Funnel, RefreshCcw } from "lucide-react";

// Loader
import { MoonLoader } from "react-spinners";
import { Tooltip } from "@mui/material";

// hooks
import { View } from "@/app/smart-sales/hooks/use-smart-sales-model";

export function RankingSalesView(props: ReturnType<typeof useRankingModel>) {
  const {
    currentView,
    card,
    bars,
    table,
    theme,
    user,
    pariodoInicial,
    periodoFinal,
    hasFilterActive,
    changeTheme,
    handleFilterToggle,
    changeCurrentQuery,
    handleReload,
    changeCurrentView,
  } = props;

  return (
    <section
      className={styles.container}
      style={{ display: currentView === "ranking_vendas" ? "flex" : "none" }}
    >
      <h1 className={theme === "dark" ? styles.title : styles.title_light}>
        <CircleArrowLeft
          size={40}
          onClick={() => changeCurrentView(View.MAIN)}
        />
        RANKING DE VENDAS
      </h1>
      <div className={styles.content}>
        <aside className={styles.left}>
          <div className={styles.container_card}>
            {card?.map((item, index) => (
              <CardView key={index} theme={theme} data={{ ...item }} />
            ))}
          </div>

          {bars && bars.length > 0 && <BarsView theme={theme} data={bars} />}
          {!bars && <MoonLoader color={theme === "dark" ? "#fff" : "#000"} />}
          {bars && bars.length === 0 && (
            <div className={styles.no_data}>
              <p className={theme == "dark" ? "" : styles.light}>
                Não existem dados para o filtro selecionado.
              </p>
            </div>
          )}
        </aside>

        <aside className={styles.right}>
          {table && table.length > 0 && (
            <TableView theme={theme} data={table} />
          )}
          {!table && <MoonLoader color={theme === "dark" ? "#fff" : "#000"} />}
          {table && table.length === 0 && (
            <div className={styles.no_data}>
              <p className={theme == "dark" ? "" : styles.light}>
                Não existem dados para o filtro selecionado.
              </p>
            </div>
          )}
        </aside>
      </div>
      <MenuView
        renderOptions={[
          <Tooltip
            key="theme-toggle"
            title={<span>MUDAR TEMA</span>}
            placement="bottom"
            arrow
          >
            <Classic
              duration={750}
              placeholder={""}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              className={styles.toggle_button}
              onClickCapture={changeTheme}
            />
          </Tooltip>,
          <Tooltip
            key="filter-toggle"
            title={<span>FILTRO</span>}
            placement="bottom"
            arrow
          >
            <Funnel
              key="funnel-icon"
              className={hasFilterActive ? styles.funnel_fill : ""}
              onClick={handleFilterToggle}
            />
          </Tooltip>,
          <Tooltip
            key="reload-toggle"
            title={<span>RECARREGAR DADOS</span>}
            placement="bottom"
            arrow
          >
            <RefreshCcw key="refresh-icon" onClick={handleReload} />
          </Tooltip>,
        ]}
      />

      {user && (
        <Filtro
          setCurrentQuery={(query) => {
            changeCurrentQuery(query);
            handleFilterToggle();
          }}
          usuario={user}
          onClose={handleFilterToggle}
          almope={user.almope}
          dataInicialUrl={pariodoInicial}
          dataFinalUrl={periodoFinal}
          isOpenFilter={!!user && hasFilterActive}
          cliente={
            user
              ? user?.cliente
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          campanha={
            user
              ? user?.campanha
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          coordenador={
            user
              ? user?.coordenador
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          operador={
            user
              ? user?.operador
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          gerente={
            user
              ? user?.gerente
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          supervisor={
            user
              ? user?.supervisor
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          site={
            user
              ? user?.site
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          gerenteGeral={
            user
              ? user?.gerenteGeral
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          diretoriaGeral={
            user
              ? user?.diretoriaGeral
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          centroDeCusto={
            user
              ? user?.operacao
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          grupoPrograma={
            user
              ? user?.grupoPrograma
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          diretor={
            user
              ? user?.diretor
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          programa={
            user
              ? user?.programa
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
          superintendente={
            user
              ? user?.superintendente
              : [
                  {
                    label: "",
                    value: "-1",
                  },
                ]
          }
        />
      )}
    </section>
  );
}
