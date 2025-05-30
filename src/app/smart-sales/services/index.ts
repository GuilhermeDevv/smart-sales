import { getApi, getToken, defaultDate } from "@/app/services";

// config
const api = getApi();
const token = getToken();

// types
export type userProps = {
  nome: string;
  avatar: string;
  almope: string;
  idCliente: number;
  cliente: { label: string; value: number }[];
  idCampanha: number;
  campanha: { label: string; value: number }[];
  idDiretor: number;
  diretor: { label: string; value: number }[];
  idGerente: string;
  gerente: { label: string; value: string }[];
  idCoordenador: string;
  coordenador: { label: string; value: string }[];
  idSupervisor: string;
  supervisor: { label: string; value: string }[];
  idOperador: string;
  operador: { label: string; value: string }[];
  idDiretoriaGeral: string;
  diretoriaGeral: { label: string; value: string }[];
  idSuperintendente: number;
  superintendente: { label: string; value: number }[];
  idGerenteGeral: string;
  gerenteGeral: { label: string; value: string }[];
  idGrupoPrograma: string;
  grupoPrograma: { label: string; value: string }[];
  idPrograma: string;
  programa: { label: string; value: string }[];
  idOperacao: string;
  operacao: { label: string; value: string }[];
  idSite: string;
  site: { label: string; value: string }[];
  cargoParametro: string;
  isAdmin: boolean;
  cargo: string;
};

export type cityProps = {
  DDD: string;
  Cidade: string;
};

export type reasonsProps = {
  label: string;
  value: string;
};

export type planProps = {
  label: string;
  value: string;
};

export type operatorProps = {
  label: string;
  value: string;
};

export type velocityProps = {
  label: string;
  value: string;
};

export type cardProps = {
  title: string;
  value: string;
  progress: number;
  description: string;
};

export type rankingProps = {
  ranking: number;
  almope: string;
  nome: string;
  vendas: number;
  avatar: string;
};

export type rankingSalesProps = {
  card: cardProps[];
  ranking: rankingProps[];
};

export type cloudProps = string[];

export type offerProps = {
  id: string | number;
  idSecundario: string | number;
  image: string;
  title: string;
  specifications: string[];
  price: string;
  anotherOffer?: {
    idConcorrente: string;
    image: string;
    top: string;
    middle: {
      left: {
        label: string;
        value: string;
      };
      right: {
        label: string;
        value: string;
      };
    };
    bottom: {
      label: string;
      value: string;
    };
  };
  reasons?: {
    value: string;
    label: string;
  }[];
};

type getRankingSalesProps = {
  startDate?: string | null;
  endDate?: string | null;
  comparator?: 0 | 1;
  cargo: string;
  query?: string;
};

// services
export async function get_user() {
  if (!api) return;
  const { data } = await api.get<userProps>(
    `/smart-sales/user?almope=${token}`
  );
  return data;
}

export async function get_city() {
  if (!api) return;
  const { data } = await api.get<cityProps[]>(
    `/smart-sales/city?almope=${token}`
  );
  return data;
}

export async function get_reasons() {
  if (!api) return;
  const { data } = await api.get<reasonsProps[]>(
    `/smart-sales/reasons?almope=${token}`
  );
  return data;
}

export async function create_register_sales<T>(body: T) {
  if (!api) return;
  const { data } = await api.post(
    `/smart-sales/register?almope=${token}`,
    body
  );
  return data;
}

export async function get_plan() {
  if (!api) return;
  const { data } = await api.get<planProps[]>(
    `/smart-sales/plan?almope=${token}`
  );
  return data;
}

export async function get_operator() {
  if (!api) return;
  const { data } = await api.get<operatorProps[]>(
    `/smart-sales/operator?almope=${token}`
  );
  return data;
}

export async function get_velocity() {
  if (!api) return;
  const { data } = await api.get<velocityProps[]>(
    `/smart-sales/velocity?almope=${token}`
  );
  return data;
}

export async function get_ranking_sales({
  startDate,
  endDate,
  comparator = 0,
  cargo,
  query,
}: getRankingSalesProps) {
  console.log({ startDate, endDate, cargo, query });
  if (!api) return;
  const { data } = await api.get<rankingSalesProps>(
    `/smart-sales/ranking?${
      query ||
      `id${cargo}=|${token}|&dataInicial=${
        startDate ?? defaultDate().startDate
      }&dataFinal=${
        endDate ?? defaultDate().endDate
      }&cComparativo=${comparator}`
    }`
  );
  return data;
}

export async function get_cloud_sales() {
  if (!api) return;
  const { data } = await api.get<cloudProps>(`/smart-sales/cloud`);
  return data;
}

export async function get_offers(query?: string | null) {
  if (!api) return;
  const { data } = await api.get<offerProps[]>(`/smart-sales/offers/?${query}`);
  return data;
}

export async function send_offer_sales<T>(body: T) {
  if (!api) return;
  const { data } = await api.post(
    `/smart-sales/offers/send?almope=${token}`,
    body
  );
  return data;
}

export async function get_concorrentes() {
  if (!api) return;
  const { data } = await api.get(
    `/smart-sales/download?almope=${token}&cComparativo=0`
  );
  return data;
}

export async function get_promocoes() {
  if (!api) return;
  const { data } = await api.get(
    `/smart-sales/download?almope=${token}&cComparativo=1`
  );
  return data;
}

export async function send_concorrentes(formData: unknown) {
  if (!api) return;
  const { data } = await api.post(
    `/smart-sales/importa-conco?almope=${token}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function send_promocoes(formData: unknown) {
  if (!api) return;
  const { data } = await api.post(
    `/smart-sales/importa-promo?almope=${token}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
