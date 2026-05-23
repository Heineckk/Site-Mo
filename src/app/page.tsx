import { redirect } from "next/navigation";

/**
 * PÁGINA INICIAL DO SITE (/)
 *
 * Quem acessa a raiz do site é redirecionado para /formulario.
 * Os presentes personalizados (sites prontos) ficam em /slug — ex: /ana-livia
 * Esses links só são enviados ao cliente DEPOIS que você monta o presente.
 */
export default function Home() {
  redirect("/formulario");
}
