import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChartColumnIncreasing, MapPinned, Trophy } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  get_user,
  get_city,
  get_reasons,
  get_plan,
  get_operator,
  get_velocity,
  get_ranking_sales,
  get_cloud_sales,
  create_register_sales,
} from "../services";
import { hasPermission, permissions } from "@/app/config";
import { useAuthService } from "@/app/core/auth/auth-services";
import dayjs from "dayjs";

export enum View {
  MAIN = "main",
  SMART_SALES = "smart_sales",
  RANKING = "ranking_vendas",
  SALES_EXTRACT = "extrato_vendas",
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export function useSmartSales() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { loginService } = useAuthService();

  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const dataInicial = searchParams.get("dataInicial");
  const dataFinal = searchParams.get("dataFinal");

  // d-7
  const pariodoInicial = useMemo(() => {
    if (dataInicial) {
      const parsedDate = dayjs(dataInicial).startOf("day");
      return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
    }
    const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day");
    return sevenDaysAgo.isValid() ? sevenDaysAgo.format("YYYY-MM-DD") : null;
  }, [dataInicial]);

  // d-0
  const periodoFinal = useMemo(() => {
    if (dataFinal) {
      const parsedDate = dayjs(dataFinal).endOf("day");
      return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
    }
    const today = dayjs().endOf("day");
    return today.isValid() ? today.format("YYYY-MM-DD") : null;
  }, [dataFinal]);

  loginService();

  const [currentView, setCurrentView] = useState<View>(() => {
    const hash =
      typeof window !== "undefined"
        ? window.location.hash.replace("#", "")
        : "";
    return Object.values(View).includes(hash as View)
      ? (hash as View)
      : View.MAIN;
  });

  const changeCurrentView = useCallback(
    (view: View) => {
      setCurrentView(view);
      router.replace(`#${view}`);
    },
    [router]
  );

  const changeTheme = useCallback(() => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const changeCurrentQuery = useCallback((query: string) => {
    setCurrentQuery(query);
  }, []);

  // Querys
  const { data: user } = useQuery({
    queryKey: ["get_user"],
    queryFn: get_user,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: city } = useQuery({
    queryKey: ["get_city"],
    queryFn: get_city,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: reasons } = useQuery({
    queryKey: ["get_reasons"],
    queryFn: get_reasons,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: plan } = useQuery({
    queryKey: ["get_plan"],
    queryFn: get_plan,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: operator } = useQuery({
    queryKey: ["get_operator"],
    queryFn: get_operator,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: rankingSales } = useQuery({
    queryKey: ["get_ranking_sales", currentQuery],
    queryFn: () =>
      get_ranking_sales({
        startDate: pariodoInicial || null,
        endDate: periodoFinal || null,
        cargo: user?.cargoParametro || "",
        query: currentQuery,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!user && !!pariodoInicial && !!periodoFinal,
  });

  const { data: velocity } = useQuery({
    queryKey: ["get_velocity"],
    queryFn: get_velocity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: cloud } = useQuery({
    queryKey: ["get_cloud_sales"],
    queryFn: get_cloud_sales,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  // Mutation
  const { mutate: createRegisterSales } = useMutation({
    mutationFn: (data: unknown) => create_register_sales(data),
    mutationKey: ["create_register_sales"],
  });

  // Invalidate all queries
  const { mutate: handleReload } = useMutation({
    mutationFn: async () => {
      console.log("Invalidating and resetting queries...");
    },
    mutationKey: ["invalidate_queries"],
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["get_ranking_sales"] });

      console.log("Queries invalidated and reset successfully");
    },
  });

  // Config
  const info_actions = useMemo(() => {
    if (!user) return [];

    const role = user.cargo as keyof (typeof permissions)["smart_sales"];
    return [
      {
        id: 1,
        title: "Extrato de vendas",
        description: "Acompanhe suas vendas em tempo real",
        icon: (
          <ChartColumnIncreasing color="#fff" strokeWidth={2.6} size={38} />
        ),
        action: () => {
          changeCurrentView(View.SALES_EXTRACT);
        },
        text_button: "Ver extrato",
        visible: hasPermission("smart_sales", role, "extrato_vendas"),
      },
      {
        id: 2,
        title: "Smart sales",
        description: "Acompanhe as melhores ofertas disponíveis por região",
        icon: <MapPinned color="#fff" strokeWidth={2.6} size={38} />,
        action: () => {
          changeCurrentView(View.SMART_SALES);
        },
        text_button: "Ver ofertas",
        visible: hasPermission("smart_sales", role, "smart_sales"),
      },
      {
        id: 3,
        title: "Ranking de vendas",
        description: "Acompanhe o ranking de vendas por vendedor",
        icon: <Trophy color="#fff" strokeWidth={2.6} size={38} />,
        action: () => {
          changeCurrentView(View.RANKING);
        },
        text_button: "Ver ranking",
        visible: hasPermission("smart_sales", role, "ranking_vendas"),
      },
    ].filter((action) => action.visible);
  }, [changeCurrentView, user]);

  useEffect(() => {
    const hash =
      typeof window !== "undefined"
        ? window.location.hash.replace("#", "")
        : "";
    if (Object.values(View).includes(hash as View)) {
      const role = user?.cargo as keyof (typeof permissions)["smart_sales"];
      const hasAccess = hasPermission("smart_sales", role, hash as string);
      if (hasAccess) {
        setCurrentView(hash as View);
      } else {
        setCurrentView(View.MAIN);
        router.replace(`#${View.MAIN}`);
      }
    }
  }, [user, router]);

  const isAdmin = useMemo(() => {
    if (!user) return false;
    const role = user.cargo as keyof (typeof permissions)["smart_sales"];
    return hasPermission("smart_sales", role, "configuracoes");
  }, [user]);

  return {
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
    changeCurrentView,
    createRegisterSales,
    changeCurrentQuery,
    handleReload,
    changeTheme,
    rankingSales,
  };
}
