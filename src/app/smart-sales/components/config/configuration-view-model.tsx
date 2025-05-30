import { Theme, View } from "../../hooks/use-smart-sales-model";
import { ConfigurationView } from "./configuration-view";
import { useConfigurationModel } from "./use-configuration-model";

export type ConfigurationViewModelProps = {
    promocoes: unknown;
    concorrentes: unknown;
    sendConcorrentes: (body: unknown) => void;
    sendPromocoes: (body: unknown) => void;
    changeCurrentView: (view: View) => void;
    theme: Theme 
};

export function ConfigurationViewModel(props: ConfigurationViewModelProps) {
  const data = useConfigurationModel({ ...props });

  return <ConfigurationView {...data} />;
}
