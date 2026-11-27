import { createClient } from "@/app/lib/supabase/server";
import { getAuthenticatedUser } from "@/app/lib/supabase/auth";

export async function GET() {
  try {
    const usuario = await getAuthenticatedUser();

    if (!usuario) {
      return Response.json(
        {
          status: "erro",
          mensagem: "Não autorizado.",
        },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    const [
      solicitacoesResult,
      reclamacoesResult,
      ocorrenciasResult,
      sincronizacoesResult,
    ] = await Promise.all([
      supabase
        .from("relatorio_solicitacoes")
        .select("*")
        .order("criado_em", { ascending: false }),

      supabase
        .from("relatorio_reclamacoes")
        .select("*")
        .order("criado_em", { ascending: false }),

      supabase
        .from("relatorio_ocorrencias")
        .select("*")
        .order("criado_em", { ascending: false }),

      supabase
        .from("relatorio_sincronizacoes")
        .select("*")
        .order("criado_em", { ascending: false }),
    ]);

    if (solicitacoesResult.error) throw solicitacoesResult.error;
    if (reclamacoesResult.error) throw reclamacoesResult.error;
    if (ocorrenciasResult.error) throw ocorrenciasResult.error;
    if (sincronizacoesResult.error) throw sincronizacoesResult.error;

    const solicitacoes = (solicitacoesResult.data || []).map((item) => ({
      id: item.id,
      categoria: item.categoria,
      descricao: item.descricao,
      status: item.status,
      prioridade: item.prioridade,
      abertaEm: item.criado_em,
      origemSistema: item.origem_sistema,
      quarto: item.id_quarto ? { id: item.id_quarto } : null,
    }));

    const reclamacoes = (reclamacoesResult.data || []).map((item) => ({
      id: item.id,
      categoria: item.categoria,
      descricao: item.descricao,
      status: item.status,
      prioridade: item.prioridade,
      registradaEm: item.criado_em,
      origemSistema: item.origem_sistema,
      quarto: item.id_quarto ? { id: item.id_quarto } : null,
    }));

    const ocorrencias = (ocorrenciasResult.data || []).map((item) => ({
      id: item.id,
      categoria: item.categoria,
      descricao: item.descricao,
      status: item.status,
      gravidade: item.gravidade,
      prioridade: item.gravidade,
      ocorridaEm: item.criado_em,
      origemSistema: item.origem_sistema,
      quarto: item.id_quarto ? { id: item.id_quarto } : null,
    }));

    const sincronizacoes = (sincronizacoesResult.data || []).map((item) => ({
      id: item.id,
      sistemaOrigem: item.sistema_origem,
      entidade: item.entidade,
      registrosRecebidos: item.registros_recebidos,
      registrosImportados: item.registros_importados,
      status: item.status,
    }));

    return Response.json({
      status: "sucesso",
      dados: {
        solicitacoes,
        reclamacoes,
        ocorrencias,
        sincronizacoes,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar acompanhamento:", error);

    return Response.json(
      {
        status: "erro",
        mensagem: "Não foi possível consultar os dados de acompanhamento.",
      },
      { status: 500 }
    );
  }
}