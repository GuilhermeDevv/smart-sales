import styles from "./styles.module.css";

type CardViewProps = {
  data: {
    icon?: React.ReactNode;
    title: string;
    value: string;
    progress?: number;
    description?: string;
  };
  theme: "light" | "dark";
};

export function CardView(props: CardViewProps) {
  const { data, theme } = props;

  return (
    <div
      className={theme === "dark" ? styles.container : styles.container_light}
    >
      <div className={styles.left}>{data.icon}</div>
      <div className={styles.right}>
        <strong
          className={theme === "dark" ? styles.title : styles.title_light}
        >
          {data.title}
        </strong>
        <span
          className={theme === "dark" ? styles.subtitle : styles.subtitle_light}
        >
          {data.value}
        </span>
        {data.progress !== undefined && (
          <div
            className={
              theme === "dark" ? styles.progressBar : styles.progressBar_light
            }
          >
            <div
              className={
                theme === "dark" ? styles.progress : styles.progress_light
              }
              style={{ width: `${data.progress}%` }}
            />
          </div>
        )}
        {data.description && (
          <span
            className={
              theme === "dark" ? styles.description : styles.description_light
            }
          >
            {data.description}
          </span>
        )}
      </div>
    </div>
  );
}
