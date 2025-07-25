import { View } from "../../hooks/use-smart-sales-model";
import { MainView } from "./main-view";
import { useMainModel } from "./use-main-model";

export type MainViewModelProps = {
  info_actions: {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    action: () => void;
    text_button: string;
  }[];
  changeCurrentView: (view: View) => void;
  currentView: View;
  isAdmin: boolean;
};
export function MainViewModel(props: MainViewModelProps) {
  const data = useMainModel(props);

  return <MainView {...data} />;
}
