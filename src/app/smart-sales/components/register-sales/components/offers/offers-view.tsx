import styles from "./styles.module.css";
import Image from "next/image";

import claro from "../../../../../../assets/Claro.svg.png";
import tim from "../../../../../../assets/Tim.png";
import vivo from "../../../../../../assets/Vivo.png";
import oi from "../../../../../../assets/oi.png";

import { Crown, CircleX } from "lucide-react";

import Select from "react-select";

import { useOffersModel } from "./use-offers-model";

export function OffersView(props: ReturnType<typeof useOffersModel>) {
  const { offers, handleClick, handleReasonChange } = props;

  return (
    <div className={styles.container}>
      {offers?.map((offer, index) => (
        <div key={offer.id} className={styles.gridItem}>
          {offer?.title && (
            <>
              {index == 0 && <Crown color="yellow" className={styles.crown} />}
              <section
                className={
                  offer.title === "Não Aceitou Oferta"
                    ? styles.notAccepted
                    : styles.offer
                }
              >
                <div className={styles.image}>
                  {offer.image && offer.price && (
                    <Image
                      src={
                        offer.image === "claro"
                          ? claro
                          : offer.image === "tim"
                          ? tim
                          : offer.image === "vivo"
                          ? vivo
                          : oi
                      }
                      alt={offer.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  )}

                  {offer.title === "Não Aceitou Oferta" && (
                    <CircleX color="red" className={styles.circle} size={100} />
                  )}
                </div>
                <strong className={styles.title}>{offer.title}</strong>
                {offer.specifications.map((spec, index) => (
                  <p key={index} className={styles.specification}>
                    {spec}
                  </p>
                ))}
                <hr />
                {offer.price && (
                  <span className={styles.price}>{offer.price}</span>
                )}
                {offer.virtua && (
                  <span className={styles.virtua}>{offer.virtua}</span>
                )}
                {offer.tv && <span className={styles.tv}>{offer.tv} </span>}
                {offer.fone && (
                  <span className={styles.fone}>{offer.fone}</span>
                )}
                {offer.valor_total && (
                  <span className={styles.valor_total}>
                    {offer.valor_total}
                  </span>
                )}

                {offer.title === "Não Aceitou Oferta" && (
                  <Select
                    className={styles.select}
                    options={offer.reasons}
                    placeholder="Selecione o motivo"
                    isSearchable={false}
                    onChange={(option) =>
                      handleReasonChange(option?.value || "")
                    }
                  />
                )}
                <button
                  className={styles.button}
                  onClick={() => handleClick(offer)}
                >
                  {offer.title !== "Não Aceitou Oferta" && "Cadastrar"}
                  {offer.title == "Não Aceitou Oferta" && "Finalizar"}
                </button>
              </section>

              {offer.title !== "Não Aceitou Oferta" &&
                offer.anotherOffer?.image !== "N/A" && (
                  <aside className={styles.another_offer}>
                    <div className={styles.top}>
                      <Image
                        src={
                          offer?.anotherOffer?.image === "oi"
                            ? oi
                            : offer?.anotherOffer?.image === "tim"
                            ? tim
                            : vivo
                        }
                        alt={offer?.anotherOffer?.top as unknown as string}
                        width={
                          offer?.anotherOffer?.image === "tim"
                            ? 80
                            : offer?.anotherOffer?.image === "vivo"
                            ? 80
                            : 40
                        }
                        height={
                          offer?.anotherOffer?.image === "tim"
                            ? 20
                            : offer?.anotherOffer?.image === "vivo"
                            ? 28
                            : 40
                        }
                      />
                    </div>
                    <div className={styles.middle}>
                      <div className={styles.middle_left}>
                        <span>{offer?.anotherOffer?.middle.left.label}</span>
                        <span>{offer?.anotherOffer?.middle.left.value}</span>
                      </div>
                      <div className={styles.middle_right}>
                        <span>{offer?.anotherOffer?.middle.right.value}</span>
                        <span>{offer?.anotherOffer?.middle.right.label}</span>
                      </div>
                    </div>
                    <div className={styles.bottom}>
                      <span>{offer?.anotherOffer?.bottom.label}</span>
                      <span>{offer?.anotherOffer?.bottom.value}</span>
                    </div>
                  </aside>
                )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
