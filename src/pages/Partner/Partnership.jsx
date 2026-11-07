// Libraries
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hooks
import { useSvgTransition } from "../../components/SVG/useSvgTransition";

// Components
import Button from "../../components/Button/Button";

// CSS
import styles from "./Partnership.module.css";

gsap.registerPlugin(ScrollTrigger);

// texto entra de baixo, imagem entra da direita
const textIn = { opacity: 0, y: 24, duration: 0.5, ease: "power3.out" };
const imageIn = { opacity: 0, x: 100, duration: 0.7, ease: "power3.out" };

const Partnership = ({ isPage = false }) => {
  const sectionRef = useRef(null);
  const { onReveal, isTransitioning } = useSvgTransition();

  useGSAP(
    () => {
      function revealOnScroll(targets, vars, triggerEl, start = "top 80%") {
        gsap.from(targets, {
          ...vars,
          stagger: vars.stagger ?? 0.1,
          clearProps: "transform",
          scrollTrigger: {
            trigger: triggerEl,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }

      const heroTextTargets = `.${styles.label}, .${styles.hero} h1, .${styles.heroSubtext}`;
      const heroImageTargets = `.${styles.heroImagePlaceholder}`;

      function playHeroReveal() {
        revealOnScroll(heroTextTargets, textIn, `.${styles.hero}`);
        revealOnScroll(heroImageTargets, imageIn, `.${styles.hero}`);
      }

      // chegando via transição do SVG, esconde o hero até o playOut terminar
      let unsubscribe;
      if (isTransitioning.current) {
        gsap.set(heroTextTargets, { opacity: 0, y: 24 });
        gsap.set(heroImageTargets, { opacity: 0, x: 100 });

        unsubscribe = onReveal(() => {
          gsap.to(heroTextTargets, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
          });
          gsap.to(heroImageTargets, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
          });

          // a transição pode ter mudado a altura da página: remede os gatilhos
          ScrollTrigger.refresh();
        });
      } else {
        playHeroReveal();
      }

      // Motivos
      revealOnScroll(
        `.${styles.reasons} > .${styles.sectionLabel}`,
        textIn,
        `.${styles.reasons}`,
      );

      gsap.utils.toArray(`.${styles.reasonRow}`).forEach((row) => {
        revealOnScroll(
          row.querySelectorAll(
            `.${styles.reasonNumber}, .${styles.reasonText} h3, .${styles.reasonText} p`,
          ),
          { ...textIn, stagger: 0.2 },
          row,
        );
        revealOnScroll(
          row.querySelector(`.${styles.reasonImagePlaceholder}`),
          imageIn,
          row,
        );
      });

      // Como funciona + Formulário
      revealOnScroll(
        `.${styles.applyIntro} > *`,
        textIn,
        `.${styles.applyBlock}`,
      );
      revealOnScroll(
        `.${styles.form} > *`,
        { ...textIn, stagger: 0.2 },
        `.${styles.applyBlock}`,
      );

      // Contato: último bloco da página, então dispara assim que entra na tela
      revealOnScroll(
        `.${styles.contactBlock} > p`,
        textIn,
        `.${styles.contactBlock}`,
        "top bottom",
      );

      return () => unsubscribe?.();
    },
    { scope: sectionRef },
  );

  return (
    <section
      className={`${styles.partnership} ${isPage ? styles.partnershipPage : ""}`}
      ref={sectionRef}
    >
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.label}>Quer tirar o seu projeto do</p>
          <h1>papel?</h1>
          <p className={styles.heroSubtext}>
            Crie um site sob medida para o seu negócio, com design autoral,
            animações fluidas e código limpo, da identidade visual ao deploy.
          </p>
        </div>
        <div className={styles.heroImagePlaceholder} />
      </div>

      {/* Motivos — blocos assimétricos alternados */}
      <div className={styles.reasons}>
        <p className={styles.sectionLabel}>Por que trabalhar comigo?</p>

        <div className={styles.reasonRow}>
          <span className={styles.reasonNumber}>01</span>
          <div className={styles.reasonText}>
            <h3>Design autoral</h3>
            <p>
              Identidade visual pensada do zero, para que o seu site não pareça
              com nenhum outro.
            </p>
          </div>
          <div className={styles.reasonImagePlaceholder} />
        </div>

        <div className={`${styles.reasonRow} ${styles.reverse}`}>
          <span className={styles.reasonNumber}>02</span>
          <div className={styles.reasonImagePlaceholder} />
          <div className={styles.reasonText}>
            <h3>Projeto de ponta a ponta</h3>
            <p>
              Do layout no Figma ao código em produção, tudo em um só lugar, sem
              ruído entre design e desenvolvimento.
            </p>
          </div>
        </div>

        <div className={styles.reasonRow}>
          <span className={styles.reasonNumber}>03</span>
          <div className={styles.reasonText}>
            <h3>Performance e animações</h3>
            <p>
              Interações suaves e carregamento rápido, para encantar o visitante
              sem pesar na experiência.
            </p>
          </div>
          <div className={styles.reasonImagePlaceholder} />
        </div>

        <div className={`${styles.reasonRow} ${styles.reverse}`}>
          <span className={styles.reasonNumber}>04</span>
          <div className={styles.reasonImagePlaceholder} />
          <div className={styles.reasonText}>
            <h3>Acompanhamento próximo</h3>
            <p>
              Você participa de cada etapa e conta com suporte depois da entrega
              para ajustes e evoluções.
            </p>
          </div>
        </div>
      </div>

      {/* Como funciona + Formulário */}
      <div className={styles.applyBlock}>
        <div className={styles.applyIntro}>
          <p className={styles.sectionLabel}>Como funciona</p>
          <h2>Um processo simples e transparente</h2>
          <p className={styles.applyText}>
            Cada projeto começa com uma conversa para entender o seu negócio e
            os seus objetivos. Depois disso, enviamos uma proposta com escopo,
            prazo e valores, para que você saiba exatamente o que esperar antes
            de começarmos.
          </p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="E-mail" required />
          <input type="tel" placeholder="Telefone" required />
          <input type="text" placeholder="Empresa ou projeto" required />
          <Button
            label="Enviar mensagem"
            variant="primary"
            icon="arrow"
            size="small"
          />
        </form>
      </div>

      {/* Contato */}
      <div className={styles.contactBlock}>
        <p>Alguma dúvida antes de começar?</p>
        <p>
          Fale comigo em{" "}
          <a href="mailto:contato@seudominio.com">contato@seudominio.com</a> ou
          pelo telefone{" "}
          <strong className={styles.phone}>(21) XXXXX-XXXX</strong>, de segunda
          a sexta, das 9h às 18h.
        </p>
        <p>
          Ou me siga no Instagram <a>@seuperfil</a>
        </p>
      </div>
    </section>
  );
};

export default Partnership;
