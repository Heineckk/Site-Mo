export type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  featured?: boolean;
};

export const photos: Photo[] = [
  {
    src: "/photos/04-ana-flores.png",
    alt: "Ana Lívia segurando um lindo buquê de flores",
    title: "Minha Flor",
    caption: "O sorriso mais lindo do mundo, iluminado pelas flores que você merece.",
    featured: true,
  },
  {
    src: "/photos/03-flores.png",
    alt: "Casal abraçado com buquê de rosas",
    title: "Nosso Buquê",
    caption: "Cada flor que te dei carrega um pedaço do meu coração.",
  },
  {
    src: "/photos/02-cafe.png",
    alt: "Casal em um café, momento descontraído",
    title: "Nossos Risos",
    caption: "Os melhores momentos são os simples, ao seu lado, sem pressa.",
  },
  {
    src: "/photos/01-noite.png",
    alt: "Casal à noite, selfie romântica",
    title: "Nossas Noites",
    caption: "Sob as estrelas, cada noite ao seu lado é um sonho realizado.",
  },
];
