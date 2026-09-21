import quartos from "../../../../data/quartos";
import QuartoCard from "../../../../components/quartocard"; 
import styles from "./quarto.module.css";

export default function Quartos() {
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>
        Quartos
      </h1>

      <div className={styles.grid}>

        {quartos.map((quarto) => (
          <QuartoCard
            key={quarto.id}
            quarto={quarto}
          />
        ))}

      </div>

    </div>
  );
}