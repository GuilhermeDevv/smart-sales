import { Settings } from "lucide-react";

import styles from "./styles.module.css";
import { Tooltip } from "@mui/material";

interface MenuViewProps {
  renderOptions: React.ReactNode[];
}

export function MenuView({ renderOptions }: MenuViewProps) {
  return (
    <div className={styles.menu_content}>
      <div
        className={`${styles.item} ${styles.floating_item}`}
        style={{ backgroundColor: "#150344", zIndex: 1, rotate: "45deg" }}
        onClick={(e) => e.currentTarget.classList.toggle(styles.active)}
      >
        <Tooltip
          key="settings-tooltip"
          title={<span>CONFIGURAÇÕES</span>}
          placement="bottom"
          arrow
        >
          <Settings />
        </Tooltip>
      </div>
      <div className={styles.options}>
        {renderOptions.map((option, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ backgroundColor: "#150344" }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
