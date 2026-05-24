/**
 * =============================================================================
 * CONTROLE DE PEDIDOS — DOTTI 303
 * =============================================================================
 *
 * O QUE É ESTE ARQUIVO?
 * Script do Google Apps Script que CRIA a planilha de controle no Google Drive.
 * Rode uma vez em https://script.google.com → Executar → a planilha aparece no Drive.
 *
 * COMO ISSO SE LIGA AO SITE?
 * 1. Cliente entra no site (/formulario) pelo link do Instagram
 * 2. Escolhe Casal ou Carta, preenche o formulário
 * 3. Clica em "Enviar pelo WhatsApp" com o resumo do pedido
 * 4. VOCÊ recebe no WhatsApp e cadastra manualmente na aba "Pedidos" desta planilha
 * 5. O Dashboard atualiza sozinho via fórmulas (COUNTIF, SUMIF, etc.)
 *
 * COMO USAR:
 * 1. Acesse https://script.google.com
 * 2. Novo projeto → cole este código → Salvar
 * 3. Selecione criarPlanilhaControlePedidos → Executar ▶
 * 4. Abra o link que aparecer no Registro de execução
 */

// Paleta de cores igual ao site (roxo escuro, rosa, dourado)
var BRAND = {
  bgDark: "#0d0a12",
  bgCard: "#1a0a2e",
  bgSoft: "#2d1b4e",
  rose: "#ff6b9d",
  roseLight: "#ffb3cc",
  gold: "#d4af37",
  goldLight: "#f0d78c",
  white: "#f8f0f4",
  muted: "#b8a8b5",
  border: "#3d2a4f",
  rowAlt: "#faf6f8",
  rowWhite: "#ffffff",
};

/**
 * FUNÇÃO PRINCIPAL — roda quando você clica em Executar ▶
 * Cria a planilha inteira com 3 abas: Dashboard, Pedidos e Como usar
 */
function criarPlanilhaControlePedidos() {
  // SpreadsheetApp.create() cria um arquivo novo no Google Drive
  var ss = SpreadsheetApp.create("Controle de Pedidos — Dotti 303");

  // --- Aba 1: Pedidos (onde você cadastra cada cliente) ---
  var pedidos = ss.getActiveSheet();
  pedidos.setName("Pedidos");
  setupPedidosSheet_(pedidos);

  // --- Aba 2: Dashboard (painel com totais e gráficos — posição 0 = primeira aba) ---
  var dashboard = ss.insertSheet("Dashboard", 0);
  setupDashboardSheet_(ss, dashboard);

  // --- Aba 3: Instruções de uso ---
  var instrucoes = ss.insertSheet("Como usar");
  setupInstrucoesSheet_(instrucoes);

  // Abre a planilha já na aba Dashboard
  ss.setActiveSheet(dashboard);

  // Logger.log escreve no "Registro de execução" — é lá que aparece o link
  var url = ss.getUrl();
  Logger.log("Planilha criada com sucesso!");
  Logger.log("Abra em: " + url);
  return url;
}

/**
 * Monta a aba PEDIDOS — tabela principal de controle
 * Linha 1-2: título | Linha 3: cabeçalhos | Linha 4+: um pedido por linha
 */
