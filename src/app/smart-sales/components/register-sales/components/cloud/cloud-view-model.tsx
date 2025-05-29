import { cloudProps } from "@/app/smart-sales/services";
import { CloudView } from "./cloud-view";

import { useCloudModel } from "./use-cloud-model";

export type CloudViewModelProps = {
  cloud: cloudProps | undefined;
  onClick: () => void;
};

export function CloudViewModel(props: CloudViewModelProps) {
  const data = useCloudModel({ ...props });

  return <CloudView {...data} />;
}
