<script lang="ts" setup>
type NavLink = { label: string; url: string };

const footerLinks: { title: NavLink; links: NavLink[] }[] = [
    {
        title: {
            label: "About",
            url: "https://www.icsm.gov.au/about",
        },
        links: [
            {
                label: "Our Role",
                url: "https://www.icsm.gov.au/about/our-role",
            },
            {
                label: "Communication",
                url: "https://www.icsm.gov.au/about/communication",
            },
            {
                label: "Strategic plan",
                url: "https://www.icsm.gov.au/about/strategic-plan",
            },
            {
                label: "Copyright",
                url: "https://www.icsm.gov.au/about/legal",
            },
            {
                label: "Disclaimer",
                url: "https://www.icsm.gov.au/node/45",
            },
            {
                label: "Privacy",
                url: "https://www.icsm.gov.au/node/64",
            },
            {
                label: "MEMBERS Section",
                url: "https://www.icsm.gov.au/members",
            },
        ],
    },
    {
        title: {
            label: "What we do",
            url: "https://www.icsm.gov.au/what-we-do",
        },
        links: [
            {
                label: "Addressing",
                url: "https://www.icsm.gov.au/what-we-do/addressing",
            },
            {
                label: "Cadastre",
                url: "https://www.icsm.gov.au/what-we-do/cadastre-working-group",
            },
            {
                label: "Elevation Depth & Imagery",
                url: "https://www.icsm.gov.au/what-we-do/elevation-depth-and-imagery-working-group",
            },
            {
                label: "Geodesy",
                url: "https://www.icsm.gov.au/what-we-do/geodesy",
            },
            {
                label: "Metadata",
                url: "https://www.icsm.gov.au/what-we-do/metadata-working-group",
            },
            {
                label: "S-100WG",
                url: "https://www.icsm.gov.au/s-100-working-group",
            },
            {
                label: "NZ S-100WG",
                url: "https://www.icsm.gov.au/nz-s-100-working-group",
            },
            {
                label: "Place Names Working Group",
                url: "https://www.icsm.gov.au/what-we-do/place-names-working-group",
            },
            {
                label: "Topographic Information",
                url: "https://www.icsm.gov.au/what-we-do/topographic-information",
            },
            {
                label: "Tides and Mean Sea Level",
                url: "https://www.icsm.gov.au/what-we-do/tides-and-sea-level",
            },
        ],
    },
    {
        title: {
            label: "Education",
            url: "https://www.icsm.gov.au/education",
        },
        links: [
            {
                label: "Fundamentals of Mapping",
                url: "https://www.icsm.gov.au/education/fundamentals-mapping",
            },
            {
                label: "Fundamentals of Land Ownership",
                url: "https://www.icsm.gov.au/education/fundamentals-land-ownership-land-boundaries-and-surveying",
            },
            {
                label: "Australian Tides Manual",
                url: "https://www.icsm.gov.au/publications/australian-tides-manual-v50",
            },
            {
                label: "Gazetteer of Australia",
                url: "https://www.icsm.gov.au/education/gazetteer-australia",
            },
            {
                label: "Upgrades to the Australian Geospatial Reference System",
                url: "https://www.icsm.gov.au/upgrades-australian-geospatial-reference-system",
            },

        ],
    },
    {
        title: {
            label: "Publications",
            url: "https://www.icsm.gov.au/publications",
        },
        links: [
            {
                label: "Australian Tides Manual",
                url: "https://www.icsm.gov.au/publications/australian-tides-manual-v50",
            },
            {
                label: "Control Surveys (SP1)",
                url: "https://www.icsm.gov.au/standard-australian-survey-control-network-special-publication-1-sp1",
            },
            {
                label: "GDA2020 Technical Manual",
                url: "https://www.icsm.gov.au/gda2020-and-gda94-technical-manuals",
            },
        ],
    },
];
</script>

<template>
    <footer class="bg-tertiary text-tertiary-foreground pt-6 pb-10">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="col in footerLinks">
                <h3><a :href="col.title.url" target="_blank" rel="noopener noreferrer">{{ col.title.label }}</a></h3>
                <div class="flex flex-col">
                    <a v-for="link in col.links" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer a {
    color: hsl(var(--tertiary-foreground)) !important;
}
</style>