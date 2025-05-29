/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import styles from "./Filtro.module.css";
import { Date } from "../../../ranking-sales/components/date";
import { IFiltroProps } from "./type";
import { useFiltro } from "./hooks";
import dayjs from "dayjs";
import { MultiSelect } from "react-multi-select-component";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Tooltip } from "@mui/material";
import { CircleX, LockIcon } from "lucide-react";

export function Filtro({
  onClose,
  almope,
  setCurrentQuery,

  dataInicialUrl,
  dataFinalUrl,
  isOpenFilter,
  cliente,
  campanha,
  gerente,
  coordenador,
  supervisor,
  site,
  centroDeCusto,
  diretor,
  diretoriaGeral,
  gerenteGeral,
  operador,
  grupoPrograma,
  programa,
  superintendente,

  usuario,
}: IFiltroProps) {
  const {
    campanhas,
    lockedHieraquical,
    gerentes,
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
    periodoInicial,
    periodoFinal,
    isLoaded,
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
    setPeriodoInicial,
    setPeriodoFinal,
    handleSend,
    handleClear,
  } = useFiltro({
    almope,
    setCurrentQuery,

    dataInicialUrl,
    dataFinalUrl,
    isOpenFilter,
    onClose,

    cliente,
    site,
    campanha,
    gerente,
    coordenador,
    supervisor,

    centroDeCusto,
    diretor,
    diretoriaGeral,
    gerenteGeral,
    operador,
    grupoPrograma,
    programa,
    superintendente,
    usuario,
  });

  const router = useRouter();
  const pathname = usePathname();
  const isDarkMode = false;
  const searchParams = new URLSearchParams(useSearchParams());
  return (
    <div
      className={styles.Container}
      style={{
        display: isOpenFilter ? "flex" : "none",
      }}
    >
      <div className={isDarkMode ? styles.ContentDark : styles.Content}>
        <CircleX
          className={isDarkMode ? styles.CloseDark : styles.Close}
          onClick={onClose}
        />
        {/* DATE OR TIME  */}
        <div className={styles.DateContainer}>
          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Data | Início
            </span>

            <Date
              onChange={(e) => {
                setPeriodoInicial(dayjs(e));
                searchParams.set("dataInicial", dayjs(e).format("YYYY-MM-DD"));
                router.push(`${pathname}?${searchParams.toString()}`);
              }}
              value={periodoInicial}
              isDarkMode={isDarkMode}
            />
          </div>
          <hr />
          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Data | Final
            </span>

            <Date
              onChange={(e) => {
                setPeriodoFinal(dayjs(e));
                searchParams.set("dataFinal", dayjs(e).format("YYYY-MM-DD"));
                router.push(`${pathname}?${searchParams.toString()}`);
              }}
              value={periodoFinal}
              isDarkMode={isDarkMode}
            />
            <hr />
          </div>
        </div>
        {/* OPTIONS */}
        <div className={styles.Selects}>
          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Cliente
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "cliente" && (
                  <LockIcon style={{ color: "red" }} />
                )}
              </Tooltip>
            </span>

            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!clienteSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !clientes
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                } ${!clienteSelecionado ? styles.SelectEmpty : ""}`}
                labelledBy="Selecione cliente"
                key={"clientes"}
                options={clientes ?? []}
                onChange={(e) => onChangeCliente(e)}
                value={clienteSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !clientes}
                overrideStrings={{
                  allItemsAreSelected:
                    clienteSelecionado?.length === 1
                      ? clienteSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE CLIENTE",
                }}
              />
              <button
                onClick={(e) => onBlurCliente(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !clientes}
              >
                {isLoaded || !clientes ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Site
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "site" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!siteSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !sites
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={sites ?? []}
                key={"sites"}
                labelledBy="Selecione site"
                onChange={(e) => onChangeSite(e)}
                value={siteSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !sites}
                overrideStrings={{
                  allItemsAreSelected:
                    siteSelecionado?.length === 1
                      ? siteSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE SITE",
                }}
              />
              <button
                onClick={(e) => onBlurSite(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !sites}
              >
                {isLoaded || !sites ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Programa
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "operacao" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !centroDeCustoSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !centrosDeCusto
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={centrosDeCusto ?? []}
                key={"centrosDeCusto"}
                labelledBy="Selecione centro de custo"
                onChange={(e) => onChangeCentroDeCusto(e)}
                value={centroDeCustoSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !centrosDeCusto}
                overrideStrings={{
                  allItemsAreSelected:
                    centroDeCustoSelecionado?.length === 1
                      ? centroDeCustoSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE CENTRO DE CUSTO",
                }}
              />
              <button
                onClick={(e) => onBlurCentroDeCusto(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !centrosDeCusto}
              >
                {isLoaded || !centrosDeCusto ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Grupo Programa
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "grupoPrograma" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !grupoProgramaSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !grupoProgramas
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={grupoProgramas ?? []}
                key={"grupoProgramas"}
                labelledBy="Selecione grupo programa"
                onChange={(e) => onChangeGrupoProgramas(e)}
                value={grupoProgramaSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !grupoProgramas}
                overrideStrings={{
                  allItemsAreSelected:
                    grupoProgramaSelecionado?.length === 1
                      ? grupoProgramaSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE GRUPO PROGRAMA",
                }}
              />
              <button
                onClick={(e) => onBlurGrupoProgramas(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !grupoProgramas}
              >
                {isLoaded || !grupoProgramas ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Centro de Custo
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "programa" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!programaSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !programas
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={programas ?? []}
                key={"programas"}
                labelledBy="Selecione programa"
                onChange={(e) => onChangePrograma(e)}
                value={programaSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !programas}
                overrideStrings={{
                  allItemsAreSelected:
                    programaSelecionado?.length === 1
                      ? programaSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE PROGRAMA",
                }}
              />
              <button
                onClick={(e) => onBlurPrograma(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !programas}
              >
                {isLoaded || !programas ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Campanha
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "campanha" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!campanhaSelecionada ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !campanhas
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                labelledBy="Selecione campanha"
                key={"campanhas"}
                options={campanhas ?? []}
                onChange={(e) => onChangeCampanha(e)}
                value={campanhaSelecionada ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !campanhas}
                overrideStrings={{
                  allItemsAreSelected:
                    campanhaSelecionada?.length === 1
                      ? campanhaSelecionada[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE CAMPANHA",
                }}
              />
              <button
                onClick={(e) => onBlurCampanha(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !campanhas}
              >
                {isLoaded || !campanhas ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Diretoria Geral
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "diretoriaGeral" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !diretoriaGeralSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !diretoriaGerais
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={diretoriaGerais ?? []}
                key={"diretoriaGerais"}
                labelledBy="Selecione diretoria geral"
                onChange={(e) => onChangeDiretoriaGeral(e)}
                value={diretoriaGeralSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !diretoriaGerais}
                overrideStrings={{
                  allItemsAreSelected:
                    diretoriaGeralSelecionado?.length === 1
                      ? diretoriaGeralSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE DIRETORIA GERAL",
                }}
              />
              <button
                onClick={(e) => onBlurDiretoriaGeral(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !diretoriaGerais}
              >
                {isLoaded || !diretoriaGerais ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Diretor
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "diretor" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!diretorSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !diretores
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={diretores ?? []}
                key={"diretores"}
                labelledBy="Selecione Diretor"
                onChange={(e) => onChangeDiretor(e)}
                value={diretorSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !diretores}
                overrideStrings={{
                  allItemsAreSelected:
                    diretorSelecionado?.length === 1
                      ? diretorSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE DIRETOR",
                }}
              />
              <button
                onClick={(e) => onBlurDiretor(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !diretores}
              >
                {isLoaded || !diretores ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Superintendente
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "superintendente" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !superintendenteSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !superintendentes
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={superintendentes ?? []}
                key={"superintendentes"}
                labelledBy="Selecione superintendente"
                onChange={(e) => onChangeSuperintendente(e)}
                value={superintendenteSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !superintendentes}
                overrideStrings={{
                  allItemsAreSelected:
                    superintendenteSelecionado?.length === 1
                      ? superintendenteSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE SUPERINTENDENTE",
                }}
              />
              <button
                onClick={(e) => onBlurSuperintendente(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !superintendentes}
              >
                {isLoaded || !superintendentes ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Gerente Geral
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "gerentesGerais" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !gerentesGeraisSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !gerentesGerais
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                labelledBy="Selecione gerente geral"
                key={"gerentesGerais"}
                options={gerentesGerais ?? []}
                onChange={(e) => onChangeGerenteGeral(e)}
                value={gerentesGeraisSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !gerentesGerais}
                overrideStrings={{
                  allItemsAreSelected:
                    gerentesGeraisSelecionado?.length === 1
                      ? gerentesGeraisSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE GERENTE GERAL",
                }}
              />
              <button
                onClick={(e) => onBlurGerenteGeral(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !gerentesGerais}
              >
                {isLoaded || !gerentesGerais ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Gerente
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "gerente" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!gerenteSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !gerentes
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                labelledBy="Selecione Gerente"
                key={"gerentes"}
                options={gerentes ?? []}
                onChange={(e) => onChangeGerente(e)}
                value={gerenteSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !gerentes}
                overrideStrings={{
                  allItemsAreSelected:
                    gerenteSelecionado?.length === 1
                      ? gerenteSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE GERENTE",
                }}
              />
              <button
                onClick={(e) => onBlurGerente(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !gerentes}
              >
                {isLoaded || !gerentes ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Coordenador
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "coordenador" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !coordenadorSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !coordenadores
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }`}
                options={coordenadores ?? []}
                key={"coordenadores"}
                labelledBy="Selecione coordenador"
                onChange={(e) => onChangeCoordenador(e)}
                value={coordenadorSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !coordenadores}
                overrideStrings={{
                  allItemsAreSelected:
                    coordenadorSelecionado?.length === 1
                      ? coordenadorSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE COORDENADOR",
                }}
              />
              <button
                onClick={(e) => onBlurCoordenador(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !coordenadores}
              >
                {isLoaded || !coordenadores ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Supervisor
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "supervisor" && (
                  <LockIcon
                    titleAccess="sua hierarquia está travada aqui."
                    style={{ color: "red" }}
                  />
                )}
              </Tooltip>
            </span>
            <div className={`${styles.ContainerSelect} ${styles.Dropdown}`}>
              <MultiSelect
                hasSelectAll={false}
                className={`${
                  !supervisorSelecionado ? styles.SelectEmpty : ""
                } ${isDarkMode ? styles.SelectDark : styles.Select} ${
                  isLoaded || !supervisores
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                }
                
                ${styles.SelectTop}`}
                options={supervisores ?? []}
                key={"supervisores"}
                labelledBy="Selecione supervisor"
                onChange={(e) => getSupervisor(e)}
                value={supervisorSelecionado ?? []}
                // isDarkMode={isDarkMode}
                disabled={isLoaded || !supervisores}
                overrideStrings={{
                  allItemsAreSelected:
                    supervisorSelecionado?.length === 1
                      ? supervisorSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE SUPERVISOR",
                }}
              />
              <button
                onClick={(e) => blurSupervisor(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !supervisores}
              >
                {isLoaded || !supervisores ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>

          <div>
            <span className={isDarkMode ? styles.TextDark : styles.Text}>
              Operador
              <Tooltip
                title={<span>sua hierarquia está travada aqui.</span>}
                arrow
              >
                {lockedHieraquical?.name === "operador" && (
                  <LockIcon style={{ color: "red" }} />
                )}
              </Tooltip>
            </span>
            <div className={styles.ContainerSelect}>
              <MultiSelect
                hasSelectAll={false}
                className={`${!operadorSelecionado ? styles.SelectEmpty : ""} ${
                  isDarkMode ? styles.SelectDark : styles.Select
                } ${
                  isLoaded || !operadores
                    ? isDarkMode
                      ? styles.DisabledSelectDark
                      : styles.DisabledSelect
                    : ""
                } ${styles.SelectTop}`}
                options={operadores ?? []}
                key={"operadores"}
                labelledBy="Selecione operador"
                onChange={(e) => onChangeOperador(e)}
                value={operadorSelecionado ?? []}
                disabled={isLoaded || !operadores}
                overrideStrings={{
                  allItemsAreSelected:
                    operadorSelecionado?.length === 1
                      ? operadorSelecionado[0].label
                      : "TODOS SELECIONADOS",
                  clearSearch: "Limpar busca",
                  noOptions: "Sem opções",
                  search: "Pesquisar...",
                  selectSomeItems: "SELECIONE OPERADOR",
                }}
              />
              <button
                onClick={(e) => onBlurOperador(e, true)}
                className={styles.ConfirmarHierarquia}
                disabled={isLoaded || !operadores}
              >
                {isLoaded || !operadores ? "AGUARDE..." : "CONFIRMAR"}
              </button>
            </div>
          </div>
        </div>

        {/* SEND */}
        <div className={styles.ContainerButtons}>
          <button
            className={isDarkMode ? styles.SendDark : styles.Send}
            disabled={isLoaded}
            onClick={handleSend}
          >
            {isLoaded ? "AGUARDE..." : "CONFIRMAR"}
          </button>

          <button
            className={isDarkMode ? styles.CancelDark : styles.Cancel}
            onClick={handleClear}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
