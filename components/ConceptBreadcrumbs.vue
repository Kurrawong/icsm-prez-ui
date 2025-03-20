<script lang="ts" setup>
import { ChevronRight } from "lucide-vue-next";

const props = defineProps<{
    iri: string;
}>();

const runtimeConfig = useRuntimeConfig();

const { data, status, error } = useLazyAsyncData(() => getConceptBreadcumbs());

async function getConceptBreadcumbs() {
    type SPARQLSelectResponse = {
        head: {
            vars: string[];
        };
        results: {
            bindings: {
                [key: string]: {
                    type: string;
                    value: string;
                    "xml:lang"?: string;
                }
            }[];
        };
    };

    const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

        SELECT ?concept ?label (COUNT(*) AS ?distance)
        WHERE {
        <${props.iri}> ^skos:narrower* ?mid .
        ?mid ^skos:narrower* ?concept .

        ?concept skos:prefLabel ?label .
        }
        GROUP BY ?concept ?label
        ORDER BY DESC(?distance)`;

    const results: SPARQLSelectResponse = await $fetch(`${runtimeConfig.public.prezApiEndpoint}/sparql`, {
        params: {
            query: query,
        },
    });

    return results.results.bindings.map(r => {
        return {
            iri: r.concept.value,
            label: r.label.value,
            distance: r.distance.value,
        };
    });
}
</script>

<template>
    <div class="my-4">
        <Message v-if="status === 'error'" severity="error" :text="error" />
        <Skeleton v-else-if="status === 'pending'" class="h-4 w-[250px]" />
        <template v-else-if="data !== null && data.length > 1">
            Hierarchy:
            <div class="flex flex-row items-center gap-1">
                <template v-for="crumb, index in data" :key="crumb.iri">
                    <template v-if="index < data.length - 1">
                        <NuxtLink :to="`/object?uri=${crumb.iri}`" external>{{ crumb.label }}</NuxtLink>
                        <ChevronRight class="size-4 text-muted-foreground" />
                    </template>
                    <span v-else class="font-bold">{{ crumb.label }}</span>
                </template>
            </div>
        </template>
    </div>
</template>
