"use client";
 
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { classeStatus, opcoesStatus, salvarStatus, useQuarto } from "../dados";
import styles from "./status.module.css";
 
/* ---------- Ícones (SVG inline) ---------- */
const Icon = ({ children, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
 
const icons = {
  alert: <Icon size={16}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></Icon>,
  chevronDown: <Icon size={12}><path d="m6 9 6 6 6-6" /></Icon>,
};
 
/* ---------- Datas ---------- */
const hojeMais = (dias) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
 
/* Status que exigem período e motivo */
const exigePeriodo = (status) => ["Manutenção", "Bloqueado", "Reservado"].includes(status);
 
/* ---------- Página ---------- */
export default function AlterarStatusPage() {
  const { numero } = useParams();
  const quarto = useQuarto(numero);
 
  return <FormularioStatus key={quarto ? quarto.numero : "nao-encontrado"} quarto={quarto} numero={numero} />;
}
 
function FormularioStatus({ quarto, numero }) {
  const router = useRouter();
  const [novoStatus, setNovoStatus] = useState("Manutenção");
  const [dataInicial, setDataInicial] = useState(() => hojeMais(0));
  const [dataFim, setDataFim] = useState(() => hojeMais(2));
  const [motivo, setMotivo] = useState("");
 
  const voltar = () => router.push(`/quartos/${numero}`);
 
  /* Hóspede atual: quem está com status "Hospedado" no histórico */
  const hospedeAtual = quarto?.historico.find((h) => h.status === "Hospedado")?.hospede;
  const obrigatorio = exigePeriodo(novoStatus);
 
  const salvar = (e) => {
    e.preventDefault();
 
    if (obrigatorio && dataFim < dataInicial) {
      alert("A data de término precisa ser igual ou posterior à data inicial.");
      return;
    }
 
    salvarStatus(quarto.numero, {
      status: novoStatus,
      dataInicial,
      dataFim,
      motivo,
      alteradoEm: new Date().toISOString(),
    });
 
    router.push(`/quartos/${quarto.numero}`);
  };
 
  return (
    <>
      {/* BARRA SUPERIOR */}
      <header className={styles.topbar}>
        <span className={styles.topbarTitle}>Hotel Grand Plaza / Central de Reservas</span>
        <div className={styles.topbarUser}>
          <span>Admin Panel</span>
          <div className={styles.avatar} />
        </div>
      </header>
 
      {/* CABEÇALHO */}
      <section className={styles.banner}>
        <span className={styles.breadcrumb}>Quartos &gt; Controle Operacional</span>
        <h1 className={styles.bannerTitle}>Alterar Status do Quarto</h1>
        <p className={styles.bannerText}>
          Modifique temporariamente ou definitivamente a condição operacional da unidade selecionada.
        </p>
      </section>
 
      <div className={styles.content}>
        {!quarto ? (
          <section className={styles.card}>
            <p className={styles.notFound}>O quarto {numero} não foi encontrado.</p>
            <button type="button" className={styles.saveButton} onClick={() => router.push("/quartos")}>
              Voltar para Quartos
            </button>
          </section>
        ) : (
          <form className={styles.card} onSubmit={salvar}>
            <h2 className={styles.cardTitle}>
              <span className={styles.cardIcon}>{icons.alert}</span>
              Controle de Estado do Quarto {quarto.numero}
            </h2>
 
            {/* STATUS ATUAL */}
            <div className={styles.currentStatus}>
              Status Atual:{" "}
              <strong className={styles[classeStatus[quarto.status]]}>{quarto.status}</strong>
              {hospedeAtual && quarto.status === "Ocupado" && ` (Hóspede: ${hospedeAtual})`}
            </div>
 
            {/* NOVO STATUS */}
            <div className={styles.field}>
              <label htmlFor="novoStatus">Selecione o Novo Status *</label>
              <div className={styles.selectBox}>
                <select
                  id="novoStatus"
                  value={novoStatus}
                  onChange={(e) => setNovoStatus(e.target.value)}
                  required
                >
                  {opcoesStatus.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.rotulo}
                    </option>
                  ))}
                </select>
                <span className={styles.selectIcon}>{icons.chevronDown}</span>
              </div>
            </div>
 
            {/* DATAS */}
            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="dataInicial">Data Inicial{obrigatorio && " *"}</label>
                <input
                  id="dataInicial"
                  type="date"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                  required={obrigatorio}
                />
              </div>
 
              <div className={styles.field}>
                <label htmlFor="dataFim">Data Estimada de Término{obrigatorio && " *"}</label>
                <input
                  id="dataFim"
                  type="date"
                  min={dataInicial || undefined}
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  required={obrigatorio}
                />
              </div>
            </div>
 
            {/* MOTIVO */}
            <div className={styles.field}>
              <label htmlFor="motivo">Motivo / Observação{obrigatorio && " *"}</label>
              <textarea
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Manutenção preventiva do ar-condicionado e troca de vedação do banheiro principal..."
                required={obrigatorio}
              />
            </div>
 
            {/* BOTÕES */}
            <div className={styles.actions}>
              <button type="submit" className={styles.saveButton}>
                Salvar Novo Status
              </button>
              <button type="button" className={styles.cancelButton} onClick={voltar}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}