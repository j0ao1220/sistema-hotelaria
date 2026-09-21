"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./cadastrados.module.css";

export default function HospedesCadastrados() {
  const [hospedes] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const dados = sessionStorage.getItem("hospedes");

    return dados ? JSON.parse(dados) : [];
  });

  const [busca, setBusca] = useState("");

  const hospedesFiltrados = hospedes.filter((hospede) =>
    hospede.nome.toLowerCase().includes(busca.toLowerCase()) ||
    hospede.cpf.includes(busca) ||
    hospede.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.page}>

      {/* TOPO */}
      <header className={styles.topbar}>

        <div className={styles.hotel}>
          <span className={styles.hotelIcon}>🏨</span>
          <strong>Hotel Grand Plaza</strong>
          <span className={styles.topDivider}>
            / Central de Reservas
          </span>
        </div>

        <div className={styles.userArea}>
          <span className={styles.notification}>🔔</span>

          <div className={styles.userInfo}>
            <strong>Carlos Mendes</strong>
            <span>Gerente de Turno</span>
          </div>

          <div className={styles.userAvatar}>
            👤
          </div>

          <span className={styles.arrow}>⌄</span>
        </div>

      </header>


      {/* CABEÇALHO */}
      <section className={styles.hero}>

        <div className={styles.breadcrumb}>
          🏠
          <span>›</span>
          <span>Hóspedes</span>
          <span>›</span>
          <strong>Cadastrados</strong>
        </div>

        <h1>Hóspedes Cadastrados</h1>

        <p>
          Consulte os hóspedes cadastrados no sistema do hotel.
        </p>

      </section>


      {/* CONTEÚDO */}
      <main className={styles.content}>

        <section className={styles.card}>

          {/* CABEÇALHO DO CARD */}
          <div className={styles.cardHeader}>

            <div>
              <h2>Lista de Hóspedes</h2>

              <p>
                Visualize as informações dos hóspedes cadastrados
              </p>
            </div>

            <Link
              href="/hospedes/novo"
                className={styles.newButton}
            >
                  + Novo cadastro
            </Link>

          </div>


          {/* BUSCA */}
          <div className={styles.toolbar}>

            <div className={styles.searchBox}>
              <span>🔍</span>

              <input
                type="text"
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles.total}>
              Total: <strong>{hospedes.length}</strong>
            </div>

          </div>


          {/* LISTA */}
          <div className={styles.list}>

            {hospedesFiltrados.length === 0 ? (

              <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                  👤
                </div>

                <h3>
                  {hospedes.length === 0
                    ? "Nenhum hóspede cadastrado"
                    : "Nenhum resultado encontrado"}
                </h3>

                <p>
                  {hospedes.length === 0
                    ? "Cadastre um novo hóspede para começar."
                    : "Tente pesquisar utilizando outro nome, CPF ou e-mail."}
                </p>

              </div>

            ) : (

              hospedesFiltrados.map((hospede) => (

                <article
                  className={styles.hospede}
                  key={hospede.id}
                >

                  <div className={styles.avatar}>
                    👤
                  </div>


                  <div className={styles.info}>

                    <h3>{hospede.nome}</h3>

                    <div className={styles.details}>

                      <span>
                        <strong>CPF:</strong>{" "}
                        {hospede.cpf}
                      </span>

                      <span>
                        <strong>Telefone:</strong>{" "}
                        {hospede.telefone}
                      </span>

                      <span>
                        <strong>E-mail:</strong>{" "}
                        {hospede.email}
                      </span>

                    </div>

                  </div>


                  <button
                    type="button"
                    className={styles.detailsButton}
                  >
                    Ver dados
                  </button>

                </article>

              ))

            )}

          </div>

        </section>

      </main>


      {/* RODAPÉ */}
      <footer className={styles.footer}>
        HotelPro Admin v4.2.0 • Sistema de Gestão Hoteleira Profissional
      </footer>

    </div>
  );
}