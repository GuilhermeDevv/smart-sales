import { ChartNoAxesColumnIncreasing, DollarSign } from "lucide-react";
import { RankingSalesViewModelProps } from "./ranking-sales-view-model";
import styles from "./styles.module.css";
import { useCallback, useMemo, useState } from "react";

export function useRankingModel(props: RankingSalesViewModelProps) {
  const {
    currentView,
    theme,
    changeTheme,
    rankingSales,
    user,
    pariodoInicial,
    periodoFinal,
    changeCurrentQuery,
    handleReload,
    changeCurrentView,
  } = props;

  const [hasFilterActive, setHasFilterActive] = useState(false);

  const card = useMemo(() => {
    const cardData = rankingSales?.card ?? null;
    if (!cardData || cardData.length === 0) return null;
    return cardData.map((item, index) => ({
      icon: (
        <div className={theme === "dark" ? styles.icon : styles.icon_light}>
          {index === 0 ? (
            <ChartNoAxesColumnIncreasing color="#892dff" strokeWidth={4} />
          ) : (
            <DollarSign color="#892dff" strokeWidth={3} />
          )}
        </div>
      ),
      ...item,
    }));
  }, [rankingSales, theme]);

  const bars = useMemo(() => {
    const rankings = rankingSales?.ranking.slice(0, 3) ?? null;
    if (!rankings || rankings.length === 0) return null;
    if (rankings.length === 3) {
      return [rankings[1], rankings[0], rankings[2]];
    }
    return rankings;
  }, [rankingSales]);

  const table = useMemo(() => {
    return rankingSales?.ranking.slice(3, 10) ?? null;
  }, [rankingSales]);

  const handleFilterToggle = useCallback(() => {
    setHasFilterActive(!hasFilterActive);
  }, [hasFilterActive]);

  return {
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
  };
}
