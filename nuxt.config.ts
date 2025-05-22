// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts"],
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      title: "UFVJM | Monografias",
      meta: [
        {
          name: "description",
          content:
            "Monografias do Departamento de Computação da Universidade Federal dos Vales do Jequitinhonha.",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
  css: ["@/assets/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/variables" as *;`,
        },
      },
    },
  },
  googleFonts: {
    families: {
      "Reddit+Sans": [400, 500, 600],
    },
    display: "swap",
  },
  runtimeConfig: {
    public: {
      djangoApiBaseUrl: "http://127.0.0.1:8000",
    },
  },
});
