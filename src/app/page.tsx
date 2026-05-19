import { redirect } from "next/navigation";

/** Visitantes entram no formulário; presentes só via link direto /slug */
export default function Home() {
  redirect("/formulario");
}
