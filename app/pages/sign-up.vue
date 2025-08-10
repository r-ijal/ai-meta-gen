<template>
  <section id="sign-up" class="bg-linear-to-br from-primary/20 to-secondary/10">
    <div v-if="isHydrated" class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="background-box"></div>
      <div class="background-box"></div>
      <div class="background-box"></div>
      <div class="background-box"></div>
      <div class="background-box"></div>

      <div class="box relative">
        <div class="square animate-move" style="--i: 0"></div>
        <div class="square animate-move" style="--i: 1"></div>
        <div class="square animate-move" style="--i: 2"></div>
        <div class="square animate-move" style="--i: 3"></div>
        <div class="square animate-move" style="--i: 4"></div>
        <div
          class="max-w-xl mx-auto text-center space-y-4 bg-white/10 p-12 rounded-xl shadow-lg">
          <div class="flex flex-col items-center justify-center">
            <div class="">
              <div
                class="text-primary text-3xl font-bold transition-colors duration-150 ease-in hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                Welcome
              </div>
              <div class="text-gray-500">Please continue with your account</div>
            </div>
            <div class="mt-4 w-full">
              <button class="btn-glass" @click="handleLogin">
                <span class="btn-span">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </section>
</template>

<script setup lang="ts">
const isHydrated = ref(false);

async function handleLogin() {
  console.log("handleLogin");
}

onMounted(() => {
  isHydrated.value = true;
})
</script>
<style scoped>
@reference "../assets/css/main.css";

.background-box {
  @apply absolute rounded-xl backdrop-blur-sm;
}
.background-box:nth-child(1) {
  @apply top-20 left-44 size-16 bg-yellow-300/20;
}
.background-box:nth-child(2) {
  @apply top-8 right-14 size-20 bg-red-300/20;
}
.background-box:nth-child(3) {
  @apply -right-10 bottom-6 size-48 bg-green-300/20;
}
.background-box:nth-child(4) {
  @apply bottom-20 left-28 size-12 bg-purple-300/20;
}
.background-box:nth-child(5) {
  @apply top-42 -left-10 size-28 bg-blue-300/20;
}

.square {
  @apply absolute rounded-xl bg-white/10 shadow-xl backdrop-blur-sm dark:bg-black/20;
}
.square:nth-child(1) {
  @apply -top-12 -right-14 h-22 w-22;
}
.square:nth-child(2) {
  @apply top-42 -left-24 z-10 h-26 w-26;
}
.square:nth-child(3) {
  @apply bottom-8 -right-20 z-10 h-20 w-20;
}
.square:nth-child(4) {
  @apply -bottom-20 left-28 h-12 w-12;
}
.square:nth-child(5) {
  @apply -top-28 left-44 h-16 w-16;
}

.animate-move {
  animation: move 10s linear infinite;
  animation-delay: calc(var(--i) * -1s);
}

@keyframes move {
  0%,
  100% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(40px);
  }
}

.btn-glass {
  @apply relative h-16 w-full;
}

.btn-span {
  @apply text-primary absolute top-0 left-0 flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-t border-b border-white/10 bg-linear-to-l from-white/30 to-transparent font-semibold shadow backdrop-blur-sm transition-all duration-500 ease-linear active:bg-white/70 dark:border-black/10 dark:from-black/20 dark:to-transparent dark:text-white;
}

.btn-span:hover {
  letter-spacing: 1px;
  transition: 0.3s ease-out;
}

.btn-span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 3, 3, 0.15), transparent);
  transform: skewX(45deg) translateX(-150%);
  transition: 0.5s;
}

.btn-span:hover::before {
  transform: skewX(45deg) translateX(200%);
}
</style>
