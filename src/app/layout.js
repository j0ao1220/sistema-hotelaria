import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
          {children}
      </body>
    </html>
  );
} // akilla - alterei o conteúdo pro menu não ser mais global
// e movi o código que estava aqui para o layout dentro da pasta (sistema)