/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import { useEffect, useRef, useState } from "react";
import { getApi } from "@/app/services";
import dayjs, { Dayjs } from "dayjs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { userProps } from "@/app/smart-sales/services";

export interface IUseFiltroProps {
  usuario?: userProps;
  onClose: () => void;
  almope?: string | undefined;
  dataInicialUrl: string | null;
  dataFinalUrl: string | null;
  setCurrentQuery: (query: string) => void;
  isOpenFilter: boolean;
  cliente?: { value: string | number; label: string }[] | undefined;
  campanha?: { value: string | number; label: string }[] | undefined;
  gerente?: { value: string | number; label: string }[] | undefined;
  coordenador?: { value: string | number; label: string }[] | undefined;
  supervisor?: { value: string | number; label: string }[] | undefined;
  diretoriaGeral?: { value: string | number; label: string }[] | undefined;
  diretor?: { value: string | number; label: string }[] | undefined;
  superintendente?: { value: string | number; label: string }[] | undefined;
  gerenteGeral?: { value: string | number; label: string }[] | undefined;
  operador?: { value: string | number; label: string }[] | undefined;
  grupoPrograma?: { value: string | number; label: string }[] | undefined;
  programa?: { value: string | number; label: string }[] | undefined;
  centroDeCusto?: { value: string | number; label: string }[] | undefined;
  site?: { value: string | number; label: string }[] | undefined;
}

