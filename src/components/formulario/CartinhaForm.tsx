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
  formatCartinhaSubmission,
  type CartinhaFormData,
} from "@/lib/formulario-format";

const initial: CartinhaFormData = {
  nomePessoa: "",
  seuNome: "",
  nomeGrande: "",
  slug: "",
  writerMode: "cliente",
  quizEnabled: false,
  motivosEnabled: false,
  fotosEnabled: false,
};

export default function CartinhaForm() {
  const [d, setD] = useState<CartinhaFormData>(initial);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const set = <K extends keyof CartinhaFormData>(
    key: K,
    value: CartinhaFormData[K]
  ) => setD((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    setResult(formatCartinhaSubmission(d));
    setShowResult(true);
  };

  return (
    <FormPageShell
      badge="Modelo carta"
      title="Formulário de pedido"
      subtitle="Campos opcionais podem ficar em branco. Ao terminar, copie o resumo e envie pelo WhatsApp."
    >
      <p className="mb-6 text-center text-xs text-white/30">
        <Link href="/formulario" className="hover:text-rose-light">
          Voltar aos modelos
        </Link>
      </p>

      <FormCard step={1} title="Identificação">
        <div>
          <FormLabel htmlFor="nomePessoa">Nome da pessoa</FormLabel>
          <FormInput
            id="nomePessoa"
            value={d.nomePessoa}
            onChange={(v) => set("nomePessoa", v)}
            placeholder="Ex: Laura"
          />
        </div>
        <div>
          <FormLabel htmlFor="seuNome">Seu nome</FormLabel>
          <FormInput
            id="seuNome"
            value={d.seuNome}
            onChange={(v) => set("seuNome", v)}
            placeholder="Ex: Lucas"
          />
        </div>
        <div>
          <FormLabel htmlFor="nomeGrande">Nome grande no início</FormLabel>
          <FormInput
            id="nomeGrande"
            value={d.nomeGrande}
            onChange={(v) => set("nomeGrande", v)}
            placeholder="Ex: Laura"
          />
        </div>
        <div>
          <FormLabel htmlFor="slug">Link desejado</FormLabel>
          <FormInput
            id="slug"
            value={d.slug}
            onChange={(v) => set("slug", v.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="carta-para-laura"
          />
        </div>
      </FormCard>

      <FormCard step={2} title="Mensagem" hint="Texto feito por nós ou escrito por você">
        <WriterChoice
          value={d.writerMode}
          onChange={(v) => set("writerMode", v)}
        />

        {d.writerMode === "nos" ? (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <p className="text-sm text-white/50">
              Informe os pontos abaixo. Nós escrevemos o texto da carta.
            </p>
            <div>
              <FormLabel htmlFor="tom">Tom do texto</FormLabel>
              <FormInput
                id="tom"
                value={d.tomNos ?? ""}
                onChange={(v) => set("tomNos", v)}
                placeholder="Ex.: discreto, sincero, leve"
              />
            </div>
            <div>
              <FormLabel htmlFor="sente">Como você se sente em relação à pessoa?</FormLabel>
              <FormTextarea
                id="sente"
                value={d.comoSente ?? ""}
                onChange={(v) => set("comoSente", v)}
                rows={2}
              />
            </div>
            <div>
              <FormLabel>3 coisas que admira</FormLabel>
              <FormInput
                id="a1"
                value={d.admira1 ?? ""}
                onChange={(v) => set("admira1", v)}
                placeholder="1."
              />
              <div className="mt-2 space-y-2">
                <FormInput
                  id="a2"
                  value={d.admira2 ?? ""}
                  onChange={(v) => set("admira2", v)}
                  placeholder="2."
                />
                <FormInput
                  id="a3"
                  value={d.admira3 ?? ""}
                  onChange={(v) => set("admira3", v)}
                  placeholder="3."
                />
              </div>
            </div>
            <div>
              <FormLabel htmlFor="entender">O que quer que ela entenda ao ler?</FormLabel>
              <FormTextarea
                id="entender"
                value={d.querEntender ?? ""}
                onChange={(v) => set("querEntender", v)}
                rows={2}
              />
            </div>
            <div>
              <FormLabel htmlFor="incluir" optional>
                Algo especial para incluir
              </FormLabel>
              <FormTextarea
                id="incluir"
                value={d.incluir ?? ""}
                onChange={(v) => set("incluir", v)}
                rows={2}
              />
            </div>
            <div>
              <FormLabel htmlFor="nao" optional>
                O que não quer no texto
              </FormLabel>
              <FormInput
                id="nao"
                value={d.naoIncluir ?? ""}
                onChange={(v) => set("naoIncluir", v)}
              />
            </div>
            <div>
              <FormLabel htmlFor="ass">Como quer assinar</FormLabel>
              <FormInput
                id="ass"
                value={d.assinaturaPref ?? ""}
                onChange={(v) => set("assinaturaPref", v)}
                placeholder="Com carinho, Lucas"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <p className="text-sm text-white/50">
              Escreva ou cole abaixo o texto que você preparou.
            </p>
            <div>
              <FormLabel htmlFor="frase">Frase do começo</FormLabel>
              <FormInput
                id="frase"
                value={d.fraseHero ?? ""}
                onChange={(v) => set("fraseHero", v)}
              />
            </div>
            <div>
              <FormLabel htmlFor="carta">Texto da carta</FormLabel>
              <FormTextarea
                id="carta"
                value={d.carta ?? ""}
                onChange={(v) => set("carta", v)}
                placeholder="Cole ou digite o texto completo"
                rows={10}
              />
            </div>
          </div>
        )}
      </FormCard>

      {d.writerMode === "cliente" && (
        <FormCard step={3} title="Qualidades" hint="Opcional">
          <ToggleRow
            label="Listar qualidades"
            checked={d.motivosEnabled}
            onChange={(v) => set("motivosEnabled", v)}
          />
          {d.motivosEnabled && (
            <div className="space-y-3">
              <FormInput
                id="m1t"
                value={d.motivo1t ?? ""}
                onChange={(v) => set("motivo1t", v)}
                placeholder="Título 1"
              />
              <FormTextarea
                id="m1d"
                value={d.motivo1d ?? ""}
                onChange={(v) => set("motivo1d", v)}
                placeholder="Descrição 1"
                rows={2}
              />
              <FormInput
                id="m2t"
                value={d.motivo2t ?? ""}
                onChange={(v) => set("motivo2t", v)}
                placeholder="Título 2"
              />
              <FormTextarea
                id="m2d"
                value={d.motivo2d ?? ""}
                onChange={(v) => set("motivo2d", v)}
                rows={2}
              />
            </div>
          )}
        </FormCard>
      )}

      <FormCard
        step={d.writerMode === "cliente" ? 4 : 3}
        title="Opcionais"
        hint="Pode deixar desativado"
      >
        <ToggleRow
          label="Quiz de acesso"
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
              id="credito"
              value={d.quizCredito ?? ""}
              onChange={(v) => set("quizCredito", v)}
              placeholder="Ex.: Por Lucas, para Laura"
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
            {[1, 2, 3].map((n) => (
              <FormInput
                key={n}
                id={`f${n}`}
                value={
                  n === 1 ? d.foto1 ?? "" : n === 2 ? d.foto2 ?? "" : d.foto3 ?? ""
                }
                onChange={(v) => {
                  if (n === 1) set("foto1", v);
                  if (n === 2) set("foto2", v);
                  if (n === 3) set("foto3", v);
                }}
                placeholder={`Legenda foto ${n}`}
              />
            ))}
            <FormInput
              id="fp"
              value={d.fotoPrincipal ?? ""}
              onChange={(v) => set("fotoPrincipal", v)}
              placeholder="Foto principal (1, 2 ou 3)"
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
