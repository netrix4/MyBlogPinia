<!-- <template>
  <div class="post-list">
    <h2>Lista de Posts</h2>
    <div v-for="post in posts" :key="post.id" class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
        Leer más
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  { id: 1, title: 'Introducción a Vue 3', excerpt: 'Aprende los básicos...' },
  { id: 2, title: 'Composition API', excerpt: 'Nueva forma de escribir...' },
  { id: 3, title: 'Vue Router 4', excerpt: 'Navegación en Vue...' },
])
</script> -->

<template>
  <div class="post-list">
    <h2>Lista de Posts</h2>

    <!-- Filtros visuales (opcional) -->
    <div class="filters">
      <label>
        Categoría:
        <input v-model="filters.category" placeholder="Ej: vue" />
      </label>
      <label>
        Autor:
        <input v-model="filters.author" placeholder="Ej: Juan" />
      </label>
      <button @click="applyFilters">Aplicar filtros</button>
    </div>

    <div v-if="filteredPosts.length > 0">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <router-link :to="{ name: 'post-detail', params: { id: post.id } }">
          Leer más
        </router-link>
      </div>
    </div>
    <p v-else>No hay posts con esos filtros</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Simular posts con categoría y autor
const posts = ref([
  {
    id: 1,
    title: "Introducción a Vue 3",
    excerpt: "Aprende los básicos...",
    category: "vue",
    author: "juan",
  },
  {
    id: 2,
    title: "Composition API",
    excerpt: "Nueva forma de escribir...",
    category: "vue",
    author: "maría",
  },
  {
    id: 3,
    title: "Vue Router 4",
    excerpt: "Navegación en Vue...",
    category: "router",
    author: "pedro",
  },
  {
    id: 4,
    title: "Pinia Store",
    excerpt: "Gestión de estado...",
    category: "pinia",
    author: "juan",
  },
]);

const filters = ref({
  category: route.query.category || "",
  author: route.query.author || "",
});

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchCategory = filters.value.category
      ? post.category.toLowerCase() === filters.value.category.toLowerCase()
      : true;
    const matchAuthor = filters.value.author
      ? post.author.toLowerCase() === filters.value.author.toLowerCase()
      : true;
    return matchCategory && matchAuthor;
  });
});

watch(
  () => route.query,
  (newQuery) => {
    filters.value.category = newQuery.category || "";
    filters.value.author = newQuery.author || "";
  },
  { immediate: true }
);

const applyFilters = () => {
  router.push({
    name: "post-list", // asegúrate que tu ruta tenga este nombre
    query: {
      category: filters.value.category || undefined,
      author: filters.value.author || undefined,
    },
  });
};
</script>

<style scoped>
.post-list {
  padding: 1rem;
}
.filters {
  margin-bottom: 1rem;
}
.filters label {
  margin-right: 1rem;
}
.post-card {
  border: 1px solid #ddd;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}
</style>
