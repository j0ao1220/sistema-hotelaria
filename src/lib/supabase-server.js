function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase não configurado no servidor.");
  return { url: url.replace(/\/$/, ""), key };
}

export async function getAuthenticatedSupabase(request) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!token) return { error: "Não autenticado.", status: 401 };

  const { url, key } = getConfig();
  const authResponse = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!authResponse.ok) return { error: "Sessão inválida ou expirada.", status: 401 };

  return {
    token,
    async request(path, options = {}) {
      const response = await fetch(`${url}/rest/v1/${path}`, {
        ...options,
        headers: {
          apikey: key,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        cache: "no-store",
      });
      const text = await response.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = text; }
      return { response, data };
    },
  };
}

export function jsonError(message, status = 400) {
  return Response.json({ error: message }, { status });
}

export function normalizeGuestPayload(input = {}) {
  const fields = ["nome", "cpf", "nascimento", "genero", "nacionalidade", "email", "telefone", "documento", "cep", "rua", "numero", "complemento", "bairro", "cidade", "estado", "observacoes"];
  const guest = {};
  for (const field of fields) {
    const value = input[field];
    guest[field] = value === "" || value === undefined ? null : value;
  }
  guest.nome = String(input.nome || "").trim();
  guest.cpf = String(input.cpf || "").trim();
  guest.email = String(input.email || "").trim();
  guest.telefone = String(input.telefone || "").trim();
  guest.estado = guest.estado ? String(guest.estado).trim().toUpperCase() : null;
  return guest;
}

export function normalizeCompanions(input) {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item) => item && (String(item.nome || "").trim() || String(item.cpf || "").trim()))
    .map((item) => ({
      nome: String(item.nome || "").trim(),
      cpf: String(item.cpf || "").trim() || null,
    }));
}
