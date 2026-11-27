"use client";

import { useEffect, useMemo, useState } from "react";

const dados = [
  { categoria: "Standard", disponiveis: 48, ocupados: 41, receita: 158420 },
  { categoria: "Executivo", disponiveis: 36, ocupados: 27, receita: 128780 },
  { categoria: "Luxo", disponiveis: 24, ocupados: 18, receita: 92340 },
  { categoria: "SuÃ­te", disponiveis: 12, ocupados: 8, receita: 35160 },
];

const evolucao = [
  { mes: "Abr", valor: 68 },
  { mes: "Mai", valor: 72 },
  { mes: "Jun", valor: 70 },
  { mes: "Jul", valor: 80 },
  { mes: "Ago", valor: 77 },
  { mes: "Set", valor: 85 },
];

const documentos = [
  {
    nome: "RelatÃ³rio operacional mensal",
    tipo: "OperaÃ§Ãµes",
    data: "30 set. 2026",
    status: "Publicado",
    codigo: "DOC-2026-094",
  },
  {
    nome: "Auditoria de ocupaÃ§Ã£o",
    tipo: "Auditoria",
    data: "28 set. 2026",
    status: "Em revisÃ£o",
    codigo: "DOC-2026-091",
  },
  {
    nome: "Resumo de atendimento ao hÃ³spede",
    tipo: "ExperiÃªncia",
    data: "25 set. 2026",
    status: "Publicado",
    codigo: "DOC-2026-086",
  },
  {
    nome: "Plano de manutenÃ§Ã£o preventiva",
    tipo: "ManutenÃ§Ã£o",
    data: "22 set. 2026",
    status: "Publicado",
    codigo: "DOC-2026-080",
  },
];

const transacoes = [
  {
    descricao: "Hospedagem â€” Standard",
    referencia: "RES-8431",
    data: "30 set. 2026",
    tipo: "Receita",
    valor: 18450,
  },
  {
    descricao: "Hospedagem â€” Executivo",
    referencia: "RES-8418",
    data: "29 set. 2026",
    tipo: "Receita",
    valor: 12780,
  },
  {
    descricao: "ManutenÃ§Ã£o preventiva",
    referencia: "DES-2206",
    data: "28 set. 2026",
    tipo: "Despesa",
    valor: -3250,
  },
  {
    descricao: "Hospedagem â€” SuÃ­te",
    referencia: "RES-8399",
    data: "27 set. 2026",
    tipo: "Receita",
    valor: 8960,
  },
];

const abas = [
  { nome: "VisÃ£o geral", icone: "â–¦" },
  { nome: "DocumentaÃ§Ã£o", icone: "â–¤" },
  { nome: "Financeiro", icone: "â—ˆ" },
  { nome: "Acompanhamento", icone: "â—·" },
];

