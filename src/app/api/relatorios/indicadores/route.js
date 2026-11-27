import { createClient } from "@/app/lib/supabase/server";
import { getAuthenticatedUser } from "@/app/lib/supabase/auth";

export async function GET() {
  try {
    const usuario = await getAuthenticatedUser();

    if (!usuario) {
      return Response.json(
        { status: "erro", mensagem: "Não autorizado." },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Busca a quantidade total de quartos
    const { count: totalQuartos, error: quartosError } = await supabase
      .from("quartos")
      .select("*", { count: "exact", head: true });

    if (quartosError) throw quartosError;

    // Busca reservas que estão dentro do período atual
    const hoje = new Date().toISOString().slice(0, 10);

    const { data: reservas, error: reservasError } = await supabase
      .from("reservas")
      .select("id_quarto, status, data_entrada, data_saida")
      .lte("data_entrada", hoje)
      .gt("data_saida", hoje);

    if (reservasError) throw reservasError;

    // Considera apenas reservas não canceladas
    const reservasAtivas = (reservas || []).filter((reserva) => {
      const status = String(reserva.status || "").toLowerCase();

      return (
        reserva.id_quarto &&
        status !== "cancelada" &&
        status !== "cancelado"
      );
    });

    // Conta quartos ocupados sem duplicar quartos
    const quartosOcupados = new Set(
      reservasAtivas.map((reserva) => reserva.id_quarto)
    ).size;

    const taxaOcupacao =
      totalQuartos > 0
        ? Number(((quartosOcupados / totalQuartos) * 100).toFixed(1))
        : 0;

    return Response.json({
      status: "sucesso",
      dados: {
        totalQuartos: totalQuartos || 0,
        quartosOcupados,
        taxaOcupacao,

        // Serão conectados quando confirmarmos as tabelas correspondentes.
        totalSolicitacoes: 0,
        totalReclamacoes: 0,
        totalOcorrencias: 0,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar indicadores:", error);

    return Response.json(
      {
        status: "erro",
        mensagem: "Não foi possível buscar os indicadores.",
      },
      { status: 500 }
    );
  }
}