function setupPedidosSheet_(sheet) {
  // Colunas espelham o que o cliente manda no formulário do site
  var headers = [
    "Data",
    "Status",
    "Modelo",
    "Cliente",
    "Para quem é",
    "Valor",
    "Pago?",
    "WhatsApp",
    "Slug / Link",
    "Textos",
    "Quiz",
    "Fotos",
    "Entrega",
    "Link enviado",
    "Observações",
  ];

  var lastCol = headers.length;

  // Faixa de título (linha 1) — sem mesclar células, senão o filtro quebra
  var titleRow = sheet.getRange(1, 1, 1, lastCol);
  titleRow.setBackground(BRAND.bgDark);
  sheet.getRange(1, 1).setValue("DOTTI 303");
  styleTitleBanner_(sheet.getRange(1, 1), BRAND.bgDark, BRAND.roseLight, 22);

  // Subtítulo (linha 2)
  var subtitleRow = sheet.getRange(2, 1, 2, lastCol);
  subtitleRow.setBackground(BRAND.bgCard);
  sheet
    .getRange(2, 1)
    .setValue("Controle de pedidos · Presentes digitais personalizados");
  styleSubtitleBanner_(sheet.getRange(2, 1), BRAND.bgCard, BRAND.muted, 10);

  // Cabeçalho da tabela (linha 3)
  var headerRange = sheet.getRange(3, 1, 1, lastCol);
  headerRange.setValues([headers]);
  headerRange
    .setBackground(BRAND.bgSoft)
    .setFontColor(BRAND.white)
    .setFontWeight("bold")
    .setFontSize(10)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true);

  sheet.setRowHeight(1, 48);
  sheet.setRowHeight(2, 28);
  sheet.setRowHeight(3, 36);
  sheet.setFrozenRows(3); // Congela título + cabeçalho ao rolar

  // Largura de cada coluna em pixels
  var widths = [95, 130, 80, 140, 140, 85, 70, 130, 130, 80, 60, 60, 95, 180, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // Regras visuais e validações nas 500 linhas de dados (a partir da linha 4)
  applyPedidosValidations_(sheet, 4, 500);   // menus dropdown (Status, Modelo, etc.)
  applyPedidosFormats_(sheet, 4, 500);       // formato data e R$
  applyPedidosConditionalFormatting_(sheet, 4, 500); // cores por status
  applyPedidosBanding_(sheet, 3, lastCol, 500);      // linhas zebradas

  // Linha de exemplo — o cliente pode apagar depois de entender
  var exemplo = [
    new Date(),
    "Aguardando pagamento",
    "Casal",
    "João Silva",
    "Maria",
    8,
    "Não",
    "(11) 99999-9999",
    "maria-e-joao",
    "Cliente",
    "Sim",
    "Sim",
    "",
    "",
    "Linha de exemplo — pode apagar",
  ];
  var exampleRange = sheet.getRange(4, 1, 1, exemplo.length);
  exampleRange.setValues([exemplo]);
  exampleRange
    .setBackground("#fff8fb")
    .setFontStyle("italic")
    .setFontColor("#888888");

  // Filtro no cabeçalho — permite buscar/filtrar pedidos por status, modelo, etc.
  sheet.getRange(3, 1, 501, lastCol).createFilter();

  sheet.getRange(4, 1, 500, lastCol).setVerticalAlignment("middle");
  sheet.getRange(4, 1, 500, lastCol).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  protectHeaderArea_(sheet, lastCol); // Avisa se tentar apagar o cabeçalho
}

/**
 * Monta o DASHBOARD — atualiza sozinho quando você edita a aba Pedidos
 * Usa fórmulas como =COUNTIF(Pedidos!B4:B,"Entregue") que recalculam automaticamente
 */
