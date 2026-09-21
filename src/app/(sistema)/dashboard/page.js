import styles from "./dashboard.module.css";

const indicadores = [
  {
    titulo: "Taxa de Ocupação",
    valor: "78%",
    variacao: "+5.2%",
    icone: "🛏️",
  },
  {
    titulo: "Quartos Disponíveis",
    valor: "14",
    variacao: "-2",
    icone: "✓",
  },
  {
    titulo: "Reservas Hoje",
    valor: "08",
    variacao: "+3",
    icone: "📅",
  },
  {
    titulo: "Check-ins / Out",
    valor: "12 / 09",
    variacao: "NORMAL",
    icone: "🚪",
  },
  {
    titulo: "Receita Diária",
    valor: "R$ 4.250",
    variacao: "+12%",
    icone: "↗",
  },
];

const reservas = [
  {
    hospede: "Amanda Silveira",
    quarto: "Suíte 102",
    tipo: "Standard",
    data: "24/05/2024",
    status: "CONFIRMADA",
  },
  {
    hospede: "Roberto Mendes",
    quarto: "Deluxe 205",
    tipo: "Casal Luxo",
    data: "24/05/2024",
    status: "AGUARDANDO",
  },
  {
    hospede: "Lucia Ferreira",
    quarto: "Suíte 105",
    tipo: "Single",
    data: "25/05/2024",
    status: "CONFIRMADA",
  },
  {
    hospede: "Carlos Eduardo",
    quarto: "Suíte 302",
    tipo: "Master",
    data: "25/05/2024",
    status: "CHECK-IN FEITO",
  },
  {
    hospede: "Juliana Costa",
    quarto: "Suíte 110",
    tipo: "Standard",
    data: "26/05/2024",
    status: "CONFIRMADA",
  },
];

const quartos = [
  { nome: "Disponível", quantidade: 14, classe: "disponivel" },
  { nome: "Ocupado", quantidade: 32, classe: "ocupado" },
  { nome: "Limpeza", quantidade: 4, classe: "limpeza" },
  { nome: "Manutenção", quantidade: 2, classe: "manutencao" },
  { nome: "Bloqueado", quantidade: 1, classe: "bloqueado" },
];

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>

      {/* TOPO */}
      <header className={styles.topbar}>

        <div>
          <span className={styles.hotelName}>
            🏨 Hotel Grand Plaza
          </span>

          <span className={styles.breadcrumb}>
            / Central de Reservas
          </span>
        </div>

        <div className={styles.topRight}>
          <div className={styles.search}>
            🔍 Buscar hóspedes, quartos...
          </div>

          <span>🔔</span>

          <div className={styles.user}>
            <strong>Carlos Mendes</strong>
            <small>Gerente Geral</small>
          </div>

          <div className={styles.avatar}>CM</div>
        </div>

      </header>


      {/* BOAS-VINDAS */}
      <section className={styles.welcome}>

        <div className={styles.welcomeText}>

          <h1>Bom dia, Carlos!</h1>

          <p>
            Temos um dia movimentado hoje, com 12 check-ins
            previstos e uma taxa de ocupação subindo para 82%
            até o final da tarde.
          </p>

          <div className={styles.buttons}>
            <button>Ver Relatório Diário</button>

            <button className={styles.secondary}>
              Configurar Turno
            </button>
          </div>

        </div>

        <div className={styles.hotelPhoto}>
          <img
            src="/hotel-dashboard.jpg"
            alt="Hotel"
          />
        </div>

      </section>


      {/* INDICADORES */}
      <section className={styles.indicators}>

        {indicadores.map((item) => (
          <div className={styles.card} key={item.titulo}>

            <div className={styles.cardTop}>
              <span className={styles.icon}>
                {item.icone}
              </span>

              <span className={styles.variation}>
                {item.variacao}
              </span>
            </div>

            <p>{item.titulo}</p>

            <strong>{item.valor}</strong>

          </div>
        ))}

      </section>


      {/* GRÁFICO + STATUS */}
      <section className={styles.grid}>

        <div className={styles.panel}>

          <div className={styles.panelHeader}>
            <div>
              <h2>Ocupação Semanal</h2>
              <p>Percentual de ocupação dos últimos 7 dias</p>
            </div>

            <span className={styles.badge}>
              Semana Atual
            </span>
          </div>

          <div className={styles.chart}>

            {[65, 58, 70, 82, 88, 97, 80].map(
              (altura, index) => (
                <div className={styles.barContainer} key={index}>

                  <div
                    className={styles.bar}
                    style={{ height: `${altura}%` }}
                  />

                  <span>
                    {[
                      "SEG",
                      "TER",
                      "QUA",
                      "QUI",
                      "SEX",
                      "SAB",
                      "DOM",
                    ][index]}
                  </span>

                </div>
              )
            )}

          </div>

        </div>


        {/* STATUS DOS QUARTOS */}
        <div className={styles.panel}>

          <div className={styles.panelHeader}>
            <div>
              <h2>Status dos Quartos</h2>
              <p>Distribuição atual por categoria</p>
            </div>
          </div>

          <div className={styles.statusList}>

            {quartos.map((quarto) => (
              <div key={quarto.nome}>

                <div className={styles.statusName}>

                  <span className={`${styles.dot} ${styles[quarto.classe]}`} />

                  <span>{quarto.nome}</span>

                  <strong>{quarto.quantidade}</strong>

                </div>

                <div className={styles.progress}>
                  <div
                    className={`${styles.progressBar} ${styles[quarto.classe]}`}
                    style={{
                      width: `${(quarto.quantidade / 53) * 100}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>

          <div className={styles.total}>
            <span>Total de Quartos</span>
            <strong>53</strong>
          </div>

        </div>

      </section>


      {/* RESERVAS + ALERTAS */}
      <section className={styles.grid}>

        <div className={styles.panel}>

          <div className={styles.panelHeader}>
            <div>
              <h2>Próximas Reservas</h2>
              <p>Hóspedes aguardados para os próximos dias</p>
            </div>

            <a href="/reservas">
              Ver todas →
            </a>
          </div>

          <div className={styles.reservas}>

            {reservas.map((reserva) => (
              <div
                className={styles.reserva}
                key={reserva.hospede}
              >

                <div>
                  <strong>{reserva.hospede}</strong>
                  <small>{reserva.quarto}</small>
                </div>

                <span>{reserva.tipo}</span>

                <span>{reserva.data}</span>

                <span
                  className={`${styles.status} ${
                    reserva.status === "AGUARDANDO"
                      ? styles.aguardando
                      : styles.confirmada
                  }`}
                >
                  {reserva.status}
                </span>

              </div>
            ))}

          </div>

        </div>


        {/* ALERTAS */}
        <div className={styles.panel}>

          <div className={styles.panelHeader}>
            <div>
              <h2>Atividades e Alertas</h2>
              <p>Notificações operacionais em tempo real</p>
            </div>
          </div>

          <div className={styles.alertas}>

            <div>
              🔧
              <span>
                Quarto 204 necessita de manutenção urgente.
                <small>10 min atrás</small>
              </span>
            </div>

            <div>
              📅
              <span>
                Nova reserva recebida via Booking.com.
                <small>25 min atrás</small>
              </span>
            </div>

            <div>
              ⏰
              <span>
                Check-out atrasado: Hóspede Ricardo Gomes.
                <small>1 hora atrás</small>
              </span>
            </div>

          </div>

          <button className={styles.clear}>
            Limpar notificações
          </button>

        </div>

      </section>

    </main>
  );
}