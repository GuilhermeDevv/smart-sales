// Views Types
import { View } from "../../hooks/use-smart-sales-model";
import {
  cityProps,
  cloudProps,
  operatorProps,
  planProps,
  reasonsProps,
  velocityProps,
} from "../../services";

// View
import { RegisterSalesView } from "./register-sales-view";

// Hooks
import { useRegisterSalesViewModel } from "./use-register-sales-model";

export type RegisterSalesViewModelProps = {
  currentView: View;
  city: cityProps[] | undefined;
  velocity: velocityProps[] | undefined;
  operator: operatorProps[] | undefined;
  plan: planProps[] | undefined;
  reasons: reasonsProps[] | undefined;
  cloud: cloudProps | undefined;
  createRegisterSales: (data: unknown) => void;
  sendOfferSales: (data: unknown) => void;
  changeCurrentView: (view: View) => void;
};

export function RegisterSalesViewModel(props: RegisterSalesViewModelProps) {
  const data = useRegisterSalesViewModel({ ...props });

  return <RegisterSalesView {...data} />;
}
