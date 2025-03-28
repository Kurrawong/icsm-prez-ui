<template>
    <NuxtLayout contentonly>
        <template #default>
            <h1 class="text-3xl mt-4 mb-6">ICSM Catalogue</h1>
            <p>This system contains catalogues of reference data - models, vocabularies and demonstration objects - that
                support ICSM's Working Groups' work.</p>
            <p>The vocabularies below have been created by the Addressing, Cadastre and Place Names Working Groups and
                are categorised according to the <a
                    href="https://ggim.un.org/meetings/GGIM-committee/9th-Session/documents/Fundamental_Data_Publication.pdf">14
                    Global Fundamental Geospatial Data Theme.</a>
            </p>
            <VocabTable />
        </template>
    </NuxtLayout>
</template>