function setupDashboardSheet_(ss, sheet) {
  sheet.getRange(1, 1, 1, 8).merge();
  sheet.getRange(1, 1).setValue("Dashboard · Dotti 303");
  styleTitleBanner_(sheet.getRange(1, 1), BRAND.bgDark, BRAND.roseLight, 20);

  sheet.getRange(2, 1, 2, 8).merge();
  sheet
    .getRange(2, 1)
    .setValue("Visão geral dos pedidos · Atualiza automaticamente");
  styleSubtitleBanner_(sheet.getRange(2, 1), BRAND.bgCard, BRAND.muted, 10);

  sheet.setRowHeight(1, 44);
  sheet.setRowHeight(2, 26);

  // Cards de KPI — cada "formula" lê dados da aba Pedidos em tempo real
  var cards = [
    { label: "TOTAL DE PEDIDOS", formula: "=COUNTA(Pedidos!A4:A)", color: BRAND.bgSoft },
    {
      label: "AGUARDANDO PAGAMENTO",
      formula: '=COUNTIF(Pedidos!B4:B,"Aguardando pagamento")',
      color: "#4a2040",
    },
    {
      label: "EM PRODUÇÃO",
      formula: '=COUNTIF(Pedidos!B4:B,"Em produção")',
      color: "#3d3520",
    },
    {
      label: "ENTREGUES",
      formula: '=COUNTIF(Pedidos!B4:B,"Entregue")',
      color: "#1e3d2f",
    },
  ];

  for (var i = 0; i < cards.length; i++) {
    var col = i * 2 + 1;
    styleKpiCard_(sheet, 4, col, cards[i].label, cards[i].formula, cards[i].color);
  }

  // Faturamento: soma coluna Valor (F) onde Pago? (G) = "Sim"
  styleKpiCardWide_(
    sheet,
    8,
    1,
    "FATURAMENTO (PEDIDOS PAGOS)",
    '=SUMIF(Pedidos!G4:G,"Sim",Pedidos!F4:F)',
    BRAND.bgSoft,
    '"R$ "#,##0.00'
  );

  // Ticket médio dos pedidos pagos
  styleKpiCardWide_(
    sheet,
    8,
    5,
    "TICKET MÉDIO",
    '=IFERROR(AVERAGEIF(Pedidos!G4:G,"Sim",Pedidos!F4:F),0)',
    "#3d3520",
    '"R$ "#,##0.00'
  );

  sheet.getRange(12, 1).setValue("Pedidos por status");
  styleSectionTitle_(sheet.getRange(12, 1));
  sheet.getRange(12, 5).setValue("Pedidos por modelo");
  styleSectionTitle_(sheet.getRange(12, 5));

  // Tabelas auxiliares nas colunas J-M (ficam ocultas) — alimentam os gráficos
  sheet.getRange(13, 10).setValue("Status");
  sheet.getRange(13, 11).setValue("Qtd");
  sheet.getRange(14, 10).setValue("Aguardando pagamento");
  sheet.getRange(14, 11).setFormula('=COUNTIF(Pedidos!B4:B,"Aguardando pagamento")');
  sheet.getRange(15, 10).setValue("Pago");
  sheet.getRange(15, 11).setFormula('=COUNTIF(Pedidos!B4:B,"Pago")');
  sheet.getRange(16, 10).setValue("Em produção");
  sheet.getRange(16, 11).setFormula('=COUNTIF(Pedidos!B4:B,"Em produção")');
  sheet.getRange(17, 10).setValue("Entregue");
  sheet.getRange(17, 11).setFormula('=COUNTIF(Pedidos!B4:B,"Entregue")');
  sheet.getRange(18, 10).setValue("Cancelado");
  sheet.getRange(18, 11).setFormula('=COUNTIF(Pedidos!B4:B,"Cancelado")');

  sheet.getRange(13, 12).setValue("Modelo");
  sheet.getRange(13, 13).setValue("Qtd");
  sheet.getRange(14, 12).setValue("Casal");
  sheet.getRange(14, 13).setFormula('=COUNTIF(Pedidos!C4:C,"Casal")');
  sheet.getRange(15, 12).setValue("Carta");
  sheet.getRange(15, 13).setFormula('=COUNTIF(Pedidos!C4:C,"Carta")');

  // Gráfico de pizza — distribuição por status
  var statusChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sheet.getRange(13, 10, 6, 2))
    .setPosition(13, 1, 0, 0)
    .setOption("title", "")
    .setOption("pieHole", 0.45)
    .setOption("legend", { position: "bottom", textStyle: { fontSize: 10 } })
    .setOption("colors", ["#ff6b9d", "#d4af37", "#ffb3cc", "#1a0a2e", "#888888"])
    .setOption("width", 340)
    .setOption("height", 260)
    .build();

  // Gráfico de barras — Casal vs Carta
  var modeloChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(sheet.getRange(13, 12, 3, 2))
    .setPosition(13, 5, 0, 0)
    .setOption("title", "")
    .setOption("legend", { position: "none" })
    .setOption("colors", ["#ff6b9d"])
    .setOption("width", 340)
    .setOption("height", 260)
    .build();

  sheet.insertChart(statusChart);
  sheet.insertChart(modeloChart);

  sheet.hideColumns(10, 4); // Esconde colunas auxiliares dos gráficos

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 40);
  sheet.setColumnWidth(4, 40);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 80);
  sheet.setColumnWidth(7, 40);
  sheet.setColumnWidth(8, 40);

  sheet.getRange(22, 1, 22, 8).merge();
  sheet
    .getRange(22, 1)
    .setValue("Dica: preencha novos pedidos na aba «Pedidos». Este painel atualiza sozinho.")
    .setBackground("#fff8fb")
    .setFontColor(BRAND.muted)
    .setFontSize(9)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(22, 28);
}

