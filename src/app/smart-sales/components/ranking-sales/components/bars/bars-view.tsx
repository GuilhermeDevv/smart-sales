import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import styles from "./styles.module.css";
import Image from "next/image";

import feminino from "@/assets/feminino.png";
import masculino from "@/assets/masculino.png";
import { rankingProps } from "@/app/smart-sales/services";
import { useCallback, useMemo } from "react";

type BarsViewProps = {
  theme: "light" | "dark";
  data: rankingProps[];
};

export function BarsView(props: BarsViewProps) {
  const { theme, data } = props;

  const minBarValue = 0.5;

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        vendas: item.vendas > 0 ? item.vendas : minBarValue,
        isZero: item.vendas === 0,
        vendasOriginal: item.vendas,
      })),
    [data]
  );

  const renderCustomizedLabelInnerBar = useCallback(
    (props: unknown) => {
      const { x, y, width, height, value, index } = props as {
        x: number;
        y: number;
        width: number;
        height: number;
        value: number;
        index: number;
      };

      const vendedor = chartData ? chartData[index] : null;
      const vendasExibir = vendedor?.isZero ? 0 : value;

      return (
        <g>
          <text
            x={x + width / 2}
            y={y + height / 2 - 5}
            fill={theme === "dark" ? "#fff" : "#fff"}
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              textAnchor: "middle",
            }}
          >
            {vendasExibir}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 15}
            fill={theme === "dark" ? "#fff" : "#fff"}
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              textAnchor: "middle",
            }}
          >
            VENDAS
          </text>
        </g>
      );
    },
    [chartData, theme]
  );

  const renderCustomizedLabel = useCallback(
    (props: unknown) => {
      const { x, y, width, index } = props as {
        x: number;
        y: number;
        width: number;
        index: number;
      };

      const vendedor = chartData ? chartData[index] : null;
      const icon = vendedor?.avatar.includes("masculino")
        ? masculino
        : feminino;
      const borderColor =
        vendedor?.ranking == 1
          ? "#f5c108"
          : vendedor?.ranking == 2
          ? "#bfbcb5"
          : "#ca2e05";

      return (
        <g>
          <foreignObject
            x={x + width / 2 - 42}
            y={y - 95}
            width={88}
            height={88}
          >
            <div
              className={styles.podium}
              style={{
                borderColor: `${borderColor}`,
              }}
            >
              <Image alt="Vendedor" src={icon.src} width={76} height={76} />
            </div>
          </foreignObject>
        </g>
      );
    },
    [chartData]
  );

  return (
    <aside className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 100, bottom: 50 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme === "dark" ? "#5f24d4" : "#7f00ff"}
              />
              <stop
                offset="70%"
                stopColor={theme === "dark" ? "#5f24d4" : "#7f00ff"}
              />
              <stop
                offset="100%"
                stopColor={theme === "dark" ? "#381e6e20" : "#7f00ff"}
              />
            </linearGradient>
          </defs>
          <Bar
            dataKey="vendas"
            fill="url(#barGradient)"
            radius={[10, 10, 0, 0]}
          >
            <LabelList
              dataKey="vendas"
              content={renderCustomizedLabelInnerBar}
            />
            <LabelList dataKey="nome" content={renderCustomizedLabel} />
          </Bar>
          <XAxis
            dataKey="nome"
            axisLine={{ stroke: theme === "dark" ? "#fff" : "#000" }}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const vendedor = chartData?.find(
                (item) => item.nome === payload.value
              );
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    fill={theme === "dark" ? "#fff" : "#000"}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      textAnchor: "middle",
                      textTransform: "capitalize",
                    }}
                  >
                    {payload.value.toString().toLowerCase()}
                  </text>
                  {vendedor && (
                    <text
                      x={0}
                      y={20}
                      dy={16}
                      textAnchor="middle"
                      fill={theme === "dark" ? "#aaa" : "#555"}
                    >
                      {vendedor.almope}
                    </text>
                  )}
                </g>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </aside>
  );
}
