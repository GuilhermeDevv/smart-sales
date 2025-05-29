import { rankingProps } from "@/app/smart-sales/services";
import styles from "./styles.module.css";

// avatar

import feminino from "@/assets/feminino.png";
import masculino from "@/assets/masculino.png";
import Image from "next/image";

type TableViewProps = {
  theme: "light" | "dark";
  data: rankingProps[];
};

export function TableView(props: TableViewProps) {
  const { theme, data } = props;

  const columns = Object.keys(data[0] || {});

  return (
    <div
      className={theme === "dark" ? styles.container : styles.container_light}
    >
      <table
        className={
          theme === "dark" ? styles.content_table : styles.content_table_light
        }
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={
                  theme === "dark"
                    ? styles.table_header
                    : styles.table_header_light
                }
              >
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={
            theme === "dark" ? styles.table_body : styles.table_body_light
          }
        >
          {data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td
                    key={col}
                    className={
                      theme === "dark"
                        ? styles.table_cell
                        : styles.table_cell_light
                    }
                  >
                    {col === "avatar" && (
                      <Image
                        width={80}
                        height={80}
                        src={row[col].includes("masculino") ? masculino : feminino}
                        alt={row["avatar"]}
                        className={styles.avatar}
                      />
                    )}

                    {col !== "avatar" && row[col as keyof typeof row].toString().toLowerCase()}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
