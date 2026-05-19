import type { Metadata } from "next";
import NamoroForm from "@/components/formulario/NamoroForm";

export const metadata: Metadata = {
  title: "Formulário — Casal",
  description: "Envie as informações para o presente digital no modelo casal.",
};

export default function FormularioNamoroPage() {
  return <NamoroForm />;
}