/** Aba com instruções rápidas para quem usa a planilha */
function setupInstrucoesSheet_(sheet) {
  sheet.getRange(1, 1, 1, 4).merge();
  sheet.getRange(1, 1).setValue("Como usar esta planilha");
  styleTitleBanner_(sheet.getRange(1, 1), BRAND.bgDark, BRAND.roseLight, 18);

  var lines = [
    ["1.", "Cadastro", "Cada linha na aba «Pedidos» = um pedido do cliente."],
    ["2.", "Status", "Use o menu: Aguardando pagamento → Pago → Em produção → Entregue."],
    ["3.", "Pagamento", "Marque «Sim» na coluna Pago? quando confirmar o pagamento."],
    ["4.", "Entrega", "Preencha a data de entrega e o link final enviado ao cliente."],
    ["5.", "Dashboard", "A aba «Dashboard» mostra totais e gráficos automaticamente."],
    ["6.", "Filtros", "Na aba «Pedidos», use os filtros do cabeçalho para buscar pedidos."],
  ];

  sheet.getRange(3, 1, lines.length, 3).setValues(lines);
  sheet.getRange(3, 1, lines.length, 1).setFontWeight("bold").setFontColor(BRAND.rose);
  sheet.getRange(3, 2, lines.length, 1).setFontWeight("bold");
  sheet.getRange(3, 1, lines.length, 3).setWrap(true).setVerticalAlignment("top");
  sheet.setColumnWidth(1, 40);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 420);
  sheet.setRowHeights(3, lines.length, 32);
}

/** Menus dropdown — evita digitar errado Status, Modelo, Sim/Não, etc. */
function applyPedidosValidations_(sheet, startRow, numRows) {
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(
      ["Aguardando pagamento", "Pago", "Em produção", "Entregue", "Cancelado"],
      true
    )
    .setAllowInvalid(false)
    .build();

  var modeloRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Casal", "Carta"], true)
    .setAllowInvalid(false)
    .build();

  var simNaoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Sim", "Não"], true)
    .setAllowInvalid(false)
    .build();

  var textosRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Cliente", "Nós"], true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(startRow, 2, numRows, 1).setDataValidation(statusRule);
  sheet.getRange(startRow, 3, numRows, 1).setDataValidation(modeloRule);
  sheet.getRange(startRow, 7, numRows, 1).setDataValidation(simNaoRule);
  sheet.getRange(startRow, 10, numRows, 1).setDataValidation(textosRule);
  sheet.getRange(startRow, 11, numRows, 2).setDataValidation(simNaoRule);
}

/** Formata datas como dd/mm/aaaa e valores como R$ 8,00 */
function applyPedidosFormats_(sheet, startRow, numRows) {
  sheet.getRange(startRow, 1, numRows, 1).setNumberFormat("dd/mm/yyyy");
  sheet.getRange(startRow, 6, numRows, 1).setNumberFormat('"R$ "#,##0.00');
  sheet.getRange(startRow, 13, numRows, 1).setNumberFormat("dd/mm/yyyy");
}

