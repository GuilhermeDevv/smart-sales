import { View } from "../../hooks/use-smart-sales-model";

type MainModelProps = {
  info_actions: {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    action: () => void;
    text_button: string;
  }[];
  currentView: View;
  isAdmin: boolean;
};

export function useMainModel(props: MainModelProps) {
  const { info_actions, currentView, isAdmin } = props;

  return { info_actions, currentView, isAdmin };
}
