"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FormPageShell,
  FormCard,
  FormLabel,
  FormInput,
  FormTextarea,
  ToggleRow,
  WriterChoice,
  SubmitBar,
  ResultModal,
} from "@/components/formulario/FormUI";
import {
  formatNamoroSubmission,
  type NamoroFormData,
} from "@/lib/formulario-format";

const initial: NamoroFormData = {
  nomeDela: "",
  nomeDele: "",
  nomeGrande: "",
  slug: "",
  writerMode: "cliente",
  quizEnabled: false,
  fotosEnabled: false,
};

export default function NamoroForm() {
  const [d, setD] = useState<NamoroFormData>(initial);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const set = <K extends keyof NamoroFormData>(key: K, value: NamoroFormData[K]) =>
    setD((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    setResult(formatNamoroSubmission(d));
    setShowResult(true);
  };

  return (
    <FormPageShell
      badge="Modelo casal"
      title="Formulário de pedido"
      subtitle="Campos em branco nos opcionais serão ignorados. Ao terminar, copie o resumo e envie pelo WhatsApp."
    >
      <p className="mb-6 text-center text-xs text-white/30">
        <Link href="/formulario" className="hover:text-rose-light">
          Voltar aos modelos
        </Link>
      </p>

      <FormCard step={1} title="Identificação" hint="Nomes e endereço do site">
        <div>
          <FormLabel htmlFor="nomeDela">Nome dela(e)</FormLabel>
          <FormInput
            id="nomeDela"
            value={d.nomeDela}
            onChange={(v) => set("nomeDela", v)}
            placeholder="Ex: Maria"
          />
        </div>
        <div>
          <FormLabel htmlFor="nomeDele">Seu nome</FormLabel>
          <FormInput
            id="nomeDele"
            value={d.nomeDele}
            onChange={(v) => set("nomeDele", v)}
            placeholder="Ex: João"
          />
        </div>
        <div>
          <FormLabel htmlFor="nomeGrande">Nome grande no início do site</FormLabel>
          <FormInput
            id="nomeGrande"
            value={d.nomeGrande}
            onChange={(v) => set("nomeGrande", v)}
            placeholder='Ex: Maria ou Ana + Lívia em duas linhas'
          />
        </div>
        <div>
          <FormLabel htmlFor="slug">Link desejado</FormLabel>
          <FormInput
            id="slug"
            value={d.slug}
            onChange={(v) => set("slug", v.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="joao-e-maria"
          />
          <p className="mt-1 text-xs text-white/30">Sem espaço e sem acento</p>
        </div>
      </FormCard>

      <FormCard step={2} title="Conteúdo" hint="Textos feitos por nós ou escritos por você">
        <WriterChoice
          value={d.writerMode}
          onChange={(v) => set("writerMode", v)}
        />

        {d.writerMode === "nos" ? (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <p className="text-sm text-white/50">
              Informe os pontos abaixo. História, carta e motivos ficam por
              nossa conta.
            </p>
            <div>
              <FormLabel htmlFor="tomNos">Tom do texto</FormLabel>
              <FormInput
                id="tomNos"
                value={d.tomNos ?? ""}
                onChange={(v) => set("tomNos", v)}
                placeholder="Ex.: direto, romântico, leve"
              />
            </div>
            <div>
              <FormLabel htmlFor="tempo">Há quanto tempo estão juntos?</FormLabel>
              <FormInput
                id="tempo"
                value={d.tempoJuntos ?? ""}
                onChange={(v) => set("tempoJuntos", v)}
                placeholder="Ex: 2 anos"
              />
            </div>
            <div>
              <FormLabel>3 coisas que você mais ama nela(e)</FormLabel>
              <FormInput
                id="ama1"
                value={d.ama1 ?? ""}
                onChange={(v) => set("ama1", v)}
                placeholder="1."
              />
              <div className="mt-2 space-y-2">
                <FormInput
                  id="ama2"
                  value={d.ama2 ?? ""}
                  onChange={(v) => set("ama2", v)}
                  placeholder="2."
                />
                <FormInput
                  id="ama3"
                  value={d.ama3 ?? ""}
                  onChange={(v) => set("ama3", v)}
                  placeholder="3."
                />
              </div>
            </div>
            <div>
              <FormLabel htmlFor="incluir" optional>
                Algo especial para incluir
              </FormLabel>
              <FormTextarea
                id="incluir"
                value={d.incluir ?? ""}
                onChange={(v) => set("incluir", v)}
                placeholder="Viagem, piada interna, promessa…"
                rows={3}
              />
            </div>
            <div>
              <FormLabel htmlFor="naoIncluir" optional>
                O que não quer no texto
              </FormLabel>
              <FormInput
                id="naoIncluir"
                value={d.naoIncluir ?? ""}
                onChange={(v) => set("naoIncluir", v)}
              />
            </div>
            <div>
              <FormLabel htmlFor="assinatura">Assinatura preferida</FormLabel>
              <FormInput
                id="assinatura"
                value={d.assinaturaPref ?? ""}
                onChange={(v) => set("assinaturaPref", v)}
                placeholder="Para sempre seu, João"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <p className="text-sm text-white/50">
              Preencha os campos abaixo com os textos que você escreveu.
            </p>
            <div>
              <FormLabel htmlFor="frase">Frase do começo</FormLabel>
              <FormInput
                id="frase"
                value={d.fraseHero ?? ""}
                onChange={(v) => set("fraseHero", v)}
                placeholder="Frase exibida abaixo do nome"
              />
            </div>
            <div>
              <FormLabel>Nossa história (3 partes)</FormLabel>
              <FormTextarea
                id="h1"
                value={d.historia1 ?? ""}
                onChange={(v) => set("historia1", v)}
                placeholder="Primeiro parágrafo…"
              />
              <div className="mt-2 space-y-2">
                <FormTextarea
                  id="h2"
                  value={d.historia2 ?? ""}
                  onChange={(v) => set("historia2", v)}
                  placeholder="Segundo parágrafo…"
                />
                <FormTextarea
                  id="h3"
                  value={d.historia3 ?? ""}
                  onChange={(v) => set("historia3", v)}
                  placeholder="Terceiro parágrafo…"
                />
              </div>
            </div>
            <div>
              <FormLabel htmlFor="destaque">Frase em destaque</FormLabel>
              <FormInput
                id="destaque"
                value={d.fraseDestaque ?? ""}
                onChange={(v) => set("fraseDestaque", v)}
              />
            </div>
            <div>
              <FormLabel htmlFor="carta">Carta de amor</FormLabel>
              <FormTextarea
                id="carta"
                value={d.carta ?? ""}
                onChange={(v) => set("carta", v)}
                placeholder="Texto completo da carta"
                rows={8}
              />
            </div>
            <div>
              <FormLabel>Motivos</FormLabel>
              <FormInput
                id="m1t"
                value={d.motivo1t ?? ""}
                onChange={(v) => set("motivo1t", v)}
                placeholder="Título 1"
              />
              <div className="mt-2">
                <FormTextarea
                  id="m1d"
                  value={d.motivo1d ?? ""}
                  onChange={(v) => set("motivo1d", v)}
                  placeholder="Descrição 1"
                  rows={2}
                />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <FormInput
                  id="m2t"
                  value={d.motivo2t ?? ""}
                  onChange={(v) => set("motivo2t", v)}
                  placeholder="Título 2"
                />
                <FormInput
                  id="m3t"
                  value={d.motivo3t ?? ""}
                  onChange={(v) => set("motivo3t", v)}
                  placeholder="Título 3"
                />
              </div>
            </div>
          </div>
        )}
      </FormCard>

      <FormCard step={3} title="Opcionais" hint="Pode deixar desativado">
        <ToggleRow
          label="Quiz de acesso"
          description="Perguntas com resposta definida por você"
          checked={d.quizEnabled}
          onChange={(v) => set("quizEnabled", v)}
        />
        {d.quizEnabled && (
          <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="grid gap-2 sm:grid-cols-2">
                <FormInput
                  id={`q${n}`}
                  value={d[`quizP${n}q`] ?? ""}
                  onChange={(v) => {
                    if (n === 1) set("quizP1q", v);
                    if (n === 2) set("quizP2q", v);
                    if (n === 3) set("quizP3q", v);
                  }}
                  placeholder={`Pergunta ${n}`}
                />
                <FormInput
                  id={`a${n}`}
                  value={d[`quizP${n}a`] ?? ""}
                  onChange={(v) => {
                    if (n === 1) set("quizP1a", v);
                    if (n === 2) set("quizP2a", v);
                    if (n === 3) set("quizP3a", v);
                  }}
                  placeholder={`Resposta ${n}`}
                />
              </div>
            ))}
            <FormInput
              id="quizCredito"
              value={d.quizCredito ?? ""}
              onChange={(v) => set("quizCredito", v)}
              placeholder="Ex.: Por João, para Maria"
            />
          </div>
        )}

        <ToggleRow
          label="Galeria de fotos"
          description="Arquivos enviados depois, pelo WhatsApp"
          checked={d.fotosEnabled}
          onChange={(v) => set("fotosEnabled", v)}
        />
        {d.fotosEnabled && (
          <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">
              Uma legenda por foto. Envie os arquivos em mensagem separada.
            </p>
            {([1, 2, 3, 4] as const).map((n) => (
              <FormInput
                key={n}
                id={`f${n}`}
                value={
                  n === 1
                    ? d.foto1 ?? ""
                    : n === 2
                      ? d.foto2 ?? ""
                      : n === 3
                        ? d.foto3 ?? ""
                        : d.foto4 ?? ""
                }
                onChange={(v) => {
                  if (n === 1) set("foto1", v);
                  if (n === 2) set("foto2", v);
                  if (n === 3) set("foto3", v);
                  if (n === 4) set("foto4", v);
                }}
                placeholder={`Legenda foto ${n}`}
              />
            ))}
            <FormInput
              id="fotoP"
              value={d.fotoPrincipal ?? ""}
              onChange={(v) => set("fotoPrincipal", v)}
              placeholder="Foto principal (1, 2, 3 ou 4)"
            />
          </div>
        )}
      </FormCard>

      <SubmitBar onSubmit={handleSubmit} />
      <ResultModal
        open={showResult}
        text={result}
        onClose={() => setShowResult(false)}
      />
    </FormPageShell>
  );
}
