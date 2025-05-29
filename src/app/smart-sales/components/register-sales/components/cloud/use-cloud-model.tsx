import { Gradient, Word, WordCloudProps } from "@isoterik/react-word-cloud";
import { useCallback, useMemo } from "react";
import { CloudViewModelProps } from "./cloud-view-model";

export function useCloudModel(props: CloudViewModelProps) {
  const { cloud, onClick } = props;

  const words: Word[] | undefined = useMemo(() => {
    const baseValue = 6000;
    const step = 100;

    return cloud
      ?.map((text, index) => ({
        text: text.charAt(0).toUpperCase() + text.slice(1),
        value: baseValue - index * step,
      }))
      .sort((a, b) => b.value - a.value);
  }, [cloud]);

  const gradients: Gradient[] = useMemo(
    () => [
      {
        id: "gradient1",
        type: "linear",
        angle: 45,
        stops: [
          { offset: "0%", color: "#890ace" },
          { offset: "100%", color: "#890ace" },
        ],
      },
      {
        id: "gradient2",
        type: "radial",
        stops: [
          { offset: "0%", color: "#cf13cf" },
          { offset: "100%", color: "#cf13cf" },
        ],
      },
      {
        id: "gradient3",
        type: "radial",
        stops: [
          { offset: "0%", color: "#771bd1" },
          { offset: "100%", color: "#771bd1" },
        ],
      },
    ],
    []
  );

  const resolveFill: WordCloudProps["fill"] = useCallback(
    (_word: unknown, index: number) => {
      if (index % 3 === 0) {
        return "url(#gradient3)";
      }
      return index % 2 === 0 ? "url(#gradient1)" : "url(#gradient2)";
    },
    []
  );

  const resolveRotate: WordCloudProps["rotate"] = useCallback(() => {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      return 0;
    }
    if (random === 1) {
      return 90;
    }
    return 90;
  }, []);

  return {
    words,
    gradients,
    resolveFill,
    resolveRotate,
    onClick,
  };
}
