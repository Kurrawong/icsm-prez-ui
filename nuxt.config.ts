// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
      "@nuxtjs/tailwindcss",
      "shadcn-nuxt",
      "@nuxtjs/color-mode",
    ],
    extends: [
        "prez-ui"
    ],
    vite: {
        optimizeDeps: {
            include: ["@triply/yasgui"]
        }
    },
    app: {
        head: {
            title: "ICSM Catalogue | Intergovernmental Committee on Surveying and Mapping",
            link: [
                { href: "https://fonts.googleapis.com/css?family=Merriweather", rel: "stylesheet" },
            ]
        },
    },
});