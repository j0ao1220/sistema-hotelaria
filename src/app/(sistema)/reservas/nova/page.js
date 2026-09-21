"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "../reservas.module.css";

export default function NovaReserva() {
  const router = useRouter();

const [reservaAtual] = useState(() => {
  if (typeof window === "undefined") {
    return {};
  }

  const dados = sessionStorage.getItem("reservaAtual");

  return dados ? JSON.parse(dados) : {};
});

const [hospedes] = useState(() => {
  if (typeof window === "undefined") {
    return [];
  }

  const dados = sessionStorage.getItem("hospedes");

  return dados ? JSON.parse(dados) : [];
});

const [hospede, setHospede] = useState(null);
const [buscaHospede, setBuscaHospede] = useState("");

const hospedesFiltrados = hospedes.filter((cliente) =>
  cliente.nome.toLowerCase().includes(buscaHospede.toLowerCase()) ||
  cliente.cpf.includes(buscaHospede) ||
  cliente.email.toLowerCase().includes(buscaHospede.toLowerCase())
);

const [checkIn, setCheckIn] = useState(
  reservaAtual.checkIn || ""
);

const [checkOut, setCheckOut] = useState(
  reservaAtual.checkOut || ""
);

const [adultos, setAdultos] = useState("1");
const [criancas, setCriancas] = useState("Nenhuma");
const [observacoes, setObservacoes] = useState("");

  function irParaDisponibilidade() {
    router.push("/disponibilidade");
  }

  function cadastrarHospede() {
    router.push("/hospedes/novo");
  }

  function avancarParaCalculo() {
  if (!hospede) {
    alert("Selecione um hóspede.");
    return;
  }

  const reservaAtualizada = {
    ...reservaAtual,
    hospede,
    checkIn,
    checkOut,
    adultos,
    criancas,
    observacoes
  };

  sessionStorage.setItem(
    "reservaAtual",
    JSON.stringify(reservaAtualizada)
  );

  router.push("/financeiro/calcular");
}

  return (
    <div className={styles.page}>

      {/* TOPO */}
      <header className={styles.topbar}>

        <div className={styles.hotel}>
          🏨 <strong>Hotel Grand Plaza</strong>
        </div>

        <div className={styles.search}>
          🔍 Buscar hóspedes, quartos...
        </div>

        <div className={styles.user}>
          🔔

          <div>
            <strong>Carlos Mendes</strong>
            <span>Gerente de Turno</span>
          </div>

          👤
        </div>

      </header>


      {/* CABEÇALHO */}
      <section className={styles.pageHeader}>

        <div className={styles.breadcrumb}>
          🏠　›　Reservas　›　<strong>Nova Reserva</strong>
        </div>

        <h1>Realizar Nova Reserva</h1>

        <p>
          Configure os detalhes da hospedagem e finalize o checkout administrativo.
        </p>

      </section>


      {/* CONTEÚDO */}
      <div className={styles.content}>

        <div className={styles.leftColumn}>

          {/* HÓSPEDE */}
          <section className={styles.card}>

            <div className={styles.sectionTitle}>

              <div className={styles.icon}>
                👤
              </div>

              <div>
                <h2>Dados do Hóspede</h2>

                <p>
                  Identifique o cliente ou realize um cadastro rápido.
                </p>
              </div>

            </div>


            <div className={styles.guestSearch}>

  {hospede ? (

    <div className={styles.guestSelected}>

      <div>
        <strong>
          {hospede.nome}
        </strong>

        <span>
          CPF: {hospede.cpf} • {hospede.email}
        </span>

        <small>
          Telefone: {hospede.telefone}
        </small>
      </div>

      <button
        type="button"
        onClick={() => {
          setHospede(null);
          setBuscaHospede("");
        }}
      >
        Alterar
      </button>

    </div>

  ) : (

    <>
      <div className={styles.searchGuestWrapper}>

        <input
          type="text"
          placeholder="Buscar por nome, CPF ou e-mail..."
          value={buscaHospede}
          onChange={(e) => setBuscaHospede(e.target.value)}
        />

        {buscaHospede && (
          <div className={styles.guestResults}>

            {hospedesFiltrados.length > 0 ? (

              hospedesFiltrados.map((cliente) => (

                <button
                  type="button"
                  key={cliente.id}
                  className={styles.guestOption}
                  onClick={() => {
                    setHospede(cliente);
                    setBuscaHospede("");
                  }}
                >
                  <strong>
                    {cliente.nome}
                  </strong>

                  <span>
                    CPF: {cliente.cpf}
                  </span>

                </button>

              ))

            ) : (

              <div className={styles.guestNoResult}>
                Nenhum hóspede encontrado.
              </div>

            )}

          </div>
        )}

      </div>

      <button
        type="button"
        className={styles.registerButton}
        onClick={cadastrarHospede}
      >
        ＋ Cadastrar Novo
      </button>
    </>

  )}

</div>

          </section>


          {/* PERÍODO */}
          <section className={styles.card}>

            <div className={styles.sectionTitle}>

              <div className={styles.icon}>
                📅
              </div>

              <div>
                <h2>Período e Ocupação</h2>

                <p>
                  Defina as datas da estadia e o número de hóspedes.
                </p>
              </div>

            </div>


            <div className={styles.fields}>

              <div>

                <label className={styles.fieldLabel}>
                  Check-in *
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
              />

              </div>


              <div>

                <label className={styles.fieldLabel}>
                  Check-out *
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />

              </div>


              <div>

                <label className={styles.fieldLabel}>
                  Adultos
                </label>

                <select
                  value={adultos}
                  onChange={(e) => setAdultos(e.target.value)}
                >

                  <option>1 Adulto</option>
                  <option>2 Adultos</option>
                  <option>3 Adultos</option>
                  <option>4 Adultos</option>

                </select>

              </div>


              <div>

                <label className={styles.fieldLabel}>
                  Crianças
                </label>

                <select  value={criancas}
                        onChange={(e) => setCriancas(e.target.value)}>

                  <option>Nenhuma</option>
                  <option>1 Criança</option>
                  <option>2 Crianças</option>
                  <option>3 Crianças</option>

                </select>

              </div>

            </div>

          </section>


          <section className={styles.card}>

  <div className={styles.sectionTitle}>

    <div className={styles.icon}>
      🛏️
    </div>

    <div>
      <h2>Quarto Selecionado</h2>

      <p>
        Unidade escolhida na consulta de disponibilidade.
      </p>
    </div>

  </div>

  <div className={styles.selectedRoom}>

    <div>
      <strong>
        Quarto #{reservaAtual.quarto?.numero}
      </strong>

      <span>
        {reservaAtual.quarto?.categoria}
      </span>
    </div>

    <strong>
      R$ {Number(reservaAtual.quarto?.valor || 0).toFixed(2)}
      / diária
    </strong>

  </div>

</section>


          {/* OBSERVAÇÕES */}
          <section className={styles.card}>

            <div className={styles.sectionTitle}>

              <div className={styles.icon}>
                📄
              </div>

              <div>
                <h2>Observações e Notas</h2>

                <p>
                  Informações adicionais relevantes para a estadia.
                </p>
              </div>

            </div>

            <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: Hóspede alérgico a glúten, solicita cama extra ou check-in tardio..."
            />

          </section>


{/* BOTÕES */}
          <div className={styles.actions}>

  <button
    type="button"
    className={styles.backButton}
    onClick={() => router.push("/disponibilidade")}
  >
    ← Voltar
  </button>

  <button
    type="button"
    className={styles.advanceButton}
    onClick={avancarParaCalculo}
  >
    Avançar para cálculo →
  </button>

</div>

        </div>

      </div>

    </div>
  );
}
<div className={styles.actions}>

  <button
    type="button"
    className={styles.backButton}
    onClick={() => router.push("/disponibilidade")}
  >
    ← Voltar
  </button>

  <button
    type="button"
    className={styles.advanceButton}
    onClick={() => {

      if (!hospede) {
        alert("Selecione um hóspede.");
        return;
      }

      const reserva = {
        ...reservaAtual,
        hospede,
        checkIn,
        checkOut,
        adultos,
        criancas,
        observacoes
      };

      sessionStorage.setItem(
        "reservaAtual",
        JSON.stringify(reserva)
      );

      router.push("/financeiro/calcular");
    }}
  >
    Avançar para cálculo →
  </button>

</div>