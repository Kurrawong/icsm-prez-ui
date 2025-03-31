<script lang="ts" setup>
import { ExternalLink, SortAsc, SortDesc, X } from "lucide-vue-next";

const runtimeConfig = useRuntimeConfig();

const { data, status, error } = useLazyAsyncData("vocabs", () => listVocabs());

const sortBy = ref<"label" | "keywords" | "status">("label");
const sortDirection = ref<"asc" | "desc">("asc");
const searchTerm = ref("");

const filteredVocabs = computed(() => {
    if (data.value === null) {
        return [];
    } else if (searchTerm.value === "") {
        return data.value;
    } else {
        return data.value.filter(r => r.label.toLowerCase().includes(searchTerm.value.toLowerCase()));
    }
});

const sortedVocabs = computed(() => {
    if (sortBy.value === "label" && sortDirection.value === "asc") { // default sorting, do nothing
        return filteredVocabs.value;
    } else {
        return filteredVocabs.value.toSorted((a, b) => {
            const first = sortDirection.value === "asc" ? a : b;
            const second = sortDirection.value === "asc" ? b : a;
            if (first[sortBy.value] === undefined) return 1;
            else if (second[sortBy.value] === undefined) return -1;
            else {
                if (sortBy.value === "keywords") {
                    return first.keywords?.[0].localeCompare(second.keywords?.[0]);
                } else {
                    return first[sortBy.value].localeCompare(second[sortBy.value])
                }
            }
        });
    }
});

async function listVocabs() {
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

    const query = `PREFIX sdo: <https://schema.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?cs ?labelStr ?desc (GROUP_CONCAT(DISTINCT ?_keywords; SEPARATOR=",") AS ?keywords) ?status
    WHERE {
        ?cs a skos:ConceptScheme ;
            skos:prefLabel ?label .
        FILTER (LANG(?label) = "en" || !LANG(?label))
        BIND (STR(?label) AS ?labelStr)
        OPTIONAL {
            ?cs skos:definition ?desc .
        }
        OPTIONAL {
            ?cs sdo:keywords/skos:prefLabel ?_keywords .
        }
        OPTIONAL {
            ?cs sdo:status/skos:prefLabel ?status .
        }
    } GROUP BY ?cs ?labelStr ?desc ?status ORDER BY ?labelStr`;

    const results: SPARQLSelectResponse = await $fetch(`${runtimeConfig.public.prezApiEndpoint}/sparql`, {
        params: {
            query: query,
        },
    });

    return results.results.bindings.map(r => {
        return {
            iri: r.cs.value,
            label: r.labelStr.value,
            desc: r.desc?.value,
            keywords: r.keywords?.value.split(","),
            status: r.status?.value,
        };
    });
}

function toggleSort(key: "label" | "keywords" | "status") {
    if (sortBy.value === key) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortBy.value = key;
        sortDirection.value = "asc";
    }
}

function toTitleCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}
</script>

<template>
    <div>
        <h2 class="text-2xl my-4">Vocabularies</h2>
        <div class="relative w-[250px] items-center">
            <Input type="search" placeholder="Filter vocabularies..." v-model="searchTerm" class="pr-10" />
            <span class="absolute end-0 inset-y-0 flex items-center justify-center pl-2 pr-1">
                <Button variant="link" size="icon" class="text-muted-foreground hover:text-foreground" @click="searchTerm = ''" title="Clear search"><X class="size-4" /></Button>
            </span>
        </div>
        <Message v-if="status === 'error'" severity="error" :text="error" />
        <Loading v-else-if="status === 'pending'" variant="list" />
        <p v-else-if="status === 'success' && sortedVocabs.length === 0">No results</p>
        <template v-else-if="status === 'success' && sortedVocabs.length > 0">
            <Table>
                <TableHeader>
                    <TableRow class="hover:bg-unset">
                        <TableHead v-for="col in ['label', 'keywords', 'status']">
                            <Button variant="ghost" @click="toggleSort(col)" class="font-bold">
                                {{ col === 'label' ? 'Vocabulary' : toTitleCase(col) }}
                                <template v-if="sortBy === col">
                                    <SortAsc v-if="sortDirection === 'asc'" class="size-4" />
                                    <SortDesc v-else class="size-4" />
                                </template>
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-for="vocab in sortedVocabs" :key="vocab.iri">
                        <tr :class="vocab.desc ? 'border-none' : 'border-b'">
                            <TableCell :class="`p-0 px-4 pt-4 ${vocab.desc ? 'pb-1' : 'pb-4'}`">
                                <span class="flex flex-row items-center">
                                    <NuxtLink :to="`/object?uri=${vocab.iri}`">{{ vocab.label }}</NuxtLink>
                                    <a :href="vocab.iri" target="_blank" rel="noopener noreferrer"><ExternalLink class="size-4 ml-1" /></a>
                                </span>
                            </TableCell>
                            <TableCell :class="`p-0 px-4 pt-4 ${vocab.desc ? 'pb-1' : 'pb-4'}`">
                                <div class="flex gap-1">
                                    <Badge v-for="keyword in vocab.keywords" variant="secondary" class="text-xs">{{ keyword }}</Badge>
                                </div>
                            </TableCell>
                            <TableCell :class="`p-0 px-4 pt-4 ${vocab.desc ? 'pb-1' : 'pb-4'}`">{{ vocab.status }}</TableCell>
                        </tr>
                        <tr v-if="vocab.desc" class="border-b">
                            <td colspan="3" class="px-4 pb-4">
                                <p class="text-sm italic text-muted-foreground text-ellipsis line-clamp-1">{{ vocab.desc }}</p>
                            </td>
                        </tr>
                    </template>
                </TableBody>
            </Table>
        </template>
    </div>
</template>