export function useFiltro({
  setCurrentQuery,
  almope,
  dataInicialUrl,
  dataFinalUrl,
  cliente,
  site,
  centroDeCusto,
  diretor,
  superintendente,
  diretoriaGeral,
  gerenteGeral,
  grupoPrograma,
  operador,
  programa,
  campanha,
  gerente,
  coordenador,
  supervisor,

  usuario,
}: IUseFiltroProps) {
  const api = getApi();
  let currentQuery = "";
  let currentQueryComNome = "";
  const [clientes, setClientes] = useState(null);
  const [sites, setSites] = useState(null);
  const [centrosDeCusto, setCentrosDeCusto] = useState(null);
  const [grupoProgramas, setGruposPrograma] = useState(null);
  const [programas, setProgramas] = useState(null);
  const [campanhas, setCampanhas] = useState(null);
  const [diretoriaGerais, setDiretoriaGerais] = useState(null);
  const [diretores, setDiretores] = useState(null);
  const [superintendentes, setSuperintendentes] = useState(null);
  const [gerentesGerais, setGerentesGerais] = useState(null);
  const [gerentes, setGerentes] = useState(null);
  const [coordenadores, setCoordenadores] = useState(null);
  const [supervisores, setSupervisores] = useState(null);
  const [operadores, setOperadores] = useState(null);
  const [clear, setClear] = useState(false);
  const [categorias, setCategorias] = useState(null);
  const [indicadores, setIndicadores] = useState(null);
  const [lockedHieraquical, setLockedHieraquical] = useState(null);
  const [selectedParams, setSelectedParams] = useState({
    idCliente: cliente?.[0]?.value != "-1" ? cliente : [],
    idSite: site?.[0]?.value != "-1" ? site : [],
    idOperacao: centroDeCusto?.[0]?.value != "-1" ? centroDeCusto : [],
    idGrupoPrograma: grupoPrograma?.[0]?.value != "-1" ? grupoPrograma : [],
    idPrograma: programa?.[0]?.value != "-1" ? programa : [],
    idCampanha: campanha?.[0]?.value != "-1" ? campanha : [],
    idDiretorGeral: diretoriaGeral?.[0]?.value != "-1" ? diretoriaGeral : [],
    idDiretor: diretor?.[0]?.value != "-1" ? diretor : [],
    idSuperintendente:
      superintendente?.[0]?.value != "-1" ? superintendente : [],
    idGerenteGeral: gerenteGeral?.[0]?.value != "-1" ? gerenteGeral : [],
    idGerente: gerente?.[0]?.value != "-1" ? gerente : [],
    idCoordenador: coordenador?.[0]?.value != "-1" ? coordenador : [],
    idSupervisor: supervisor?.[0]?.value != "-1" ? supervisor : [],
    idOperador: operador?.[0]?.value != "-1" ? operador : [],
  });
  const router = useRouter();

  const [campanhaSelecionada, setCampanhaSelecionada] = useState(
    (campanha ?? [])[0]?.value != "-1" ? campanha : null
  );
  const [gerenteSelecionado, setGerenteSelecionado] = useState(
    (gerente ?? [])[0]?.value != "-1" ? gerente : null
  );
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(
    (coordenador ?? [])[0]?.value != "-1" ? coordenador : null
  );
  const [supervisorSelecionado, setSupervisorSelecionado] = useState(
    (supervisor ?? [])[0]?.value != "-1" ? supervisor : null
  );
  const [clienteSelecionado, setClienteSelecionado] = useState(
    (cliente ?? [])[0]?.value != "-1" ? cliente : null
  );
  const [siteSelecionado, setSiteSelecionado] = useState(
    (site ?? [])[0]?.value != "-1" ? site : null
  );

  const [centroDeCustoSelecionado, setCentroDeCustoSelecionado] = useState(
    (centroDeCusto ?? [])[0]?.value != "-1" ? centroDeCusto : null
  );

  const [grupoProgramaSelecionado, setGrupoProgramaSelecionado] = useState(
    (grupoPrograma ?? [])[0]?.value != "-1" ? grupoPrograma : null
  );

  const [programaSelecionado, setProgramaSelecionado] = useState(
    (programa ?? [])[0]?.value != "-1" ? programa : null
  );
  const [diretoriaGeralSelecionado, setDiretoriaGeralSelecionado] = useState(
    (diretoriaGeral ?? [])[0]?.value != "-1" ? diretoriaGeral : null
  );
  const [diretorSelecionado, setDiretorSelecionado] = useState(
    (diretor ?? [])[0]?.value != "-1" ? diretor : null
  );
  const [superintendenteSelecionado, setSuperintendenteSelecionado] = useState(
    (superintendente ?? [])[0]?.value != "-1" ? superintendente : null
  );
  const [gerentesGeraisSelecionado, setGerentesGeraisSelecionado] = useState(
    (gerenteGeral ?? [])[0]?.value != "-1" ? gerenteGeral : null
  );
  const [operadorSelecionado, setOperadorSelecionado] = useState(
    (operador ?? [])[0]?.value != "-1" ? operador : null
  );
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [indicadoresSelecionados, setIndicadoresSelecionados] = useState(null);
  const refSelect = useRef(null);

  const [periodoInicial, setPeriodoInicial] = useState(
    dataInicialUrl && dayjs(dataInicialUrl).isValid()
      ? dayjs(dataInicialUrl)
      : "data" == "data"
      ? dayjs().startOf("day").subtract(7, "day")
      : dayjs()
  );

  const [periodoFinal, setPeriodoFinal] = useState(
    dataFinalUrl && dayjs(dataFinalUrl).isValid()
      ? dayjs(dataFinalUrl).endOf("day")
      : dayjs().subtract(1, "day").endOf("day")
  );

  useEffect(() => {
    setPeriodoInicial(
      dataInicialUrl && dayjs(dataInicialUrl).isValid()
        ? dayjs(dataInicialUrl)
        : "data" == "data"
        ? dayjs().startOf("day").subtract(7, "day")
        : dayjs()
    );
    setPeriodoFinal(
      dataFinalUrl && dayjs(dataFinalUrl).isValid()
        ? dayjs(dataFinalUrl).endOf("day")
        : dayjs().subtract(1, "day").endOf("day")
    );
    if (!cliente) {
      getClientes(
        dataInicialUrl && dayjs(dataInicialUrl).isValid()
          ? dayjs(dataInicialUrl)
          : "data" == "data"
          ? dayjs().subtract(7, "day")
          : dayjs(),
        dataFinalUrl && dayjs(dataFinalUrl).isValid()
          ? dayjs(dataFinalUrl).endOf("day")
          : dayjs().subtract(1, "day").endOf("day")
      );
    }
  }, [dataInicialUrl, dataFinalUrl]);

  useEffect(() => {
    async function loadData() {
      if (operador && operador[0]?.value != "-1") {
        await onBlurOperador(operador, true);
        return;
      }

      if (supervisor && supervisor[0]?.value != "-1") {
        await blurSupervisor(supervisor, true);
        return;
      }

      if (coordenador && coordenador[0]?.value != "-1") {
        await onBlurCoordenador(coordenador, true);
        return;
      }

      if (gerente && gerente[0]?.value != "-1") {
        await onBlurGerente(gerente, true);
        return;
      }

      if (gerenteGeral && gerenteGeral[0]?.value != "-1") {
        await onBlurGerenteGeral(gerenteGeral, true);
        return;
      }

      if (superintendente && superintendente[0]?.value != "-1") {
        await onBlurSuperintendente(superintendente, true);
        return;
      }

      if (diretor && diretor[0]?.value != "-1") {
        await onBlurDiretor(diretor, true);
        return;
      }

      if (diretoriaGeral && diretoriaGeral[0]?.value != "-1") {
        await onBlurDiretoriaGeral(diretoriaGeral, true);
        return;
      }

      if (campanha && campanha[0]?.value != "-1") {
        await onBlurCampanha(campanha, true);
        return;
      }

      if (programa && programa[0]?.value != "-1") {
        await onBlurPrograma(programa, true);
        return;
      }

      if (grupoPrograma && grupoPrograma[0]?.value != "-1") {
        await onBlurGrupoProgramas(grupoPrograma, true);
        return;
      }

      if (centroDeCusto && centroDeCusto[0]?.value != "-1") {
        await onBlurCentroDeCusto(centroDeCusto, true);
        return;
      }

      if (site && site[0]?.value != "-1") {
        await onBlurSite(site, true);
        return;
      }

      if (cliente && cliente[0]?.value != "-1") {
        await onBlurCliente(cliente, true);
        return;
      }
    }
    if (cliente && cliente[0].value != "-1") {
      loadData();
    }
  }, [cliente, clear]);

  const [isLoaded, setIsLoaded] = useState(true);

  function buildQueryParams(query: string) {
    const cargoParamMap = {
      cliente: "idCliente",
      operacao: "idOperacao",
      diretor: "idDiretor",
      superintendente: "idSuperintendente",
      gerente: "idGerente",
      coordenador: "idCoordenador",
      supervisor: "idSupervisor",
      operador: "idOperador",
    };

    const cargoParams =
      cargoParamMap[
        usuario ? (usuario.cargo as keyof typeof cargoParamMap) : "operador"
      ];

    if (cargoParams) {
      const regex = new RegExp(`${cargoParams}=\\|([^|]*)\\|`);
      const match = query.match(regex);
      if (match) {
        if (!usuario.isAdmin) {
          query = query.replace(regex, `${cargoParams}=|${almope}|`);
        }
      } else {
        query += `&${cargoParams}=|${almope}|`;
      }
    }

    return query;
  }

  function buildDynamicQueryParams(
    basePath: string,
    params: Record<string, unknown>
  ) {
    const cargoParamMap = {
      cliente: "idCliente",
      operacao: "idOperacao",
      diretor: "idDiretor",
      superintendente: "idSuperintendente",
      gerente: "idGerente",
      coordenador: "idCoordenador",
      supervisor: "idSupervisor",
      operador: "idOperador",
      grupoPrograma: "idGrupoPrograma",
      programa: "idPrograma",
      campanha: "idCampanha",
      diretoriaGeral: "idDiretorGeral",
      gerenteGeral: "idGerenteGeral",
      categoria: "cCategoria",
      indicador: "idIndicador",
    };

    const mandatoryParams = {
      dataInicial: dayjs(periodoInicial).format("YYYY-MM-DD HH:mm:ss"),
      dataFinal: dayjs(periodoFinal).format("YYYY-MM-DD HH:mm:ss"),
      almope,
    };

    if (lockedHieraquical) {
      mandatoryParams[
        cargoParamMap[lockedHieraquical.name]
      ] = `|${convertArrayInPipe([
        {
          label: lockedHieraquical.name,
          value: lockedHieraquical.value,
        },
      ])}|`;
    }

    const allParams = { ...mandatoryParams, ...params };

    const queryParams = Object.entries(allParams)
      .filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          (Array.isArray(value) ? value.length > 0 : true)
      )
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=|${convertArrayInPipe(value)}|`;
        }
        return `${key}=${value}`;
      })
      .join("&");

    return `${basePath}?${queryParams}`;
  }

  function updateSelectedParams(key: string, value: unknown) {
    setSelectedParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  }

  async function getClientes(dataInicial?: Dayjs, dataFinal?: Dayjs) {
    setIsLoaded(true);

    try {
      const response = await api.get(
        buildQueryParams(
          `gestaoPerformace/filtro/site/?dataInicial=${dayjs(
            dataInicial ?? periodoInicial
          ).format("YYYY-MM-DD")}&dataFinal=${dayjs(
            dataFinal ?? periodoFinal
          ).format("YYYY-MM-DD")}&idCliente=|${
            convertArrayInPipe(clienteSelecionado) ?? -1
          }|`
        )
      );

      setCampanhas(response.data.campanha);
      setGerentes(response.data.gerente);
      setCoordenadores(response.data.coordenador);
      setSupervisores(response.data.supervisor);
      setGruposPrograma(response.data.grupoPrograma);
      setProgramas(response.data.programa);
      setCentrosDeCusto(response.data.operacao);
      setSites(response.data.site);
      setDiretores(response.data.diretoria);
      setDiretoriaGerais(response.data.diretoriaGeral);
      setOperadores(response.data.operador);
      setGerentesGerais(response.data.gerenteGeral);
      setClientes(response.data.cliente);
      setIndicadores(response.data.indicadores);
      setCategorias(response.data.categoria);
      setSuperintendentes(response.data.superintendente);
      setOperadores(response.data.operador);

      if (response.data.cliente[0].value == "-1") {
        setClienteSelecionado([response.data.cliente[0]]);
      } else if (response.data.cliente.length === 1) {
        setClienteSelecionado(response.data.cliente);
      } else {
        setClienteSelecionado(response.data.cliente.slice(0, -1));
      }

      if (response.data.site[0].value == "-1") {
        setSiteSelecionado([response.data.site[0]]);
      } else if (response.data.site.length === 1) {
        setSiteSelecionado(response.data.site);
      } else {
        setSiteSelecionado(response.data.site.slice(0, -1));
      }

      if (response.data.operacao[0].value == "-1") {
        setCentroDeCustoSelecionado([response.data.operacao[0]]);
      } else if (response.data.operacao.length === 1) {
        setCentroDeCustoSelecionado(response.data.operacao);
      } else {
        setCentroDeCustoSelecionado(response.data.operacao.slice(0, -1));
      }

      if (response.data.grupoPrograma[0].value == "-1") {
        setGrupoProgramaSelecionado([response.data.grupoPrograma[0]]);
      } else if (response.data.grupoPrograma.length === 1) {
        setGrupoProgramaSelecionado(response.data.grupoPrograma);
      } else {
        setGrupoProgramaSelecionado(response.data.grupoPrograma.slice(0, -1));
      }

      if (response.data.programa[0].value == "-1") {
        setProgramaSelecionado([response.data.programa[0]]);
      } else if (response.data.programa.length === 1) {
        setProgramaSelecionado(response.data.programa);
      } else {
        setProgramaSelecionado(response.data.programa.slice(0, -1));
      }

      if (response.data.campanha[0].value == "-1") {
        setCampanhaSelecionada([response.data.campanha[0]]);
      } else if (response.data.campanha.length === 1) {
        setCampanhaSelecionada(response.data.campanha);
      } else {
        setCampanhaSelecionada(response.data.campanha.slice(0, -1));
      }

      if (response.data.diretoriaGeral[0].value == "-1") {
        setDiretoriaGeralSelecionado([response.data.diretoriaGeral[0]]);
      } else if (response.data.diretoriaGeral.length === 1) {
        setDiretoriaGeralSelecionado(response.data.diretoriaGeral);
      } else {
        setDiretoriaGeralSelecionado(response.data.diretoriaGeral.slice(0, -1));
      }

      if (response.data.diretoria[0].value == "-1") {
        setDiretorSelecionado([response.data.diretoria[0]]);
      } else if (response.data.diretoria.length === 1) {
        setDiretorSelecionado(response.data.diretoria);
      } else {
        setDiretorSelecionado(response.data.diretoria.slice(0, -1));
      }

      if (response.data.superintendente[0].value == "-1") {
        setSuperintendenteSelecionado([response.data.superintendente[0]]);
      } else if (response.data.superintendente.length === 1) {
        setSuperintendenteSelecionado(response.data.superintendente);
      } else {
        setSuperintendenteSelecionado(
          response.data.superintendente.slice(0, -1)
        );
      }

      if (response.data.gerenteGeral[0].value == "-1") {
        setGerentesGeraisSelecionado([response.data.gerenteGeral[0]]);
      } else if (response.data.gerenteGeral.length === 1) {
        setGerentesGeraisSelecionado(response.data.gerenteGeral);
      } else {
        setGerentesGeraisSelecionado(response.data.gerenteGeral.slice(0, -1));
      }

      if (response.data.gerente[0].value == "-1") {
        setGerenteSelecionado([response.data.gerente[0]]);
      } else if (response.data.gerente.length === 1) {
        setGerenteSelecionado(response.data.gerente);
      } else {
        setGerenteSelecionado(response.data.gerente.slice(0, -1));
      }

      if (response.data.coordenador[0].value == "-1") {
        setCoordenadorSelecionado([response.data.coordenador[0]]);
      } else if (response.data.coordenador.length === 1) {
        setCoordenadorSelecionado(response.data.coordenador);
      } else {
        setCoordenadorSelecionado(response.data.coordenador.slice(0, -1));
      }

      if (response.data.supervisor[0].value == "-1") {
        setSupervisorSelecionado([response.data.supervisor[0]]);
      } else if (response.data.supervisor.length === 1) {
        setSupervisorSelecionado(response.data.supervisor);
      } else {
        setSupervisorSelecionado(response.data.supervisor.slice(0, -1));
      }

      if (response.data.operador[0].value == "-1") {
        setOperadorSelecionado([response.data.operador[0]]);
      } else if (response.data.operador.length === 1) {
        setOperadorSelecionado(response.data.operador);
      } else {
        setOperadorSelecionado(response.data.operador.slice(0, -1));
      }

      if (response.data.categoria[0].value == "-1") {
        setCategoriaSelecionada([response.data.categoria[0]]);
      } else if (response.data.categoria.length === 1) {
        setCategoriaSelecionada(response.data.categoria);
      } else {
        setCategoriaSelecionada(response.data.categoria.slice(0, -1));
      }

      if (response.data.indicadores[0].value == "-1") {
        setIndicadoresSelecionados([response.data.indicadores[0]]);
      } else if (response.data.indicadores.length === 1) {
        setIndicadoresSelecionados(response.data.indicadores);
      } else {
        setIndicadoresSelecionados(response.data.indicadores.slice(0, -1));
      }

      setIsLoaded(false);
    } catch (error) {
      console.error(error);
      setErrors((errors) => [...errors, "Erro ao buscar clientes"]);
      setIsLoaded(true);
    }
  }

  async function onChangeCategoria(e) {
    const value = setValue(e);
    setCategoriaSelecionada(value);
  }

  async function onBlurCategoria(e) {
    setIsLoaded(true);
    try {
      const response = await api.get(
        buildQueryParams(
          `gestaoPerformace/filtro/indicadores/?almope=${almope}&idCliente=|${convertArrayInPipe(
            clienteSelecionado
          )}|&dataInicial=${dayjs(periodoInicial).format(
            "YYYY-MM-DD HH:mm:ss"
          )}&dataFinal=${dayjs(periodoFinal).format(
            "YYYY-MM-DD HH:mm:ss"
          )}&idSite=|${convertArrayInPipe(
            siteSelecionado
          )}|&idOperacao=|${convertArrayInPipe(
            centroDeCustoSelecionado
          )}|&idGrupoPrograma=|${convertArrayInPipe(
            grupoProgramaSelecionado
          )}|&idPrograma=|${convertArrayInPipe(
            programaSelecionado
          )}|&idCampanha=|${convertArrayInPipe(
            campanhaSelecionada
          )}|&idDiretorGeral=|${convertArrayInPipe(
            diretoriaGeralSelecionado
          )}|&idDiretor=|${convertArrayInPipe(
            diretorSelecionado
          )}|&idSuperintendente=|${convertArrayInPipe(
            superintendenteSelecionado
          )}|&idGerenteGeral=|${convertArrayInPipe(
            gerentesGeraisSelecionado
          )}|&idGerente=|${convertArrayInPipe(
            gerenteSelecionado
          )}|&idCoordenador=|${convertArrayInPipe(
            coordenadorSelecionado
          )}|&idSupervisor=|${convertArrayInPipe(
            supervisorSelecionado
          )}|&idOperador=|${convertArrayInPipe(
            operadorSelecionado
          )}|&cCategoria=|${convertArrayInPipe(
            e[0]?.value ? e : categoriaSelecionada
          )}|`
        )
      );
      setCampanhas(response.data.campanha);
      setGerentes(response.data.gerente);
      setCoordenadores(response.data.coordenador);
      setSupervisores(response.data.supervisor);
      setGruposPrograma(response.data.grupoPrograma);
      setProgramas(response.data.programa);
      setCentrosDeCusto(response.data.operacao);
      setSites(response.data.site);
      setDiretores(response.data.diretoria);
      setDiretoriaGerais(response.data.diretoriaGeral);
      setOperadores(response.data.operador);
      setGerentesGerais(response.data.gerenteGeral);
      setClientes(response.data.cliente);
      setIndicadores(response.data.indicadores);
      setCategorias(response.data.categoria);
      setSuperintendentes(response.data.superintendente);
      setOperadores(response.data.operador);

      if (response.data.cliente[0].value == "-1") {
        setClienteSelecionado([response.data.cliente[0]]);
      } else if (response.data.cliente.length === 1) {
        setClienteSelecionado(response.data.cliente);
      } else {
        setClienteSelecionado(response.data.cliente.slice(0, -1));
      }

      if (response.data.site[0].value == "-1") {
        setSiteSelecionado([response.data.site[0]]);
      } else if (response.data.site.length === 1) {
        setSiteSelecionado(response.data.site);
      } else {
        setSiteSelecionado(response.data.site.slice(0, -1));
      }

      if (response.data.operacao[0].value == "-1") {
        setCentroDeCustoSelecionado([response.data.operacao[0]]);
      } else if (response.data.operacao.length === 1) {
        setCentroDeCustoSelecionado(response.data.operacao);
      } else {
        setCentroDeCustoSelecionado(response.data.operacao.slice(0, -1));
      }

      if (response.data.grupoPrograma[0].value == "-1") {
        setGrupoProgramaSelecionado([response.data.grupoPrograma[0]]);
      } else if (response.data.grupoPrograma.length === 1) {
        setGrupoProgramaSelecionado(response.data.grupoPrograma);
      } else {
        setGrupoProgramaSelecionado(response.data.grupoPrograma.slice(0, -1));
      }

      if (response.data.programa[0].value == "-1") {
        setProgramaSelecionado([response.data.programa[0]]);
      } else if (response.data.programa.length === 1) {
        setProgramaSelecionado(response.data.programa);
      } else {
        setProgramaSelecionado(response.data.programa.slice(0, -1));
      }

      if (response.data.campanha[0].value == "-1") {
        setCampanhaSelecionada([response.data.campanha[0]]);
      } else if (response.data.campanha.length === 1) {
        setCampanhaSelecionada(response.data.campanha);
      } else {
        setCampanhaSelecionada(response.data.campanha.slice(0, -1));
      }

      if (response.data.diretoriaGeral[0].value == "-1") {
        setDiretoriaGeralSelecionado([response.data.diretoriaGeral[0]]);
      } else if (response.data.diretoriaGeral.length === 1) {
        setDiretoriaGeralSelecionado(response.data.diretoriaGeral);
      } else {
        setDiretoriaGeralSelecionado(response.data.diretoriaGeral.slice(0, -1));
      }

      if (response.data.diretoria[0].value == "-1") {
        setDiretorSelecionado([response.data.diretoria[0]]);
      } else if (response.data.diretoria.length === 1) {
        setDiretorSelecionado(response.data.diretoria);
      } else {
        setDiretorSelecionado(response.data.diretoria.slice(0, -1));
      }

      if (response.data.superintendente[0].value == "-1") {
        setSuperintendenteSelecionado([response.data.superintendente[0]]);
      } else if (response.data.superintendente.length === 1) {
        setSuperintendenteSelecionado(response.data.superintendente);
      } else {
        setSuperintendenteSelecionado(
          response.data.superintendente.slice(0, -1)
        );
      }

      if (response.data.gerenteGeral[0].value == "-1") {
        setGerentesGeraisSelecionado([response.data.gerenteGeral[0]]);
      } else if (response.data.gerenteGeral.length === 1) {
        setGerentesGeraisSelecionado(response.data.gerenteGeral);
      } else {
        setGerentesGeraisSelecionado(response.data.gerenteGeral.slice(0, -1));
      }

      if (response.data.gerente[0].value == "-1") {
        setGerenteSelecionado([response.data.gerente[0]]);
      } else if (response.data.gerente.length === 1) {
        setGerenteSelecionado(response.data.gerente);
      } else {
        setGerenteSelecionado(response.data.gerente.slice(0, -1));
      }

      if (response.data.coordenador[0].value == "-1") {
        setCoordenadorSelecionado([response.data.coordenador[0]]);
      } else if (response.data.coordenador.length === 1) {
        setCoordenadorSelecionado(response.data.coordenador);
      } else {
        setCoordenadorSelecionado(response.data.coordenador.slice(0, -1));
      }

      if (response.data.supervisor[0].value == "-1") {
        setSupervisorSelecionado([response.data.supervisor[0]]);
      } else if (response.data.supervisor.length === 1) {
        setSupervisorSelecionado(response.data.supervisor);
      } else {
        setSupervisorSelecionado(response.data.supervisor.slice(0, -1));
      }

      if (response.data.operador[0].value == "-1") {
        setOperadorSelecionado([response.data.operador[0]]);
      } else if (response.data.operador.length === 1) {
        setOperadorSelecionado(response.data.operador);
      } else {
        setOperadorSelecionado(response.data.operador.slice(0, -1));
      }

      if (response.data.categoria[0].value == "-1") {
        setCategoriaSelecionada([response.data.categoria[0]]);
      } else if (response.data.categoria.length === 1) {
        setCategoriaSelecionada(response.data.categoria);
      } else {
        setCategoriaSelecionada(response.data.categoria.slice(0, -1));
      }

      if (response.data.indicadores[0].value == "-1") {
        setIndicadoresSelecionados([response.data.indicadores[0]]);
      } else if (response.data.indicadores.length === 1) {
        setIndicadoresSelecionados(response.data.indicadores);
      } else {
        setIndicadoresSelecionados(response.data.indicadores.slice(0, -1));
      }

      setIsLoaded(false);
    } catch (error) {
      console.error(error);
      setErrors((errors) => [...errors, "Erro ao buscar Indicadores (filtro)"]);
      setIsLoaded(false);
    }
  }

  function onChangeIndicadores(e) {
    const value = setValue(e);
    setIndicadoresSelecionados(value);
  }

  function convertArrayInPipe(e: { value: string; label: string }[]) {
    if (!e) {
      return "-1";
    }

    const lastValue = e[e?.length - 1]?.value;
    if (lastValue == "-1") {
      return lastValue;
    } else {
      const filteredValues = e.filter((option) => option.value != "-1");
      return filteredValues.map((option) => option.value).join("|");
    }
  }

  function convertArrayInPipeWithName(e: { value: string; label: string }[]) {
    const lastValue = e[e?.length - 1]?.value;
    if (lastValue == "-1") {
      return lastValue;
    } else {
      const filteredValues = e.filter((option) => option.value != "-1");
      return filteredValues.map((option) => option.label).join("|");
    }
  }

  const setValue = (e: { label: string; value: string }[]) => {
    if (e.length == 0) return;

    const lastValue = e[e?.length - 1]?.value;
    let result;

    if (Array.isArray(e)) {
      if (e?.length == 1 && e[0].value == "-1") {
        result = [e[0]];
      } else if (e?.length > 1 && lastValue != "-1") {
        result = e.filter((i) => i.value != "-1");
      } else {
        result = [e[e.length - 1]];
      }
      return result;
    }
  };

  async function onChangeCliente(e?) {
    const value = setValue(e);
    setClienteSelecionado(value);
    updateSelectedParams("idCliente", value);
  }

  async function onBlurCliente(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
    };

    let url = buildDynamicQueryParams("gestaoPerformace/filtro/site", params);
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      clienteSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "cliente",
      check
    );
  }

  async function onChangeSite(e?) {
    const value = setValue(e);
    setSiteSelecionado(value);
    updateSelectedParams("idSite", value);
  }

  async function onBlurSite(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/operacao",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      siteSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "site",
      check
    );
  }

  async function onChangeCentroDeCusto(e?) {
    const value = setValue(e);
    setCentroDeCustoSelecionado(value);
    updateSelectedParams("idOperacao", value);
  }

  async function onBlurCentroDeCusto(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/grupo-programa",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      centroDeCustoSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "operacao",
      check
    );
  }

  async function onChangeGrupoProgramas(e) {
    const value = setValue(e);
    setGrupoProgramaSelecionado(value);
    updateSelectedParams("idGrupoPrograma", value);
  }

  async function onBlurGrupoProgramas(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/programa",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      grupoProgramaSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "grupoPrograma",
      check
    );
  }

  async function onChangePrograma(e) {
    const value = setValue(e);
    setProgramaSelecionado(value);
    updateSelectedParams("idPrograma", value);
  }

  async function onBlurPrograma(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/campanha",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      programaSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "programa",
      check
    );
  }

  async function onChangeCampanha(e?) {
    const value = setValue(e);
    setCampanhaSelecionada(value);
    updateSelectedParams("idCampanha", value);
  }

  async function onBlurCampanha(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/campanha",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      campanhaSelecionada,
      lockedHieraquical,
      lockedHieraquical?.value,
      "campanha",
      check
    );
  }

  async function onChangeDiretoriaGeral(e) {
    const value = setValue(e);
    setDiretoriaGeralSelecionado(value);
    updateSelectedParams("idDiretorGeral", value);
  }

  async function onBlurDiretoriaGeral(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/diretoria",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      diretoriaGeralSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "diretoriaGeral",
      check
    );
  }

  async function onChangeDiretor(e) {
    const value = setValue(e);
    setDiretorSelecionado(value);
    updateSelectedParams("idDiretor", value);
  }

  async function onBlurDiretor(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/superintendente",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      diretorSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "diretor",
      check
    );
  }

  async function onChangeSuperintendente(e) {
    const value = setValue(e);
    setSuperintendenteSelecionado(value);
    updateSelectedParams("idSuperintendente", value);
  }

  async function onBlurSuperintendente(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/gerente-geral",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      superintendenteSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "superintendente",
      check
    );
  }

  async function onChangeGerenteGeral(e?) {
    const value = setValue(e);
    setGerentesGeraisSelecionado(value);
    updateSelectedParams("idGerenteGeral", value);
  }

  async function onBlurGerenteGeral(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
      idGerenteGeral: selectedParams.idGerenteGeral,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/gerente",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      gerentesGeraisSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "gerenteGeral",
      check
    );
  }

  async function onChangeGerente(e?) {
    const value = setValue(e);
    setGerenteSelecionado(value);
    updateSelectedParams("idGerente", value);
  }

  async function fetchAndSetData(
    url: string,
    e?,
    selecionado?,
    lockedHieraquical?: { name: string; value: any },
    cargoTravado?: string,
    cargoAtravar?: string,
    check?: boolean
  ) {
    setIsLoaded(true);

    try {
      const response = await api.get(url);
      const isFirstLoad = !lockedHieraquical;

      const shouldUpdate = (cargo: string) => {
        if (isFirstLoad) return true;
        const isLocked = lockedHieraquical?.name === cargo;
        const isCurrent = cargoAtravar === cargo;

        return !isLocked && !isCurrent;
      };

      if (shouldUpdate("campanha")) setCampanhas(response.data.campanha);
      if (shouldUpdate("gerente")) setGerentes(response.data.gerente);
      if (shouldUpdate("coordenador"))
        setCoordenadores(response.data.coordenador);
      if (shouldUpdate("supervisor")) setSupervisores(response.data.supervisor);
      if (shouldUpdate("grupoPrograma"))
        setGruposPrograma(response.data.grupoPrograma);
      if (shouldUpdate("programa")) setProgramas(response.data.programa);
      if (shouldUpdate("operacao")) setCentrosDeCusto(response.data.operacao);
      if (shouldUpdate("site")) setSites(response.data.site);
      if (shouldUpdate("diretoria")) setDiretores(response.data.diretoria);
      if (shouldUpdate("diretoriaGeral"))
        setDiretoriaGerais(response.data.diretoriaGeral);
      if (shouldUpdate("operador")) setOperadores(response.data.operador);
      if (shouldUpdate("gerenteGeral"))
        setGerentesGerais(response.data.gerenteGeral);
      if (shouldUpdate("cliente")) setClientes(response.data.cliente);
      if (shouldUpdate("indicadores"))
        setIndicadores(response.data.indicadores);
      if (shouldUpdate("categoria")) setCategorias(response.data.categoria);
      if (shouldUpdate("superintendente"))
        setSuperintendentes(response.data.superintendente);

      const updateSelecionado = (
        cargo: string,
        data: any[],
        setter: (value: any) => void,
        currentSelections: any[]
      ) => {
        const isLocked = lockedHieraquical?.name === cargo;

        if (isLocked) return;

        const selecoesValidas =
          currentSelections?.filter((selected) =>
            data.some((item) => item.value === selected.value)
          ) || [];

        if (selecoesValidas.length !== currentSelections?.length) {
          setter(selecoesValidas);
        }

        if (isFirstLoad) {
          setter([data[0]]);
          return;
        }

        if (currentSelections && currentSelections.length > 0) {
          const newcurrentSelections = currentSelections.filter((item) =>
            data.some((d) => d.value == item.value)
          );

          if (newcurrentSelections.length > 0) {
            setter(newcurrentSelections);
          } else {
            const todasIndex = data.findIndex((item) => item.value === "-1");
            if (todasIndex !== -1) {
              setter([data[todasIndex]]);
            } else {
              setter([]);
            }
          }

          return;
        }

        const todasIndex = data.findIndex((item) => item.value === "-1");
        let itemsValidos = data;

        if (todasIndex !== -1) {
          itemsValidos = data.slice(0, todasIndex);
        }

        if (itemsValidos.length === 0) {
          setter([]);
        } else if (itemsValidos.length === 1) {
          setter(itemsValidos);
        } else {
          setter(itemsValidos);
        }
      };

      updateSelecionado(
        "cliente",
        response.data.cliente,
        setClienteSelecionado,
        clienteSelecionado
      );
      updateSelecionado(
        "site",
        response.data.site,
        setSiteSelecionado,
        siteSelecionado
      );
      updateSelecionado(
        "operacao",
        response.data.operacao,
        setCentroDeCustoSelecionado,
        centroDeCustoSelecionado
      );
      updateSelecionado(
        "grupoPrograma",
        response.data.grupoPrograma,
        setGrupoProgramaSelecionado,
        grupoProgramaSelecionado
      );
      updateSelecionado(
        "programa",
        response.data.programa,
        setProgramaSelecionado,
        programaSelecionado
      );
      updateSelecionado(
        "campanha",
        response.data.campanha,
        setCampanhaSelecionada,
        campanhaSelecionada
      );
      updateSelecionado(
        "diretoriaGeral",
        response.data.diretoriaGeral,
        setDiretoriaGeralSelecionado,
        diretoriaGeralSelecionado
      );
      updateSelecionado(
        "diretoria",
        response.data.diretoria,
        setDiretorSelecionado,
        diretorSelecionado
      );
      updateSelecionado(
        "superintendente",
        response.data.superintendente,
        setSuperintendenteSelecionado,
        superintendenteSelecionado
      );
      updateSelecionado(
        "gerenteGeral",
        response.data.gerenteGeral,
        setGerentesGeraisSelecionado,
        gerentesGeraisSelecionado
      );
      updateSelecionado(
        "gerente",
        response.data.gerente,
        setGerenteSelecionado,
        gerenteSelecionado
      );
      updateSelecionado(
        "coordenador",
        response.data.coordenador,
        setCoordenadorSelecionado,
        coordenadorSelecionado
      );
      updateSelecionado(
        "supervisor",
        response.data.supervisor,
        setSupervisorSelecionado,
        supervisorSelecionado
      );
      updateSelecionado(
        "operador",
        response.data.operador,
        setOperadorSelecionado,
        operadorSelecionado
      );
      updateSelecionado(
        "categoria",
        response.data.categoria,
        setCategoriaSelecionada,
        categoriaSelecionada
      );
      updateSelecionado(
        "indicadores",
        response.data.indicadores,
        setIndicadoresSelecionados,
        indicadoresSelecionados
      );

      const currentSelection = e?.[0]?.value ? e : selecionado;

      if (lockedHieraquical && check) {
        if (cargoAtravar === lockedHieraquical.name) {
          if (currentSelection?.[0]?.value === "-1") {
            handleLockHierarchy({ name: null, value: null });
          } else if (currentSelection?.[0]?.value !== "-1") {
            handleLockHierarchy({
              name: cargoAtravar,
              value: convertArrayInPipe(currentSelection),
            });
          }
        } else if (lockedHieraquical.value === null) {
          handleLockHierarchy({
            name: cargoAtravar,
            value: convertArrayInPipe(currentSelection),
          });
        }
      }

      if (!lockedHieraquical) {
        handleLockHierarchy({
          name: null,
          value: null,
        });
      }
      setIsLoaded(false);
    } catch (error) {
      console.error(error);
      setErrors((errors) => [...errors, "Erro ao buscar dados"]);
      setIsLoaded(false);
    }
  }
  async function onBlurGerente(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
      idGerenteGeral: selectedParams.idGerenteGeral,
      idGerente: selectedParams.idGerente,
      idCoordenador: selectedParams.idCoordenador,
      idSupervisor: selectedParams.idSupervisor,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/coordenador",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      gerenteSelecionado,
      lockedHieraquical,
      lockedHieraquical?.name,
      "gerente",
      check
    );
  }
  async function onChangeCoordenador(e) {
    const value = setValue(e);
    setCoordenadorSelecionado(value);
    updateSelectedParams("idCoordenador", value);
  }

  async function onBlurCoordenador(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
      idGerenteGeral: selectedParams.idGerenteGeral,
      idGerente: selectedParams.idGerente,
      idCoordenador: selectedParams.idCoordenador,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/supervisor",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      coordenadorSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "coordenador",
      check
    );
  }

  async function getSupervisor(e) {
    const value = setValue(e);
    setSupervisorSelecionado(value);
    updateSelectedParams("idSupervisor", value);
  }

  async function blurSupervisor(e?, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
      idGerenteGeral: selectedParams.idGerenteGeral,
      idGerente: selectedParams.idGerente,
      idCoordenador: selectedParams.idCoordenador,
      idSupervisor: selectedParams.idSupervisor,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/operador",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      supervisorSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "supervisor",
      check
    );
  }

  async function onChangeOperador(e) {
    const value = setValue(e);
    setOperadorSelecionado(value);
  }

  async function onBlurOperador(e, check?) {
    const params = {
      idCliente: selectedParams.idCliente,
      idSite: selectedParams.idSite,
      idOperacao: selectedParams.idOperacao,
      idGrupoPrograma: selectedParams.idGrupoPrograma,
      idPrograma: selectedParams.idPrograma,
      idCampanha: selectedParams.idCampanha,
      idDiretorGeral: selectedParams.idDiretorGeral,
      idDiretor: selectedParams.idDiretor,
      idSuperintendente: selectedParams.idSuperintendente,
      idGerenteGeral: selectedParams.idGerenteGeral,
      idGerente: selectedParams.idGerente,
      idCoordenador: selectedParams.idCoordenador,
      idSupervisor: selectedParams.idSupervisor,
      idOperador: selectedParams.idOperador,
    };

    let url = buildDynamicQueryParams(
      "gestaoPerformace/filtro/operador",
      params
    );
    url = buildQueryParams(url);

    await fetchAndSetData(
      url,
      e,
      supervisorSelecionado,
      lockedHieraquical,
      lockedHieraquical?.value,
      "operador",
      check
    );
  }

  function handleLockHierarchy(e: { name: string; value: string }) {
    setLockedHieraquical(e);
  }

  function handleSend() {
    const obj = [
      {
        clienteSelecionado,
        siteSelecionado,
        centroDeCustoSelecionado,
        grupoProgramaSelecionado,
        programaSelecionado,
        campanhaSelecionada,
        diretoriaGeralSelecionado,
        diretorSelecionado,
        gerentesGeraisSelecionado,
        gerenteSelecionado,
        superintendenteSelecionado,
        coordenadorSelecionado,
        supervisorSelecionado,
        operadorSelecionado,
      },
    ];

    const isEmpty = obj.some((item) => {
      for (const key in item) {
        if (!item[key]) {
          console.error(`Campo ${key} está vazio`);
          return true;
        }
      }
      return false;
    });

    if (isEmpty) return;

    currentQuery = `idCliente=|${convertArrayInPipe(
      clienteSelecionado
    )}|&idSite=|${convertArrayInPipe(
      siteSelecionado
    )}|&idOperacao=|${convertArrayInPipe(
      centroDeCustoSelecionado
    )}|&idGrupoPrograma=|${convertArrayInPipe(
      grupoProgramaSelecionado
    )}|&idPrograma=|${convertArrayInPipe(
      programaSelecionado
    )}|&idCampanha=|${convertArrayInPipe(
      campanhaSelecionada
    )}|&idDiretorGeral=|${convertArrayInPipe(
      diretoriaGeralSelecionado
    )}|&idDiretor=|${convertArrayInPipe(
      diretorSelecionado
    )}|&idGerenteGeral=|${convertArrayInPipe(
      gerentesGeraisSelecionado
    )}|&idGerente=|${convertArrayInPipe(
      gerenteSelecionado
    )}|&idSuperintendente=|${convertArrayInPipe(
      superintendenteSelecionado
    )}|&idCoordenador=|${convertArrayInPipe(
      coordenadorSelecionado
    )}|&idSupervisor=|${convertArrayInPipe(
      supervisorSelecionado
    )}|&idOperador=|${convertArrayInPipe(
      operadorSelecionado
    )}|&dataInicial=${dayjs(periodoInicial).format(
      "YYYY-MM-DD HH:mm:ss"
    )}&dataFinal=${dayjs(periodoFinal).format("YYYY-MM-DD HH:mm:ss")}`;

    currentQueryComNome = `idCliente=|${convertArrayInPipeWithName(
      clienteSelecionado
    )}|&idSite=|${convertArrayInPipeWithName(
      siteSelecionado
    )}|&idOperacao=|${convertArrayInPipeWithName(
      centroDeCustoSelecionado
    )}|&idGrupoPrograma=|${convertArrayInPipeWithName(
      grupoProgramaSelecionado
    )}|&idCampanha=|${convertArrayInPipeWithName(
      campanhaSelecionada
    )}|&idDiretorGeral=|${convertArrayInPipeWithName(
      diretoriaGeralSelecionado
    )}|&idDiretor=|${convertArrayInPipeWithName(
      diretorSelecionado
    )}|&idGerenteGeral=|${convertArrayInPipeWithName(
      gerentesGeraisSelecionado
    )}|&idGerente=|${convertArrayInPipeWithName(
      gerenteSelecionado
    )}|&idSuperintendente=|${convertArrayInPipeWithName(
      superintendenteSelecionado
    )}|&idCoordenador=|${convertArrayInPipeWithName(
      coordenadorSelecionado
    )}|&idSupervisor=|${convertArrayInPipeWithName(
      supervisorSelecionado
    )}|&idOperador=|${convertArrayInPipeWithName(
      operadorSelecionado
    )}|&dataInicial=${dayjs(periodoInicial).format(
      "YYYY-MM-DD HH:mm:ss"
    )}&dataFinal=${dayjs(periodoFinal).format("YYYY-MM-DD HH:mm:ss")}`;

    setCurrentQuery(currentQuery);
    localStorage.setItem("currentQueryComNome", currentQueryComNome);
    localStorage.setItem("currentQuery", currentQuery);
  }

  async function handleClear() {
    setLockedHieraquical(null);
    setClienteSelecionado(null);
    setCampanhaSelecionada(null);
    setGerenteSelecionado(null);
    setCoordenadorSelecionado(null);
    setSupervisorSelecionado(null);
    setSiteSelecionado(null);
    setCentroDeCustoSelecionado(null);
    setGrupoProgramaSelecionado(null);
    setProgramaSelecionado(null);
    setDiretoriaGeralSelecionado(null);
    setDiretorSelecionado(null);
    setGerentesGeraisSelecionado(null);
    setOperadorSelecionado(null);
    setCategoriaSelecionada(null);
    setIndicadoresSelecionados(null);
    setSuperintendenteSelecionado(null);

    setSelectedParams({
      idCliente: cliente[0]?.value != "-1" ? cliente : [],
      idSite: site[0]?.value != "-1" ? site : [],
      idOperacao: centroDeCusto[0]?.value != "-1" ? centroDeCusto : [],
      idGrupoPrograma: grupoPrograma[0]?.value != "-1" ? grupoPrograma : [],
      idPrograma: programa[0]?.value != "-1" ? programa : [],
      idCampanha: campanha[0]?.value != "-1" ? campanha : [],
      idDiretorGeral: diretoriaGeral[0]?.value != "-1" ? diretoriaGeral : [],
      idDiretor: diretor[0]?.value != "-1" ? diretor : [],
      idSuperintendente:
        superintendente[0]?.value != "-1" ? superintendente : [],
      idGerenteGeral: gerenteGeral[0]?.value != "-1" ? gerenteGeral : [],
      idGerente: gerente[0]?.value != "-1" ? gerente : [],
      idCoordenador: coordenador[0]?.value != "-1" ? coordenador : [],
      idSupervisor: supervisor[0]?.value != "-1" ? supervisor : [],
      idOperador: operador[0]?.value != "-1" ? operador : [],
    });

    setClear(!clear);

    setPeriodoInicial(
      "data" == "data"
        ? dayjs().subtract(7, "day").startOf("day")
        : dayjs().startOf("day")
    );
    setPeriodoFinal(
      "data" === "data"
        ? dayjs().subtract(1, "day").endOf("day")
        : dayjs().endOf("day")
    );

    localStorage.removeItem("currentQuery");
    localStorage.removeItem("currentQueryComNome");
    setCurrentQuery("");

    searchParams.set(
      "dataInicial",
      dayjs(
        "data" === "data"
          ? dayjs().subtract(7, "day").startOf("day")
          : dayjs().startOf("day")
      ).format("YYYY-MM-DD")
    );

    searchParams.set(
      "dataFinal",
      dayjs(
        "data" === "data"
          ? dayjs().subtract(1, "day").endOf("day")
          : dayjs().endOf("day")
      ).format("YYYY-MM-DD")
    );

    router.push(`${pathname}?${searchParams.toString()}`);
  }
  const searchParams = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  return {
    refSelect,
    campanhas,
    gerentes,
    lockedHieraquical,
    coordenadores,
    supervisores,
    clientes,
    sites,
    centrosDeCusto,
    superintendentes,
    grupoProgramas,
    programas,
    diretoriaGerais,
    diretores,
    gerentesGerais,
    operadores,
    indicadores,
    campanhaSelecionada,
    gerenteSelecionado,
    coordenadorSelecionado,
    supervisorSelecionado,
    clienteSelecionado,
    siteSelecionado,
    centroDeCustoSelecionado,
    grupoProgramaSelecionado,
    programaSelecionado,
    diretoriaGeralSelecionado,
    diretorSelecionado,
    superintendenteSelecionado,
    gerentesGeraisSelecionado,
    operadorSelecionado,
    categoriaSelecionada,
    indicadoresSelecionados,
    periodoInicial,
    periodoFinal,
    isLoaded,
    categorias,
    setCategorias,
    getSupervisor,
    blurSupervisor,
    onChangeCliente,
    onBlurCliente,
    onChangeSite,
    onBlurSite,
    onChangeCentroDeCusto,
    onBlurCentroDeCusto,
    onChangeGrupoProgramas,
    onBlurGrupoProgramas,
    onChangePrograma,
    onBlurPrograma,
    onChangeCampanha,
    onBlurCampanha,
    onChangeDiretoriaGeral,
    onBlurDiretoriaGeral,
    onChangeDiretor,
    onBlurDiretor,
    onChangeSuperintendente,
    onBlurSuperintendente,
    onChangeGerenteGeral,
    onBlurGerenteGeral,
    onChangeGerente,
    onBlurGerente,
    onChangeCoordenador,
    onBlurCoordenador,
    onChangeOperador,
    onBlurOperador,
    onChangeCategoria,
    onBlurCategoria,
    onChangeIndicadores,
    setPeriodoInicial,
    setPeriodoFinal,
    handleSend,
    handleClear,
  };
}
