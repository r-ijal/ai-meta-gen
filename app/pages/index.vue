<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div v-if="hydrated" class="max-w-xl mx-auto text-center space-y-4">
      <h1 class="text-2xl font-bold">AI Meta Description & SEO Tool</h1>
      <p class="text-gray-600 dark:text-gray-400">Generate SEO metadata in seconds using AI</p>

      <div class="flex items-center justify-center gap-4">
        <USelect v-model="language" :items="languageOptions" placeholder="Select Language" class="w-full" />
        <USelect v-model="model" :items="modelOptions" placeholder="Select Model" class="w-full" />
      </div>

      <UTextarea
        v-model="input"
        placeholder="Enter your blog title or content snippet"
        autoresize
        :rows="3"
        class="w-full" />

      <div class="text-sm text-gray-500 dark:text-gray-400">Uses today: {{ usageCount }} / 3</div>

      <UTooltip :text="!canUseToday() ? 'Daily limit reached (3/day)' : ''">
        <UButton @click="generate" :loading="loading" :disabled="input.length < 5 || !canUseToday()">
          Generate SEO Metadata
        </UButton>
      </UTooltip>

      <div v-if="usageCount >= limit" class="text-center mt-4">
        <p class="mb-2">Upgrade to Pro for unlimited generations</p>
        <UButton to="https://redlabelz.gumroad.com/l/zajsnz" target="_blank" color="primary">Upgrade Now</UButton>
      </div>

      <div v-if="output" class="mt-6 space-y-3 text-left bg-white dark:bg-gray-800 p-4 rounded">
        <div>
          <strong>Meta Title:</strong> {{ output.title }}
          <UButton icon="i-heroicons-clipboard" size="xs" variant="ghost" @click="copyToClipboard(output.title)" />
        </div>
        <div>
          <strong>Meta Description:</strong> {{ output.description }}
          <UButton
            icon="i-heroicons-clipboard"
            size="xs"
            variant="ghost"
            @click="copyToClipboard(output.description)" />
        </div>
        <div>
          <strong>Keywords:</strong> {{ output.keywords }}
          <UButton icon="i-heroicons-clipboard" size="xs" variant="ghost" @click="copyToClipboard(output.keywords)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Data = {
  title: string;
  description: string;
  keywords: string;
};

const input = ref("");
const output = ref<Data | null>(null);
const loading = ref(false);
const hydrated = ref(false);

const language = ref("en");
const model = ref("mistralai/mistral-7b-instruct");
const usageCount = ref(0);
const limit = ref(3);
const toast = useToast();

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

const modelOptions = [
  { label: "Mistral 7B Instruct", value: "mistralai/mistral-7b-instruct" },
  { label: "GLM 4.5 Air", value: "z-ai/glm-4.5-air:free" },
  { label: "GPT OSS 20B", value: "openai/gpt-oss-20b:free" },
];

function getUsage() {
  const today = new Date().toISOString().split("T")[0];
  const usage = JSON.parse(localStorage.getItem("seoUsage") || "{}");

  if (usage.date !== today) {
    localStorage.setItem("seoUsage", JSON.stringify({ date: today, count: 0 }));
    usageCount.value = 0;
    return 0;
  }
  usageCount.value = usage.count || 0;
  return usage.count || 0;
}

function canUseToday() {
  return getUsage() < 3;
}

function incrementUsage() {
  const today = new Date().toISOString().split("T")[0];
  const usage = JSON.parse(localStorage.getItem("seoUsage") || "{}");
  usage.date = today;
  usage.count = (usage.count || 0) + 1;
  localStorage.setItem("seoUsage", JSON.stringify(usage));
  usageCount.value = usage.count;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      title: "Copied!",
      description: "Text copied to clipboard",
      icon: "i-heroicons-check-circle",
      color: "success",
    });
  });
}

async function generate() {
  if (!canUseToday()) {
    toast.add({
      title: "Limit Reached",
      description: "You can only generate 3 times per day",
      icon: "i-heroicons-exclamation-triangle",
      color: "warning",
    });
    return;
  }

  try {
    loading.value = true;
    const response = await $fetch("/api/generate", {
      method: "POST",
      body: { input: input.value },
    });

    console.log("response", response);
    output.value = response.data as Data;
    incrementUsage();
    toast.add({
      title: "Success",
      description: "Generated SEO metadata successfully",
      icon: "i-heroicons-check-circle",
      color: "success",
    });
  } catch (error) {
    console.log("error", error);
    toast.add({
      title: "Error",
      description: "Failed to generate SEO metadata",
      icon: "i-heroicons-x-circle",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  hydrated.value = true;
  getUsage(); // Initialize counter
});
</script>
