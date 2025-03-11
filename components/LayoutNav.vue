<script lang="ts" setup>
import { Cog } from "lucide-vue-next";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
const globalConfig = useGlobalConfig();

const showDebugPanel = defineModel<boolean>();
</script>

<template>
    <div class="relative">
        <nav class="main-nav container font-extralight mx-auto px-4 py-4 hidden md:flex text-lg text-white">
            <NuxtLink v-for="{ label, url } in appConfig.menu.filter(item => item.active !== false)" :to="url"
                :class="`p-5 border-b-[3px] transition-colors hover:text-secondary hover:border-secondary hover:bg-tertiary/60 ${(url === '/' && route.path === '/') || (url !== '/' && route.path.startsWith(url)) ? 'text-secondary border-secondary bg-tertiary/60' : 'border-transparent'}`">
                {{ label }}</NuxtLink>
            <div v-if="runtimeConfig.public.prezDebug" class="!ml-auto">
                <div v-if="showDebugPanel">
                    <span title="Toggle debug off" class="hover:cursor-pointer hover:text-gray-500 text-blue-400"
                        @click="() => { showDebugPanel = !showDebugPanel }">
                        <Cog class="w-4 h-4" />
                    </span>
                </div>
                <span v-else title="Toggle debug on" class="hover:cursor-pointer hover:text-gray-500 text-gray-300"
                    @click="() => { showDebugPanel = !showDebugPanel }">
                    <Cog class="w-4 h-4" />
                </span>
            </div>
        </nav>
    </div>
</template>