/** Cores automáticas na coluna Status — rosa=aguardando, verde=entregue, etc. */
function applyPedidosConditionalFormatting_(sheet, startRow, numRows) {
  var range = sheet.getRange(startRow, 2, numRows, 1);

  var rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Aguardando pagamento")
      .setBackground("#fde8f0")
      .setFontColor("#9d174d")
      .setRanges([range])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Pago")
      .setBackground("#fef9c3")
      .setFontColor("#854d0e")
      .setRanges([range])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Em produção")
      .setBackground("#ede9fe")
      .setFontColor("#5b21b6")
      .setRanges([range])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Entregue")
      .setBackground("#dcfce7")
      .setFontColor("#166534")
      .setRanges([range])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Cancelado")
      .setBackground("#f3f4f6")
      .setFontColor("#6b7280")
      .setRanges([range])
      .build(),
  ];

  sheet.setConditionalFormatRules(rules);
}

/** Linhas zebradas — facilita ler muitos pedidos */
function applyPedidosBanding_(sheet, headerRow, lastCol, numRows) {
  sheet
    .getRange(headerRow, 1, numRows + 1, lastCol)
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
}

/** Protege linhas 1-3 — só avisa, não bloqueia de verdade (warningOnly) */
function protectHeaderArea_(sheet, lastCol) {
  var protection = sheet.getRange(1, 1, 3, lastCol).protect();
  protection.setDescription("Cabeçalho protegido");
  protection.setWarningOnly(true);
}

/** Estilo do título principal (fonte grande, centralizado) */
function styleTitleBanner_(range, bg, color, size) {
  range
    .setBackground(bg)
    .setFontColor(color)
    .setFontWeight("bold")
    .setFontSize(size)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
}

/** Estilo do subtítulo */
function styleSubtitleBanner_(range, bg, color, size) {
  range
    .setBackground(bg)
    .setFontColor(color)
    .setFontSize(size)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
}

/** Card pequeno de KPI no Dashboard (ex: TOTAL DE PEDIDOS) */
function styleKpiCard_(sheet, row, col, label, formula, bg) {
  var labelRange = sheet.getRange(row, col, 1, 2);
  var valueRange = sheet.getRange(row + 1, col, 1, 2);

  labelRange.merge();
  valueRange.merge();

  labelRange
    .setValue(label)
    .setBackground(bg)
    .setFontColor(BRAND.roseLight)
    .setFontSize(9)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  valueRange
    .setFormula(formula)
    .setBackground(BRAND.rowWhite)
    .setFontColor(BRAND.bgDark)
    .setFontSize(22)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setNumberFormat("#,##0");

  sheet.setRowHeight(row, 24);
  sheet.setRowHeight(row + 1, 48);
  sheet.setColumnWidth(col, 130);
  sheet.setColumnWidth(col + 1, 130);

  sheet.getRange(row, col, 2, 2).setBorder(true, true, true, true, false, false, BRAND.border, SpreadsheetApp.BorderStyle.SOLID);
}

/** Card largo de KPI (ex: FATURAMENTO) */
function styleKpiCardWide_(sheet, row, col, label, formula, bg, numberFormat) {
  var labelRange = sheet.getRange(row, col, 1, 4);
  var valueRange = sheet.getRange(row + 1, col, 1, 4);

  labelRange.merge();
  valueRange.merge();

  labelRange
    .setValue(label)
    .setBackground(bg)
    .setFontColor(BRAND.goldLight)
    .setFontSize(9)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  valueRange
    .setFormula(formula)
    .setBackground(BRAND.rowWhite)
    .setFontColor(BRAND.bgDark)
    .setFontSize(24)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setNumberFormat(numberFormat || "#,##0");

  sheet.setRowHeight(row, 24);
  sheet.setRowHeight(row + 1, 52);

  sheet.getRange(row, col, 2, 4).setBorder(true, true, true, true, false, false, BRAND.border, SpreadsheetApp.BorderStyle.SOLID);
}

/** Título de seção no Dashboard (ex: "Pedidos por status") */
function styleSectionTitle_(range) {
  range
    .setFontWeight("bold")
    .setFontSize(11)
    .setFontColor(BRAND.bgDark);
}
