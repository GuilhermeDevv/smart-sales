import styles from "./styles.module.css";

import { useCloudModel } from "./use-cloud-model";

import {
  AnimatedWordRenderer,
  WordCloud,
  WordCloudProps,
} from "@isoterik/react-word-cloud";

export function CloudView(props: ReturnType<typeof useCloudModel>) {
  const { words, gradients, resolveFill, resolveRotate, onClick } = props;

  const animatedWordRenderer: WordCloudProps["renderWord"] = (data, ref) => (
    <AnimatedWordRenderer
      ref={ref}
      data={data}
      animationDelay={(_word, index) => index * 50}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>ENGANJAMENTO DE VENDAS:</strong>
        {words && (
          <WordCloud
            words={words}
            width={window.innerWidth}
            height={window.innerHeight - 120}
            renderWord={animatedWordRenderer}
            gradients={gradients}
            fill={resolveFill}
            rotate={resolveRotate}
          />
        )}
        <button className={styles.offerButton} onClick={onClick}>
          VER OFERTAS
        </button>
      </div>
    </div>
  );
}
