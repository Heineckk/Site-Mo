export type WriterMode = "cliente" | "nos";

export type NamoroFormData = {
  nomeDela: string;
  nomeDele: string;
  nomeGrande: string;
  slug: string;
  writerMode: WriterMode;
  tomNos?: string;
  tempoJuntos?: string;
  ama1?: string;
  ama2?: string;
  ama3?: string;
  incluir?: string;
  naoIncluir?: string;
  assinaturaPref?: string;
  fraseHero?: string;
  quizEnabled: boolean;
  quizP1q?: string;
  quizP1a?: string;
  quizP2q?: string;
  quizP2a?: string;
  quizP3q?: string;
  quizP3a?: string;
  quizCredito?: string;
  historia1?: string;
  historia2?: string;
  historia3?: string;
  fraseDestaque?: string;
  carta?: string;
  motivo1t?: string;
  motivo1d?: string;
  motivo2t?: string;
  motivo2d?: string;
  motivo3t?: string;
  motivo3d?: string;
  fotosEnabled: boolean;
  foto1?: string;
  foto2?: string;
  foto3?: string;
  foto4?: string;
  fotoPrincipal?: string;
};

export type CartinhaFormData = {
  nomePessoa: string;
  seuNome: string;
  nomeGrande: string;
  slug: string;
  writerMode: WriterMode;
  tomNos?: string;
  comoSente?: string;
  admira1?: string;
  admira2?: string;
  admira3?: string;
  querEntender?: string;
  incluir?: string;
  naoIncluir?: string;
  assinaturaPref?: string;
  fraseHero?: string;
  quizEnabled: boolean;
  quizP1q?: string;
  quizP1a?: string;
  quizP2q?: string;
  quizP2a?: string;
  quizP3q?: string;
  quizP3a?: string;
  quizCredito?: string;
  carta?: string;
  motivosEnabled: boolean;
  motivo1t?: string;
  motivo1d?: string;
  motivo2t?: string;
  motivo2d?: string;
  motivo3t?: string;
  motivo3d?: string;
  fotosEnabled: boolean;
  foto1?: string;
  foto2?: string;
  foto3?: string;
  fotoPrincipal?: string;
};

function line(label: string, value?: string) {
  if (!value?.trim()) return "";
  return `${label}: ${value.trim()}\n`;
}

function block(title: string, body: string) {
  if (!body.trim()) return "";
  return `\n--- ${title} ---\n${body}`;
}

export function formatNamoroSubmission(d: NamoroFormData): string {
  let out = `PEDIDO — MODELO CASAL\n`;

  out += block(
    "IDENTIDADE",
    [
      line("Nome dela(e)", d.nomeDela),
      line("Seu nome", d.nomeDele),
      line("Nome grande no site", d.nomeGrande),
      line("Link desejado", d.slug),
    ].join("")
  );

  out += block(
    "TEXTOS",
    d.writerMode === "nos"
      ? [
          "Textos: feitos por nós",
          line("Tom", d.tomNos),
          line("Tempo juntos", d.tempoJuntos),
          line("Ama 1", d.ama1),
          line("Ama 2", d.ama2),
          line("Ama 3", d.ama3),
          line("Incluir", d.incluir),
          line("Não incluir", d.naoIncluir),
          line("Assinatura", d.assinaturaPref),
        ].join("\n")
      : [
          "Textos: escritos pelo cliente",
          line("Frase do começo", d.fraseHero),
          "\nHistória 1:\n" + (d.historia1 ?? ""),
          "\nHistória 2:\n" + (d.historia2 ?? ""),
          "\nHistória 3:\n" + (d.historia3 ?? ""),
          line("Frase destaque", d.fraseDestaque),
          "\nCarta:\n" + (d.carta ?? ""),
          line("Motivo 1", d.motivo1t ? `${d.motivo1t} — ${d.motivo1d}` : ""),
          line("Motivo 2", d.motivo2t ? `${d.motivo2t} — ${d.motivo2d}` : ""),
          line("Motivo 3", d.motivo3t ? `${d.motivo3t} — ${d.motivo3d}` : ""),
        ].join("\n")
  );

  out += block(
    "QUIZ",
    d.quizEnabled
      ? [
          "Quiz: SIM",
          line("P1", d.quizP1q ? `${d.quizP1q} | ${d.quizP1a}` : ""),
          line("P2", d.quizP2q ? `${d.quizP2q} | ${d.quizP2a}` : ""),
          line("P3", d.quizP3q ? `${d.quizP3q} | ${d.quizP3a}` : ""),
          line("Crédito", d.quizCredito),
        ].join("\n")
      : "Quiz: NÃO"
  );

  out += block(
    "FOTOS",
    d.fotosEnabled
      ? [
          "Fotos: SIM (cliente enviará arquivos separado)",
          line("Legenda foto 1", d.foto1),
          line("Legenda foto 2", d.foto2),
          line("Legenda foto 3", d.foto3),
          line("Legenda foto 4", d.foto4),
          line("Foto principal", d.fotoPrincipal),
        ].join("\n")
      : "Fotos: NÃO"
  );

  return out.trim();
}

export function formatCartinhaSubmission(d: CartinhaFormData): string {
  let out = `PEDIDO — MODELO CARTA\n`;

  out += block(
    "IDENTIDADE",
    [
      line("Nome da pessoa", d.nomePessoa),
      line("Seu nome", d.seuNome),
      line("Nome grande no site", d.nomeGrande),
      line("Link desejado", d.slug),
    ].join("")
  );

  out += block(
    "TEXTOS",
    d.writerMode === "nos"
      ? [
          "Textos: feitos por nós",
          line("Tom", d.tomNos),
          line("Como se sente", d.comoSente),
          line("Admira 1", d.admira1),
          line("Admira 2", d.admira2),
          line("Admira 3", d.admira3),
          line("Quer que entenda", d.querEntender),
          line("Incluir", d.incluir),
          line("Não incluir", d.naoIncluir),
          line("Assinatura", d.assinaturaPref),
        ].join("\n")
      : [
          "Textos: escritos pelo cliente",
          line("Frase do começo", d.fraseHero),
          "\nCarta:\n" + (d.carta ?? ""),
        ].join("\n")
  );

  if (d.motivosEnabled && d.writerMode === "cliente") {
    out += block(
      "MOTIVOS",
      [
        line("1", d.motivo1t ? `${d.motivo1t} — ${d.motivo1d}` : ""),
        line("2", d.motivo2t ? `${d.motivo2t} — ${d.motivo2d}` : ""),
        line("3", d.motivo3t ? `${d.motivo3t} — ${d.motivo3d}` : ""),
      ].join("\n")
    );
  }

  out += block(
    "QUIZ",
    d.quizEnabled
      ? [
          "Quiz: SIM",
          line("P1", d.quizP1q ? `${d.quizP1q} | ${d.quizP1a}` : ""),
          line("P2", d.quizP2q ? `${d.quizP2q} | ${d.quizP2a}` : ""),
          line("P3", d.quizP3q ? `${d.quizP3q} | ${d.quizP3a}` : ""),
          line("Crédito", d.quizCredito),
        ].join("\n")
      : "Quiz: NÃO"
  );

  out += block(
    "FOTOS",
    d.fotosEnabled
      ? [
          "Fotos: SIM (enviar arquivos separado)",
          line("Legenda 1", d.foto1),
          line("Legenda 2", d.foto2),
          line("Legenda 3", d.foto3),
          line("Principal", d.fotoPrincipal),
        ].join("\n")
      : "Fotos: NÃO"
  );

  return out.trim();
}
