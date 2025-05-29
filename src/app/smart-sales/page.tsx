"use client";

// styles
import styles from "./styles.module.css";

// hooks
import { useSmartSales } from "./hooks/use-smart-sales-model";

// view
import { MainViewModel } from "./components/main/main-view-model";
import { RegisterSalesViewModel } from "./components/register-sales/register-sales-view-model";
import { RankingSalesViewModel } from "./components/ranking-sales/ranking-sales-view-model";

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
    changeCurrentQuery,
    handleReload,
    changeTheme,
    changeCurrentView,
    rankingSales,
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
      />
      {currentView === "smart_sales" && (
        <RegisterSalesViewModel
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
    </main>
  );
}
