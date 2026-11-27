from pathlib import Path

arquivo = Path("src/app/(sistema)/relatorios/page.js")
texto = arquivo.read_text(encoding="utf-8")
linhas = texto.splitlines(keepends=True)

corrigidas = 0

for i, linha in enumerate(linhas):
    if any(s in linha for s in ("Ã", "Â", "â")):
        try:
            nova = linha.encode("cp1252").decode("utf-8")
            if nova != linha:
                linhas[i] = nova
                corrigidas += 1
        except (UnicodeEncodeError, UnicodeDecodeError):
            pass

arquivo.write_text("".join(linhas), encoding="utf-8")
print(f"Concluído! {corrigidas} linhas corrigidas.")
