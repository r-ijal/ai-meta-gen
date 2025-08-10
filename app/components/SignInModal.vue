<template>
  <div>
    <UModal>
      <UButton
        color="neutral"
        variant="outline"
        class="group hover:scale-105 transition-transform duration-300 ease-in">
        Upgrade Now <span class="group-hover:animate-ping">🚀</span>
      </UButton>

      <template #content>
        <div class="flex flex-col p-8 gap-4">
          <div>
            <div
              class="text-primary text-3xl font-bold transition-colors duration-150 ease-in hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              Welcome
            </div>
            <div class="text-gray-500">Please continue with your account</div>
          </div>
          <UFormField label="Email">
            <UInput placeholder="Enter your email" class="w-full" size="xl" />
          </UFormField>

          <UButton size="xl" color="primary" class="block text-center">Sign In</UButton>
        </div>
      </template>
    </UModal>

    <!-- <UButton
      to="/sign-up"
      color="neutral"
      variant="outline"
      class="group hover:animate-bounce transition-transform duration-300 ease-in">
      Upgrade Now <span class="">🚀</span>
    </UButton> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modalState: {
    type: Boolean,
    default: false,
  },
});

async function handleLogin() {
  console.log("handleLogin");
}
</script>
<style scoped></style>
