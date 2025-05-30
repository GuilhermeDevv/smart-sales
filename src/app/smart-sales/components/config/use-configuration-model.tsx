import { ConfigurationViewModelProps } from "./configuration-view-model";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";

export function useConfigurationModel(props: ConfigurationViewModelProps) {
  const {
    promocoes,
    concorrentes,
    sendConcorrentes,
    sendPromocoes,
    changeCurrentView,
    theme,
  } = props;

  const [, setSelectedFile] = useState<File | null>(null);

  const promocoesInputRef = useRef<HTMLInputElement>(null);
  const concorrentesInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "text/csv")
    ) {
      setSelectedFile(file);
      alert(`Arquivo selecionado: ${file.name}`);
      handleImport(file, type);
    } else {
      alert("Por favor, selecione um arquivo válido (.xlsx, .xls ou .csv).");
    }
  };

  const handleButtonClick = (type: string) => {
    if (type === "promocoes") {
      promocoesInputRef.current?.click();
    } else {
      concorrentesInputRef.current?.click();
    }
  };

  const handleImport = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "promocoes") {
        await sendPromocoes(formData);
        alert("Importação de promoções concluída com sucesso!");
      } else if (type === "concorrentes") {
        await sendConcorrentes(formData);
        alert("Importação de concorrentes concluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao importar dados:", error);
      alert("Ocorreu um erro ao importar os dados. Tente novamente.");
    }
  };

  const handleExport = async (type: string) => {
    try {
      const data = type === "promocoes" ? promocoes : concorrentes;

      const worksheet = XLSX.utils.json_to_sheet(data as unknown[]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, type);

      const xlsxData = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });
      const blob = new Blob([s2ab(xlsxData)], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);

      alert(`Exportação de ${type} concluída!`);
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      alert("Ocorreu um erro ao exportar os dados. Tente novamente.");
    }
  };

  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return {
    promocoesInputRef,
    concorrentesInputRef,
    handleFileChange,
    handleButtonClick,
    handleExport,
    changeCurrentView,
    theme,
  };
}
