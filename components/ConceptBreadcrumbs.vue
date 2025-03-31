<script lang="ts" setup>
import { ChevronRight } from "lucide-vue-next";

type Concept = {
    iri: string;
    label: string;
    distance: number;
    broader?: string;
};

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
        SELECT ?concept ?broader ?label (COUNT(*) AS ?distance)
        WHERE {
            <${props.iri}> ^skos:narrower* ?mid .
            ?mid ^skos:narrower* ?concept .
            ?concept skos:prefLabel ?label .
            OPTIONAL {
                ?concept ^skos:narrower ?broader .
            }
        }
        GROUP BY ?concept ?broader ?label
        ORDER BY DESC(?distance)`;

    const results: SPARQLSelectResponse = await $fetch(`${runtimeConfig.public.prezApiEndpoint}/sparql`, {
        params: {
            query: query,
        },
    });

    const resultsArray: Concept[] = results.results.bindings.map(r => {
        return {
            iri: r.concept.value,
            label: r.label.value,
            distance: Number(r.distance.value),
            broader: r.broader?.value,
        };
    });

    const topConcepts = resultsArray.filter(r => r.broader === undefined).toSorted((a, b) => a.label.localeCompare(b.label));

    const breadcrumbs: Concept[][] = [];

    topConcepts.forEach(topConcept => {
        breadcrumbs.push(resultsArray.reduce((arr, c) => {
            const last = arr.slice(-1)[0];
            if (c.broader === last.iri && c.distance === last.distance - 1) {
                arr.push(c);
            }
            return arr;
        }, [topConcept]))
    });

    return breadcrumbs;
}
</script>

<template>
    <div class="my-4">
        <Message v-if="status === 'error'" severity="error" :text="error" />
        <Skeleton v-else-if="status === 'pending'" class="h-4 w-[250px]" />
        <template v-else-if="data !== null && data.length > 0 && data.some(a => a.length > 1)">
            Hierarchy:
            <div>
                <div v-for="hierarchy in data" class="flex flex-row items-center gap-1">
                    <template v-for="crumb, index in hierarchy" :key="crumb.iri">
                        <template v-if="index < hierarchy.length - 1">
                            <NuxtLink :to="`/object?uri=${crumb.iri}`" external>{{ crumb.label }}</NuxtLink>
                            <ChevronRight class="size-4 text-muted-foreground" />
                        </template>
                        <span v-else class="font-bold">{{ crumb.label }}</span>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>
