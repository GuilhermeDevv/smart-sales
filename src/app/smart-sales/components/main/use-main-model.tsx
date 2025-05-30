
import { MainViewModelProps } from "./main-view-model";

export function useMainModel(props: MainViewModelProps) {
  const { info_actions, currentView, isAdmin, changeCurrentView } = props;

  return { info_actions, currentView, isAdmin, changeCurrentView };
}
