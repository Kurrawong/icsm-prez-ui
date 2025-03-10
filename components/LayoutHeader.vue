<script lang="ts" setup>
import { Search } from "lucide-vue-next";

const search = ref("");

type NavLink = { label: string; url: string };

const navLinks: NavLink[] = [
    {
        label: "About",
        url: "https://www.icsm.gov.au/about",
    },
    {
        label: "What We Do",
        url: "https://www.icsm.gov.au/what-we-do",
    },
    {
        label: "Education",
        url: "https://www.icsm.gov.au/education",
    },
    {
        label: "Publications",
        url: "https://www.icsm.gov.au/publications",
    },
    {
        label: "Contact",
        url: "https://www.icsm.gov.au/contact",
    },
    {
        label: "Cadastre 2034",
        url: "https://www.icsm.gov.au/cadastre-2034",
    },
];

async function doSearch() {
    await navigateTo(`https://www.icsm.gov.au/search/node?keys=${search.value}`, {
        open: {
            target: "_blank",
        }
    });
}
</script>

<template>
    <header class="text-white h-32 bg-gradient-to-b from-[rgba(0,0,0,.4)] to-transparent">
        <div class="container mx-auto px-4 h-full flex justify-between items-center">
            <a href="https://www.icsm.gov.au/" target="_blank" rel="noopener noreferrer">
                <img src="/img/logo.png" alt="ICSM logo">
            </a>
            <nav>
                <a v-for="link in navLinks" :href="link.url"
                    class="p-[3rem_.7rem_1.5rem] border-b-[3px] border-transparent uppercase tracking-widest transition-colors hover:text-secondary hover:border-secondary hover:bg-tertiary/60"
                    target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </nav>
            <div class="relative w-[220px] items-center text-black">
                <Input id="search" type="search" placeholder="Search..." class="pr-10 rounded-full" v-model="search" @keypress.enter="doSearch" />
                <span class="absolute end-0 inset-y-0 flex items-center justify-center">
                    <Button size="icon" class="rounded-full" @click="doSearch"><Search class="size-4" /></Button>
                </span>
            </div>
        </div>
    </header>
</template>
