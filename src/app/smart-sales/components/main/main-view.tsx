// Styles
import styles from "./styles.module.css";

// Icons
import { Settings } from "lucide-react";

// Core
import Image from "next/image";

// Svg
import RoccoMoney from "../../../../assets/rocco-money.png";

// Hooks
import { useMainModel } from "./use-main-model";

// Loader
import { MoonLoader } from "react-spinners";

export function MainView(props: ReturnType<typeof useMainModel>) {
  const { info_actions, currentView, isAdmin } = props;

  return (
    <section
      className={styles.container}
      style={{
        display: currentView === "main" ? "block" : "none",
      }}
    >
      <span className={styles.settings}>{isAdmin && <Settings />}</span>
      <section className={styles.content}>
        <div className={styles.rocco_money}>
          <Image
            src={RoccoMoney}
            alt="Rocco dinheiro"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.text_container}>
          <h1>Bem-vindo ao modulo de</h1>
          <strong>Vendas</strong>

          <p>Gerencie suas operações e acompanhe resultado em tempo real.</p>
        </div>
      </section>
      <section className={styles.actions}>
        {info_actions.map((action) => (
          <div key={action.id} className={styles.action}>
            <div className={styles.icon_container}>
              <span className={styles.icon}>{action.icon}</span>
            </div>
            <div className={styles.text_action_container}>
              <h2>{action.title}</h2>
              <p>{action.description}</p>
              <button onClick={action.action}>{action.text_button}</button>
            </div>
          </div>
        ))}

        {info_actions.length === 0 && <MoonLoader color={"#fff"} />}
      </section>
    </section>
  );
}
