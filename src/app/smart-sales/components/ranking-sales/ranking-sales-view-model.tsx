import { View, Theme } from "../../hooks/use-smart-sales-model";
import { cloudProps, rankingSalesProps, userProps } from "../../services";
import { RankingSalesView } from "./ranking-sales-view";
import { useRankingModel } from "./use-ranking-sales-model";

export type RankingSalesViewModelProps = {
  currentView: View;
  theme: Theme;
  changeTheme: () => void;
  rankingSales: rankingSalesProps | undefined;
  user: userProps | undefined;
  pariodoInicial: string | null;
  periodoFinal: string | null;
  cloud: cloudProps | undefined;
  changeCurrentQuery: (query: string) => void;
  handleReload: () => void;
  changeCurrentView: (view: View) => void;
  comparatorRanking: 0 | 1;
  changeComparatorRanking: (value: 0 | 1) => void;
};

export function RankingSalesViewModel(props: RankingSalesViewModelProps) {
  const data = useRankingModel({ ...props });

  return <RankingSalesView {...data} />;
}