export default function Home() {
  const [aba, setAba] = useState("VisÃ£o geral");
  const [periodo, setPeriodo] = useState("Setembro 2026");
  const [categoria, setCategoria] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [indicadores, setIndicadores] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erroIndicadores, setErroIndicadores] = useState("");

  useEffect(() => {
    async function buscarIndicadores() {
      try {
        const resposta = await fetch("/api/relatorios/indicadores");

        if (!resposta.ok) {
          throw new Error("Falha ao consultar os indicadores.");
        }

        const resultado = await resposta.json();

        if (resultado.status !== "sucesso") {
          throw new Error("A API nÃ£o conseguiu retornar os indicadores.");
        }

        setIndicadores(resultado.dados);
      } catch (erro) {
        console.error("Erro ao carregar indicadores:", erro);
        setErroIndicadores("NÃ£o foi possÃ­vel carregar os indicadores.");
      } finally {
        setCarregando(false);
      }
    }

    buscarIndicadores();
  }, []);


  const [acompanhamento, setAcompanhamento] =
    useState(null);
  const [carregandoAcompanhamento, setCarregandoAcompanhamento] =
    useState(false);
  const [erroAcompanhamento, setErroAcompanhamento] = useState("");
  const [filtroTipoAcompanhamento, setFiltroTipoAcompanhamento] =
    useState("Todos");
  const [filtroStatusAcompanhamento, setFiltroStatusAcompanhamento] =
    useState("Todos");
  const [buscaAcompanhamento, setBuscaAcompanhamento] = useState("");
  const [atualizacaoAcompanhamento, setAtualizacaoAcompanhamento] =
    useState(0);

  useEffect(() => {
    if (aba !== "Acompanhamento") return;

    let ativo = true;

    async function buscarAcompanhamento() {
      setCarregandoAcompanhamento(true);
      setErroAcompanhamento("");

      try {
        const resposta = await fetch("/api/relatorios/acompanhamento", {
          cache: "no-store",
        });

        if (!resposta.ok) {
          throw new Error(
            resposta.status === 404
              ? "A rota de acompanhamento nÃ£o foi encontrada (HTTP 404). Confira o caminho do arquivo route.ts."
              : "NÃ£o foi possÃ­vel consultar os dados de acompanhamento."
          );
        }

        const resultado = await resposta.json();

        if (resultado.status !== "sucesso" || !resultado.dados) {
          throw new Error(
            resultado.mensagem || "A API retornou uma resposta invÃ¡lida."
          );
        }

        if (ativo) {
          setAcompanhamento({
            solicitacoes: resultado.dados.solicitacoes ?? [],
            reclamacoes: resultado.dados.reclamacoes ?? [],
            ocorrencias: resultado.dados.ocorrencias ?? [],
            sincronizacoes: resultado.dados.sincronizacoes ?? [],
          });
        }
      } catch (erro) {
        console.error("Erro ao carregar acompanhamento:", erro);
        if (ativo) {
          setErroAcompanhamento(
            erro instanceof Error
              ? erro.message
              : "Erro inesperado ao carregar acompanhamento."
          );
        }
      } finally {
        if (ativo) setCarregandoAcompanhamento(false);
      }
    }

    buscarAcompanhamento();

    return () => {
      ativo = false;
    };
  }, [aba, atualizacaoAcompanhamento]);

  const registrosAcompanhamento = useMemo(() => {
    if (!acompanhamento) return [];

    const converter = (
      itens,
      tipo,
      campoData
    ) =>
      itens.map((item) => ({
        id: item.id,
        tipo,
        categoria: item.categoria || item.tipo || "NÃ£o informado",
        descricao: item.descricao || "Sem descriÃ§Ã£o",
        status: item.status || "NÃ£o informado",
        prioridade: item.prioridade || item.gravidade || "NÃ£o definida",
        data: item[campoData] || "",
        origem: item.origemSistema || "Sistema nÃ£o informado",
        quarto: item.quarto?.codigo || "â€”",
      }));

    return [
      ...converter(acompanhamento.solicitacoes, "SolicitaÃ§Ã£o", "abertaEm"),
      ...converter(acompanhamento.reclamacoes, "ReclamaÃ§Ã£o", "registradaEm"),
      ...converter(acompanhamento.ocorrencias, "OcorrÃªncia", "ocorridaEm"),
    ].sort(
      (a, b) =>
        new Date(b.data).getTime() - new Date(a.data).getTime()
    );
  }, [acompanhamento]);

  const registrosAcompanhamentoFiltrados = useMemo(() => {
    return registrosAcompanhamento.filter((item) => {
      const correspondeTipo =
        filtroTipoAcompanhamento === "Todos" ||
        item.tipo === filtroTipoAcompanhamento;
      const correspondeStatus =
        filtroStatusAcompanhamento === "Todos" ||
        item.status.toLowerCase() === filtroStatusAcompanhamento.toLowerCase();
      const texto = [
        item.tipo,
        item.categoria,
        item.descricao,
        item.status,
        item.prioridade,
        item.origem,
        item.quarto,
      ]
        .join(" ")
        .toLowerCase();
      return (
        correspondeTipo &&
        correspondeStatus &&
        texto.includes(buscaAcompanhamento.toLowerCase())
      );
    });
  }, [
    registrosAcompanhamento,
    filtroTipoAcompanhamento,
    filtroStatusAcompanhamento,
    buscaAcompanhamento,
  ]);

  const totalSolicitacoesAcompanhamento =
    acompanhamento?.solicitacoes.length ?? 0;
  const totalReclamacoesAcompanhamento =
    acompanhamento?.reclamacoes.length ?? 0;
  const totalOcorrenciasAcompanhamento =
    acompanhamento?.ocorrencias.length ?? 0;
  const totalRegistrosAcompanhamento =
    totalSolicitacoesAcompanhamento +
    totalReclamacoesAcompanhamento +
    totalOcorrenciasAcompanhamento;

  const registrosPendentesAcompanhamento = registrosAcompanhamento.filter(
    (item) => {
      const status = item.status.toLowerCase();
      return (
        status.includes("abert") ||
        status.includes("pend") ||
        status.includes("andamento") ||
        status.includes("aguard")
      );
    }
  ).length;

  function formatarDataAcompanhamento(data) {
    if (!data) return "â€”";
    const dataConvertida = new Date(data);
    if (Number.isNaN(dataConvertida.getTime())) return "â€”";
    return dataConvertida.toLocaleDateString("pt-BR");
  }


  const totalDisponiveis = dados.reduce(
    (total, item) => total + item.disponiveis,
    0
  );

  const totalOcupados = dados.reduce(
    (total, item) => total + item.ocupados,
    0
  );

  const receitaTotal = dados.reduce(
    (total, item) => total + item.receita,
    0
  );

  const ocupacao = (totalOcupados / totalDisponiveis) * 100;
  const quartosLivres = totalDisponiveis - totalOcupados;
  const diariaMedia = receitaTotal / totalOcupados;

  const dadosFiltrados = useMemo(
    () =>
      dados.filter((item) => {
        const correspondeCategoria =
          categoria === "Todas" || item.categoria === categoria;

        return (
          correspondeCategoria &&
          item.categoria.toLowerCase().includes(busca.toLowerCase())
        );
      }),
    [categoria, busca]
  );

  const documentosFiltrados = useMemo(
    () =>
      documentos.filter((item) =>
        `${item.nome} ${item.tipo} ${item.codigo}`
          .toLowerCase()
          .includes(busca.toLowerCase())
      ),
    [busca]
  );

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function exportarCSV() {
    const cabecalho = [
      "Categoria",
      "DisponÃ­veis",
      "Ocupados",
      "OcupaÃ§Ã£o",
      "Receita",
    ];

    const linhas = dadosFiltrados.map((item) => [
      item.categoria,
      item.disponiveis,
      item.ocupados,
      `${((item.ocupados / item.disponiveis) * 100).toFixed(1)}%`,
      item.receita,
    ]);

    const conteudo = [
      cabecalho.join(";"),
      ...linhas.map((linha) => linha.join(";")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + conteudo], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "relatorio-grand-plaza.csv";
    link.click();

    URL.revokeObjectURL(url);

    setMensagem("Arquivo CSV exportado com sucesso.");
  }

  const cards = [
    {
      titulo: "Taxa de ocupaÃ§Ã£o",
      valor: carregando
        ? "Carregando..."
        : `${(indicadores?.taxaOcupacao ?? 0)
            .toFixed(1)
            .replace(".", ",")}%`,
      detalhe: "Calculado com dados do banco",
      icone: "â–¦",
    },
    {
      titulo: "Quartos ocupados",
      valor: carregando
        ? "Carregando..."
        : `${indicadores?.quartosOcupados ?? 0} / ${
            indicadores?.totalQuartos ?? 0
          }`,
      detalhe: "Quartos ativos e ocupados",
      icone: "â–£",
    },
    {
      titulo: "DiÃ¡ria mÃ©dia",
      valor: "Aguardando dados",
      detalhe: "IntegraÃ§Ã£o financeira pendente",
      icone: "R$",
    },
    {
      titulo: "Receita de hospedagem",
      valor: "Aguardando dados",
      detalhe: "IntegraÃ§Ã£o financeira pendente",
      icone: "â†—",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-800"><section className="min-w-0 flex-1 px-5 py-6 md:px-9 md:py-8">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs text-slate-400">
              Workspace <span className="mx-2">/</span>
              <span className="text-cyan-700">RelatÃ³rios</span>
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Central de relatÃ³rios
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Indicadores, documentaÃ§Ã£o e inteligÃªncia financeira em um sÃ³
              lugar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Administrador</p>
              <p className="text-xs text-slate-400">Grand Plaza Â· Hotel</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              AD
            </div>
          </div>
        </header>

        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm">
          <div className="grid min-w-0 flex-1 grid-cols-4 gap-1">
            {abas.map((item) => (
              <button
                key={item.nome}
                onClick={() => {
                  setAba(item.nome);
                  setMensagem("");
                  setBusca("");
                }}
                className={`flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2 py-2.5 text-sm font-semibold transition ${
                  aba === item.nome
                    ? "bg-[#101b2d] text-white shadow"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{item.icone}</span>
                {item.nome}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 border-l border-slate-100 pl-4 pr-2">
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:inline">
              Live data
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-500">Atualizado agora</span>
          </div>
        </div>

        {aba === "VisÃ£o geral" && (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  Performance operacional
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Resumo executivo
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option>Setembro 2026</option>
                  <option>Agosto 2026</option>
                  <option>Julho 2026</option>
                  <option>Junho 2026</option>
                </select>

                <button
                  onClick={exportarCSV}
                  className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  â†“ Exportar CSV
                </button>
              </div>
            </div>

            {erroIndicadores && (
              <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {erroIndicadores}
              </p>
            )}

            {mensagem && (
              <p
                role="status"
                className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                {mensagem}
              </p>
            )}

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {cards.map((item) => (
                <article
                  key={item.titulo}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">
                      {item.titulo}
                    </p>

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-sm font-bold text-cyan-700">
                      {item.icone}
                    </span>
                  </div>

                  <p className="text-2xl font-bold tracking-tight text-slate-900">
                    {item.valor}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {item.detalhe}
                  </p>
                </article>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-7 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      EvoluÃ§Ã£o da ocupaÃ§Ã£o
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Percentual mensal Â· Ãºltimos 6 meses
                    </p>
                  </div>

                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    +17,6%
                  </span>
                </div>

                <div className="flex h-48 items-end justify-around gap-3 border-b border-slate-100 pb-2">
                  {evolucao.map((item) => (
                    <div
                      key={item.mes}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-[10px] font-semibold text-slate-500">
                        {item.valor}%
                      </span>

                      <div
                        className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-400 transition-all hover:brightness-110"
                        style={{ height: `${item.valor * 1.45}px` }}
                      />

                      <span className="text-[10px] text-slate-400">
                        {item.mes}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-7">
                  <h3 className="font-bold text-slate-900">
                    OcupaÃ§Ã£o por categoria
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    DistribuiÃ§Ã£o de quartos ocupados
                  </p>
                </div>

                <div className="space-y-5">
                  {dados.map((item) => {
                    const percentual =
                      (item.ocupados / item.disponiveis) * 100;

                    return (
                      <div key={item.categoria}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="font-medium text-slate-600">
                            {item.categoria}
                          </span>
                          <span className="font-bold text-slate-800">
                            {percentual.toFixed(1).replace(".", ",")}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-400"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </div>

            <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Desempenho por categoria
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Detalhamento da operaÃ§Ã£o e da receita
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option>Todas</option>
                    <option>Standard</option>
                    <option>Executivo</option>
                    <option>Luxo</option>
                    <option>SuÃ­te</option>
                  </select>

                  <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Pesquisar categoria..."
                    className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="px-5 py-3">Categoria</th>
                      <th className="px-5 py-3">DisponÃ­veis</th>
                      <th className="px-5 py-3">Ocupados</th>
                      <th className="px-5 py-3">OcupaÃ§Ã£o</th>
                      <th className="px-5 py-3">Receita</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dadosFiltrados.map((item) => (
                      <tr
                        key={item.categoria}
                        className="border-t border-slate-100 text-sm hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-semibold">
                          {item.categoria}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {item.disponiveis}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {item.ocupados}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
                            {(
                              (item.ocupados / item.disponiveis) *
                              100
                            )
                              .toFixed(1)
                              .replace(".", ",")}
                            %
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          {formatarMoeda(item.receita)}
                        </td>
                      </tr>
                    ))}

                    {dadosFiltrados.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-8 text-center text-sm text-slate-400"
                        >
                          Nenhuma categoria encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </>
        )}

        {aba === "DocumentaÃ§Ã£o" && (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  GovernanÃ§a e conformidade
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Central de documentaÃ§Ã£o
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  RelatÃ³rios, auditorias e documentos operacionais do hotel.
                </p>
              </div>

              <button
                onClick={() =>
                  setMensagem(
                    "Novo documento: fluxo de cadastro disponÃ­vel para integraÃ§Ã£o com o sistema documental."
                  )
                }
                className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                ï¼‹ Novo documento
              </button>
            </div>

            {mensagem && (
              <p
                role="status"
                className="mb-4 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800"
              >
                {mensagem}
              </p>
            )}

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Documentos no acervo", value: "128", icon: "â–¤" },
                { label: "Publicados", value: "116", icon: "âœ“" },
                { label: "Em revisÃ£o", value: "12", icon: "â—·" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 font-bold text-cyan-700">
                    {x.icon}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {x.value}
                    </p>
                    <p className="text-xs text-slate-500">{x.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <div>
                  <h4 className="font-bold">Biblioteca de documentos</h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Acesso centralizado aos registros do empreendimento
                  </p>
                </div>

                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar documento..."
                  className="w-56 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="px-5 py-3">Documento</th>
                      <th className="px-5 py-3">Categoria</th>
                      <th className="px-5 py-3">Atualizado</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">ReferÃªncia</th>
                    </tr>
                  </thead>

                  <tbody>
                    {documentosFiltrados.map((d) => (
                      <tr
                        key={d.codigo}
                        className="border-t border-slate-100 text-sm hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-semibold">{d.nome}</td>
                        <td className="px-5 py-4 text-slate-500">{d.tipo}</td>
                        <td className="px-5 py-4 text-slate-500">{d.data}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              d.status === "Publicado"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-400">
                          {d.codigo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {documentosFiltrados.length === 0 && (
                  <p className="p-8 text-center text-sm text-slate-400">
                    Nenhum documento encontrado.
                  </p>
                )}
              </div>
            </article>
          </>
        )}

        {aba === "Financeiro" && (
          <>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Desempenho econÃ´mico
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Painel financeiro
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Acompanhamento de receitas, despesas e resultado operacional.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  titulo: "Receita bruta",
                  valor: formatarMoeda(receitaTotal),
                  subtitulo: "Dados demonstrativos",
                  icone: "â†—",
                },
                {
                  titulo: "Despesas registradas",
                  valor: formatarMoeda(48260),
                  subtitulo: "Dados demonstrativos",
                  icone: "â†˜",
                },
                {
                  titulo: "Resultado operacional",
                  valor: formatarMoeda(receitaTotal - 48260),
                  subtitulo: "Dados demonstrativos",
                  icone: "â—ˆ",
                },
                {
                  titulo: "Margem operacional",
                  valor: `${(
                    ((receitaTotal - 48260) / receitaTotal) *
                    100
                  )
                    .toFixed(1)
                    .replace(".", ",")}%`,
                  subtitulo: "Dados demonstrativos",
                  icone: "%",
                },
              ].map((x) => (
                <article
                  key={x.titulo}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex justify-between">
                    <p className="text-xs text-slate-500">{x.titulo}</p>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-sm font-bold text-cyan-700">
                      {x.icone}
                    </span>
                  </div>

                  <p className="text-xl font-bold text-slate-900">{x.valor}</p>
                  <p className="mt-2 text-xs text-slate-400">{x.subtitulo}</p>
                </article>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm xl:col-span-2">
                <div className="mb-7">
                  <h4 className="font-bold">Receita mensal</h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Ãndice relativo de desempenho Â· Dados demonstrativos
                  </p>
                </div>

                <div className="flex h-52 items-end justify-around gap-3 border-b border-slate-100 pb-2">
                  {evolucao.map((item) => (
                    <div
                      key={item.mes}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-[10px] text-slate-400">
                        {item.valor}%
                      </span>

                      <div
                        className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-indigo-700 to-cyan-400"
                        style={{ height: `${item.valor * 1.5}px` }}
                      />

                      <span className="text-[10px] text-slate-400">
                        {item.mes}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-[#101b2d] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Resumo do perÃ­odo
                </p>

                <h4 className="mt-2 text-lg font-bold">{periodo}</h4>

                <div className="my-6 h-px bg-white/10" />

                <p className="text-xs text-slate-400">
                  Receita por quarto ocupado
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {formatarMoeda(diariaMedia)}
                </p>

                <p className="mt-6 text-xs leading-relaxed text-slate-400">
                  Valores demonstrativos. A integraÃ§Ã£o com os lanÃ§amentos
                  financeiros do banco de dados serÃ¡ realizada na prÃ³xima
                  etapa.
                </p>
              </article>
            </div>

            <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <h4 className="font-bold">MovimentaÃ§Ãµes recentes</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Dados demonstrativos de receitas e despesas
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="px-5 py-3">DescriÃ§Ã£o</th>
                      <th className="px-5 py-3">ReferÃªncia</th>
                      <th className="px-5 py-3">Data</th>
                      <th className="px-5 py-3">Tipo</th>
                      <th className="px-5 py-3">Valor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transacoes.map((t) => (
                      <tr
                        key={t.referencia}
                        className="border-t border-slate-100 text-sm"
                      >
                        <td className="px-5 py-4 font-semibold">
                          {t.descricao}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-400">
                          {t.referencia}
                        </td>
                        <td className="px-5 py-4 text-slate-500">{t.data}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              t.tipo === "Receita"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {t.tipo}
                          </span>
                        </td>
                        <td
                          className={`px-5 py-4 font-semibold ${
                            t.valor > 0 
                              ? "text-emerald-700"
                              : "text-rose-600"
                          }`}
                        >
                          {formatarMoeda(t.valor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </>
        )}


        {aba === "Acompanhamento" && (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  OperaÃ§Ã£o e experiÃªncia do hÃ³spede
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Acompanhamento operacional
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  SolicitaÃ§Ãµes, reclamaÃ§Ãµes, ocorrÃªncias e sincronizaÃ§Ãµes recebidas dos sistemas do hotel.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAtualizacaoAcompanhamento((valor) => valor + 1)}
                  disabled={carregandoAcompanhamento}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  {carregandoAcompanhamento ? "Atualizando..." : "â†» Atualizar"}
                </button>
              </div>
            </div>

            {erroAcompanhamento && (
              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <p className="font-semibold">NÃ£o foi possÃ­vel carregar o acompanhamento.</p>
                <p className="mt-1">{erroAcompanhamento}</p>
                <p className="mt-2 text-xs">
                  Verifique se o arquivo da API estÃ¡ em
                  {" "}<code className="rounded bg-amber-100 px-1">src/app/api/relatorios/acompanhamento/route.ts</code>
                  {" "}e se o servidor Next.js foi reiniciado apÃ³s a criaÃ§Ã£o da rota.
                </p>
              </div>
            )}

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  titulo: "SolicitaÃ§Ãµes",
                  valor: carregandoAcompanhamento ? "..." : totalSolicitacoesAcompanhamento,
                  detalhe: "Registros recebidos",
                  icone: "â—·",
                },
                {
                  titulo: "ReclamaÃ§Ãµes",
                  valor: carregandoAcompanhamento ? "..." : totalReclamacoesAcompanhamento,
                  detalhe: "Registros recebidos",
                  icone: "âš‘",
                },                    
                {                      
                  titulo: "OcorrÃªncias",        
                  valor: carregandoAcompanhamento ? "..." : totalOcorrenciasAcompanhamento,
                  detalhe: "Registros recebidos",       
                  icone: "!",
                },          
                {   
                  titulo: "PendÃªncias",
                  valor: carregandoAcompanhamento ? "..." : registrosPendentesAcompanhamento,
                  detalhe: "Abertas, aguardando ou em andamento",
                  icone: "âŒ›",
                },                         
              ].map((item) => (
                <article                        
                  key={item.titulo}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >                           
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">{item.titulo}</p>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-sm font-bold text-cyan-700">
                      {item.icone}
                    </span>
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900">{item.valor}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.detalhe}</p>
                </article>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <h4 className="font-bold text-slate-900">Volume por tipo</h4>
                <p className="mt-1 text-xs text-slate-400">Quantidade de registros no banco</p>
                <div className="mt-6 space-y-5">
                  {[
                    { nome: "SolicitaÃ§Ãµes", total: totalSolicitacoesAcompanhamento },
                    { nome: "ReclamaÃ§Ãµes", total: totalReclamacoesAcompanhamento },
                    { nome: "OcorrÃªncias", total: totalOcorrenciasAcompanhamento },
                  ].map((item) => {
                    const percentual =
                      totalRegistrosAcompanhamento > 0
                        ? (item.total / totalRegistrosAcompanhamento) * 100
                        : 0;
                    return (
                      <div key={item.nome}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="font-medium text-slate-600">{item.nome}</span>
                          <span className="font-bold text-slate-800">{item.total}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-400"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {totalRegistrosAcompanhamento === 0 && !carregandoAcompanhamento && (
                    <p className="text-xs text-slate-400">Ainda nÃ£o hÃ¡ registros para calcular a distribuiÃ§Ã£o.</p>
                  )}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900">IntegraÃ§Ãµes de dados</h4>
                    <p className="mt-1 text-xs text-slate-400">HistÃ³rico de recebimento dos sistemas externos</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600">
                    {acompanhamento?.sincronizacoes.length ?? 0} sincronizaÃ§Ãµes
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                        <th className="px-3 py-3">Sistema</th>
                        <th className="px-3 py-3">Entidade</th>
                        <th className="px-3 py-3">Recebidos</th>
                        <th className="px-3 py-3">Importados</th>
                        <th className="px-3 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(acompanhamento?.sincronizacoes ?? []).slice(0, 5).map((sync) => (
                        <tr key={sync.id} className="border-t border-slate-100 text-xs">
                          <td className="px-3 py-3 font-semibold text-slate-700">{sync.sistemaOrigem}</td>
                          <td className="px-3 py-3 text-slate-500">{sync.entidade}</td>
                          <td className="px-3 py-3 text-slate-500">{sync.registrosRecebidos}</td>
                          <td className="px-3 py-3 text-slate-500">{sync.registrosImportados}</td>
                          <td className="px-3 py-3">
                            <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                              sync.status.toLowerCase().includes("erro") || sync.status.toLowerCase().includes("falh")
                                ? "bg-rose-50 text-rose-700"
                                : sync.status.toLowerCase().includes("sucesso") || sync.status.toLowerCase().includes("conclu")
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}>
                              {sync.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(acompanhamento?.sincronizacoes.length ?? 0) === 0 && (
                    <p className="p-6 text-center text-xs text-slate-400">
                      Nenhuma sincronizaÃ§Ã£o registrada atÃ© o momento.
                    </p>
                  )}
                </div>
              </article>
            </div>

            <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <div>
                  <h4 className="font-bold text-slate-900">Registros operacionais</h4>
                  <p className="mt-1 text-xs text-slate-400">
                    {registrosAcompanhamentoFiltrados.length} de {totalRegistrosAcompanhamento} registros
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filtroTipoAcompanhamento}
                    onChange={(e) => setFiltroTipoAcompanhamento(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option>Todos</option>
                    <option>SolicitaÃ§Ã£o</option>
                    <option>ReclamaÃ§Ã£o</option>
                    <option>OcorrÃªncia</option>
                  </select>
                  <select
                    value={filtroStatusAcompanhamento}
                    onChange={(e) => setFiltroStatusAcompanhamento(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option>Todos</option>
                    <option>aberta</option>
                    <option>aberto</option>
                    <option>pendente</option>
                    <option>em andamento</option>
                    <option>concluÃ­da</option>
                    <option>resolvida</option>
                    <option>encerrada</option>
                  </select>
                  <input
                    value={buscaAcompanhamento}
                    onChange={(e) => setBuscaAcompanhamento(e.target.value)}
                    placeholder="Buscar registro..."
                    className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-3">Tipo</th>
                      <th className="px-4 py-3">Categoria</th>
                      <th className="px-4 py-3">DescriÃ§Ã£o</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Prioridade</th>
                      <th className="px-4 py-3">Data</th>
                      <th className="px-4 py-3">Quarto</th>
                      <th className="px-4 py-3">Origem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosAcompanhamentoFiltrados.map((item) => (
                      <tr key={`${item.tipo}-${item.id}`} className="border-t border-slate-100 text-xs hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-700">{item.tipo}</td>
                        <td className="px-4 py-3 text-slate-500">{item.categoria}</td>
                        <td className="max-w-xs px-4 py-3 text-slate-500">{item.descricao}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{item.prioridade}</td>
                        <td className="px-4 py-3 text-slate-500">{formatarDataAcompanhamento(item.data)}</td>
                        <td className="px-4 py-3 text-slate-500">{item.quarto}</td>
                        <td className="px-4 py-3 text-slate-500">{item.origem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!carregandoAcompanhamento && registrosAcompanhamentoFiltrados.length === 0 && (
                  <p className="p-10 text-center text-sm text-slate-400">
                    {totalRegistrosAcompanhamento === 0
                      ? "Ainda nÃ£o existem solicitaÃ§Ãµes, reclamaÃ§Ãµes ou ocorrÃªncias cadastradas."
                      : "Nenhum registro corresponde aos filtros selecionados."}
                  </p>
                )}
                {carregandoAcompanhamento && (
                  <p className="p-8 text-center text-sm text-slate-400">Carregando registros do banco de dados...</p>
                )}
              </div>
            </article>
          </>
        )}

        <footer className="mt-8 flex flex-wrap justify-between gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400">
          <p>Grand Plaza Â· Central de RelatÃ³rios</p>
          <p>
            Intelligence Suite <span className="mx-2">Â·</span>
            Indicadores parcialmente conectados ao banco de dados
          </p>
        </footer>
      </section>
    </main>
  );
}



