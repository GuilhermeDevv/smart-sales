"use client";

// styles
import styles from "./styles.module.css";

// hooks
import { useSmartSales } from "./hooks/use-smart-sales-model";

// view
import { MainViewModel } from "./components/main/main-view-model";
import { RegisterSalesViewModel } from "./components/register-sales/register-sales-view-model";
import { RankingSalesViewModel } from "./components/ranking-sales/ranking-sales-view-model";
import { ConfigurationViewModel } from "./components/config/configuration-view-model";

export default function Smart_sales() {
  const {
    currentView,
    info_actions,
    user,
    city,
    plan,
    theme,
    operator,
    velocity,
    reasons,
    pariodoInicial,
    periodoFinal,
    isAdmin,
    cloud,
    createRegisterSales,
    sendOfferSales,
    changeComparatorRanking,
    comparatorRanking,
    changeCurrentQuery,
    handleReload,
    changeTheme,
    changeCurrentView,
    rankingSales,
    concorrentes,
    promocoes,
    sendConcorrentes,
    sendPromocoes,
  } = useSmartSales();

  return (
    <main
      className={
        theme === "dark" || currentView !== "ranking_vendas"
          ? styles.container
          : styles.container_light
      }
    >
      <MainViewModel
        info_actions={info_actions}
        currentView={currentView}
        isAdmin={isAdmin}
        changeCurrentView={changeCurrentView}
      />
      {currentView === "smart_sales" && (
        <RegisterSalesViewModel
          sendOfferSales={sendOfferSales}
          createRegisterSales={createRegisterSales}
          currentView={currentView}
          city={city}
          velocity={velocity}
          operator={operator}
          plan={plan}
          reasons={reasons}
          changeCurrentView={changeCurrentView}
          cloud={cloud}
        />
      )}

      <RankingSalesViewModel
        changeComparatorRanking={changeComparatorRanking}
        comparatorRanking={comparatorRanking}
        changeCurrentView={changeCurrentView}
        user={user}
        changeCurrentQuery={changeCurrentQuery}
        currentView={currentView}
        theme={theme}
        changeTheme={changeTheme}
        rankingSales={rankingSales}
        pariodoInicial={pariodoInicial}
        periodoFinal={periodoFinal}
        handleReload={handleReload}
        cloud={cloud}
      />

      {currentView === "configuracoes" && (
        <ConfigurationViewModel
          sendConcorrentes={sendConcorrentes}
          sendPromocoes={sendPromocoes}
          promocoes={promocoes}
          concorrentes={concorrentes}
          changeCurrentView={changeCurrentView}
          theme={theme}
        />
      )}
    </main>
  );
}
