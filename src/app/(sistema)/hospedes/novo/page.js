"use client";

import { useRouter } from "next/navigation";
import styles from "./hospedes.module.css";

export default function CadastroHospede() {
  const router = useRouter();

 const salvarCadastro = () => {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const novoHospede = {
    id: Date.now(),
    nome,
    cpf,
    email,
    telefone,
  };

  const hospedesSalvos =
    JSON.parse(sessionStorage.getItem("hospedes")) || [];

  hospedesSalvos.push(novoHospede);

  sessionStorage.setItem(
    "hospedes",
    JSON.stringify(hospedesSalvos)
  );

  router.push("/hospedes");
};

  return (
    <div className={styles.page}>

      {/* TOPO */}
      <header className={styles.topbar}>

        <div className={styles.hotel}>
          <span className={styles.hotelIcon}>🏨</span>
          <strong>Hotel Grand Plaza</strong>
          <span className={styles.topDivider}>/ Central de Reservas</span>
        </div>

        <div className={styles.search}>
          <span>🔍</span>
          <span>Buscar hóspedes, quartos...</span>
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
          <span>Reserva</span>
          <span>›</span>
          <span>Nova Reserva</span>
          <span>›</span>
          <strong>Hóspedes</strong>
        </div>

        <h1>Novo Cadastro de Hóspede</h1>

        <p>
          Preencha as informações detalhadas para o check-in do novo cliente.
        </p>

      </section>


      {/* CONTEÚDO PRINCIPAL */}
      <div className={styles.content}>

        {/* COLUNA PRINCIPAL */}
        <div className={styles.mainColumn}>

          {/* DADOS PESSOAIS */}
          <section className={styles.card}>

            <div className={styles.cardHeader}>

              <div className={styles.sectionIcon}>
                👤
              </div>

              <div>
                <h2>Dados Pessoais</h2>

                <p>
                  Informações de identificação básica do hóspede
                </p>
              </div>

            </div>


            <div className={styles.formContent}>

              <div className={`${styles.field} ${styles.largeField}`}>
                <label className={styles.label}>
                  Nome Completo <span>*</span>
                </label>

                <input
                  id="nome"
                  className={styles.input}
                  type="text"
                  placeholder="Ex: João Silva de Oliveira"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  CPF <span>*</span>
                </label>

                <input
                id="cpf"
                  className={styles.input}
                  type="text"
                  placeholder="000.000.000-00"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Data de Nascimento
                </label>

                <input
                  className={styles.input}
                  type="date"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Gênero
                </label>

                <select className={styles.input}>
                  <option>Prefiro não informar</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                </select>
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Nacionalidade
                </label>

                <input
                  className={styles.input}
                  type="text"
                  defaultValue="Brasileira"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  E-mail <span>*</span>
                </label>

                <input
                  id="email"
                  className={styles.input}
                  type="email"
                  placeholder="cliente@email.com"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Telefone <span>*</span>
                </label>

                <input
                  id="telefone"
                  className={styles.input}
                  type="tel"
                  placeholder="(00) 00000-0000"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Documento de Identificação
                  <span className={styles.labelSecondLine}>
                    (RG/Passaporte)
                  </span>
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Número do documento"
                />
              </div>

            </div>

          </section>


          {/* ENDEREÇO */}
          <section className={styles.card}>

            <div className={styles.cardHeader}>

              <div className={styles.sectionIcon}>
                📍
              </div>

              <div>
                <h2>Endereço</h2>

                <p>
                  Localização da residência do hóspede
                </p>
              </div>

            </div>


            <div className={styles.formContent}>

              <div className={styles.field}>
                <label className={styles.label}>
                  CEP
                </label>

                <div className={styles.inputWithButton}>

                  <input
                    className={styles.input}
                    type="text"
                    placeholder="00000-000"
                  />

                  <button
                    type="button"
                    className={styles.searchCepButton}
                  >
                    🔍
                  </button>

                </div>
              </div>


              <div className={`${styles.field} ${styles.addressStreet}`}>
                <label className={styles.label}>
                  Rua/Avenida
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Logradouro"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Número
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="123"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Complemento
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Apto, Bloco, etc."
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Bairro
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Nome do bairro"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Cidade
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Cidade"
                />
              </div>


              <div className={styles.field}>
                <label className={styles.label}>
                  Estado
                </label>

                <select className={styles.input}>
                  <option>UF</option>
                  <option>RO</option>
                  <option>AC</option>
                  <option>AM</option>
                  <option>MT</option>
                  <option>SP</option>
                  <option>RJ</option>
                </select>
              </div>

            </div>

          </section>


          {/* OBSERVAÇÕES */}
          <section className={styles.card}>

            <div className={styles.cardHeader}>

              <div className={styles.sectionIcon}>
                📄
              </div>

              <div>
                <h2>Observações</h2>

                <p>
                  Notas internas, preferências ou restrições alimentares
                </p>
              </div>

            </div>


            <div className={styles.observationContent}>

              <label className={styles.label}>
                Notas Adicionais
              </label>

              <textarea
                className={styles.textarea}
                placeholder="Insira aqui informações relevantes como alergias, preferências de quarto ou histórico do cliente..."
              />

            </div>

          </section>


          {/* BOTÕES */}
          <div className={styles.actions}>

            <button
              type="button"
              className={styles.cancelButton}
            >
              × &nbsp; Cancelar
            </button>


            <button
              type="button"
              className={styles.clearButton}
            >
              ♢ &nbsp; Limpar formulário
            </button>


            <button
              type="button"
              className={styles.saveButton}
              onClick={salvarCadastro}
            >
              💾 &nbsp; Salvar cadastro
            </button>

          </div>

        </div>


        {/* COLUNA LATERAL */}
        <aside className={styles.sideColumn}>

          {/* FOTO DO PERFIL */}
          <section className={styles.profileCard}>

            <h2>Foto do Perfil</h2>

            <div className={styles.profilePhoto}>
              👤

              <div className={styles.camera}>
                📷
              </div>
            </div>

            <p className={styles.profileHelp}>
              Clique no ícone para capturar ou fazer upload da foto do documento original.
            </p>

            <div className={styles.newClient}>
              ☆ CLIENTE NOVO
            </div>

          </section>


          {/* RESUMO DO SISTEMA */}
          <section className={styles.systemCard}>

            <h3>
              ⓘ &nbsp;Resumo do Sistema
            </h3>


            <div className={styles.systemRow}>
              <span>Status do Cadastro</span>
              <strong>Incompleto</strong>
            </div>


            <div className={styles.systemRow}>
              <span>Data de Início</span>
              <strong>24/05/2024</strong>
            </div>


            <div className={styles.systemRow}>
              <span>Operador</span>
              <strong>C. Mendes</strong>
            </div>


            <div className={styles.systemRow}>
              <span>Unidade</span>
              <strong>Grand Plaza</strong>
            </div>


            <p className={styles.systemNotice}>
              * Campos marcados com asterisco são obrigatórios para emissão da
              Ficha Nacional de Registro de Hóspedes (FNRH).
            </p>

          </section>

        </aside>

      </div>


      {/* RODAPÉ */}
      <footer className={styles.footer}>
        HotelPro Admin v4.2.0 • Sistema de Gestão Hoteleira Profissional
      </footer>

    </div>
  );
}