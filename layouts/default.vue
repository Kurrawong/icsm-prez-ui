<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";

const props = defineProps<{
    sidepanel?: boolean;
    contentonly?: boolean;
}>();
const runtimeConfig = useRuntimeConfig();
const globalConfig = useGlobalConfig();
const expandSidePanel = ref(false);
const showDebugPanel = ref(false);

onBeforeMount(() => {
    if (typeof localStorage !== 'undefined') {
        expandSidePanel.value = !!localStorage.getItem('expandSidePanel');
        showDebugPanel.value = runtimeConfig.public.prezDebug && !!localStorage.getItem('debug');
        watch(expandSidePanel, val => localStorage.setItem('expandSidePanel', val && '1' || ''));
        watch(showDebugPanel, val => localStorage.setItem('debug', val && '1' || ''));
    }
});
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div
            class="absolute w-full -z-10 after:bg-gradient-to-b after:from-tertiary after:via-[rgba(0,27,68,.2)] via-40% after:to-[#f5f5f5] after:content-[' '] after:h-full after:w-full after:block after:absolute after:bottom-0 after:z-50">
            <img src="/img/map.jpg" alt="" class="w-full">
        </div>

        <LayoutHeader />

        <LayoutNav v-model="showDebugPanel" />

        <!-- page heading -->
        <slot v-if="!contentonly" name="header">
            <div class="">
                <div class="container mx-auto flex flex-row">
                    <div class="px-4 py-4 flex-grow text-white">
                        <slot name="breadcrumb" />
                    </div>
                    <div v-if="showDebugPanel" class="m-2 bg-gray-200 rounded-lg text-[12px] leading-[12px]">
                        <slot name="debug" />
                    </div>
                </div>
            </div>
        </slot>
        <div v-else-if="showDebugPanel" class="bg-gray-100">
            <div class="container px-4 py-4 mx-auto">
                <slot name="debug" />
            </div>
        </div>

        <!-- content -->
        <div class="container mx-auto flex-grow bg-background/85 rounded-md px-20 py-16">
            <h1 v-if="!contentonly" class="text-3xl mt-4 mb-6">
                <slot name="header-text" />
            </h1>
            <div v-if="sidepanel" class="grid grid-cols-4 gap-4">
                <div :class="expandSidePanel ? 'col-span-3 relative' : 'col-span-4 relative'">
                    <slot />
                    <Button v-if="!expandSidePanel" title="Show sidepanel" variant="ghost" size="icon"
                        class="absolute right-0 top-[-5px] pointer-events-auto"
                        @click="expandSidePanel = !expandSidePanel">
                        <ChevronLeft class="size-4" />
                    </Button>
                </div>
                <div v-if="expandSidePanel" class="relative">
                    <slot name="sidepanel" />
                    <Button title="Hide sidepanel" variant="ghost" size="icon"
                        class="absolute right-0 top-[-5px] pointer-events-auto"
                        @click="expandSidePanel = !expandSidePanel">
                        <ChevronRight class="size-4" />
                    </Button>
                </div>
            </div>
            <div v-else class="">
                <slot />
            </div>
        </div>

        <LayoutFooter />
    </div>
</template>
