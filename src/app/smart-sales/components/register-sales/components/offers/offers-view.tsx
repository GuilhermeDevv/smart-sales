import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

import claro from "../../../../../../assets/Claro.svg.png";
import tim from "../../../../../../assets/Tim.png";
import vivo from "../../../../../../assets/Vivo.png";

const mockOffers = [
  {
    id: 1,
    image: claro,
    title: "Oferta ideal",
    specifications: [
      "CONTROLE 28 GB EXCLUSIVO ACUMULAVEL",
      "Franquia total de 28 GB, com 14 GB de internet exclusiva para aplicativos de mensagens, redes sociais e vídeos. Inclui também 100 minutos para ligações locais e DDD.",
    ],
    price: "R$ 99,99/mês",
    anotherOffer: {
      image: tim,
      top: "Tim Logo",
      middle: {
        left: { label: "CONTROLE", value: "9 GB" },
        right: { label: "EXTRA", value: "10 GB" },
      },
      bottom: { label: "VALOR", value: "R$ 309,99/mês" },
    },
  },
  {
    id: 2,
    image: claro,
    title: "Oferta Premium",
    specifications: [
      "CONTROLE 50 GB EXCLUSIVO ACUMULAVEL",
      "Franquia total de 50 GB, com 25 GB de internet exclusiva para aplicativos de mensagens, redes sociais e vídeos. Inclui também ligações ilimitadas para qualquer operadora.",
    ],
    price: "R$ 149,99/mês",
    anotherOffer: {
      image: vivo,
      top: "Vivo Logo",
      middle: {
        left: { label: "CONTROLE", value: "15 GB" },
        right: { label: "EXTRA", value: "20 GB" },
      },
      bottom: { label: "VALOR", value: "R$ 399,99/mês" },
    },
  },
  {
    id: 3,
    image: claro,
    title: "Oferta Básica",
    specifications: [
      "CONTROLE 10 GB",
      "Franquia total de 10 GB, ideal para uso moderado. Inclui 50 minutos para ligações locais e DDD.",
    ],
    price: "R$ 49,99/mês",
    anotherOffer: {
      image: tim,
      top: "Tim Logo",
      middle: {
        left: { label: "CONTROLE", value: "9 GB" },
        right: { label: "EXTRA", value: "10 GB" },
      },
      bottom: { label: "VALOR", value: "R$ 309,99/mês" },
    },
  },
  {
    id: 4,
    image: claro,
    title: "Oferta Família",
    specifications: [
      "CONTROLE 100 GB COMPARTILHADO",
      "Franquia total de 100 GB para compartilhar com até 4 dependentes. Inclui ligações ilimitadas e benefícios exclusivos.",
    ],
    price: "R$ 199,99/mês",
    anotherOffer: {
      image: tim,
      top: "Tim Logo",
      middle: {
        left: { label: "CONTROLE", value: "9 GB" },
        right: { label: "EXTRA", value: "10 GB" },
      },
      bottom: { label: "VALOR", value: "R$ 309,99/mês" },
    },
  },
  {
    id: 5,
    image: claro,
    title: "Oferta Empresarial",
    specifications: [
      "CONTROLE 200 GB CORPORATIVO",
      "Franquia total de 200 GB para uso empresarial. Inclui suporte dedicado e ligações ilimitadas para qualquer operadora.",
    ],
    price: "R$ 299,99/mês",
    anotherOffer: {
      image: tim,
      top: "Tim Logo",
      middle: {
        left: { label: "CONTROLE", value: "9 GB" },
        right: { label: "EXTRA", value: "10 GB" },
      },
      bottom: { label: "VALOR", value: "R$ 309,99/mês" },
    },
  },
];

export function OffersView() {
  const [offers ] = useState(mockOffers);

  return (
    <div className={styles.container}>
      {offers.map((offer) => (
        <div key={offer.id} className={styles.gridItem}>
          <section className={styles.offer}>
            <div className={styles.image}>
              <Image
                src={offer.image}
                alt={offer.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <strong className={styles.title}>{offer.title}</strong>
            {offer.specifications.map((spec, index) => (
              <p key={index} className={styles.specification}>
                {spec}
              </p>
            ))}
            <hr />
            <span className={styles.price}>{offer.price}</span>
            <button className={styles.button}>Cadastrar</button>
          </section>

          <aside className={styles.another_offer}>
            <div className={styles.top}>
              <Image
                src={offer.anotherOffer.image}
                alt={offer.anotherOffer.top}
                width={80}
                height={offer.anotherOffer.image === tim ? 20 : 28}
              />
            </div>
            <div className={styles.middle}>
              <div className={styles.middle_left}>
                <span>{offer.anotherOffer.middle.left.label}</span>
                <span>{offer.anotherOffer.middle.left.value}</span>
              </div>
              <div className={styles.middle_right}>
                <span>{offer.anotherOffer.middle.right.value}</span>
                <span>{offer.anotherOffer.middle.right.label}</span>
              </div>
            </div>
            <div className={styles.bottom}>
              <span>{offer.anotherOffer.bottom.label}</span>
              <span>{offer.anotherOffer.bottom.value}</span>
            </div>
          </aside>
        </div>
      ))}
    </div>
  );
}
