import Link from "next/link";

export default function SistemaLayout({ children }) {
  return (
    <div className="sistema">

      <aside className="sidebar">

        <div className="logo">
          🏨
          <span>HotelPro Admin</span>
        </div>

        <nav className="menu">

          <Link href="/dashboard" className="menuItem ativo">
            ▦ Dashboard
          </Link>

          <Link href="/reservas" className="menuItem">
            <span>📅 Reservas</span>
          </Link>

          <Link href="/hospedes" className="menuItem">
            ♙ Hóspedes
          </Link>

          <Link href="/quartos" className="menuItem">
            🛏️ Quartos
          </Link>

          <Link href="/relatorios" className="menuItem">
            📊 Relatório
          </Link>

        </nav>

        <div className="menuBottom">

          <Link href="/configuracoes" className="menuItem">
            ⚙️ Configurações
          </Link>

          <Link href="/suporte" className="menuItem">
            ❔ Suporte
          </Link>

        </div>

      </aside>

      <div className="conteudo">
        {children}
      </div>

    </div>
  );
}