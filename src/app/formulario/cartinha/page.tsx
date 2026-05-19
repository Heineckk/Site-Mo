import type { Metadata } from "next";
import CartinhaForm from "@/components/formulario/CartinhaForm";

export const metadata: Metadata = {
  title: "Formulário — Carta",
  description: "Envie as informações para o presente digital no modelo carta.",
};

export default function FormularioCartinhaPage() {
  return <CartinhaForm />;
}
