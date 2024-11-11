<!-- <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzJmMzZlNGVkMzljZjJiZDJhMjI5ZjNhM2JkMjZhOCIsIm5iZiI6MTczMTM1MzY5NS41NDM4NjYsInN1YiI6IjY3MzI1YTNmZjNlYWZjNTIwMWZkNTYzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TLLWxX_XHj_6dIiWqt04Ym8pFuglxjCbFsg-hzWVtQ`,
        },
      },
    );
    moviesGenres.value = response.data.genres;
    response = await axios.get(
      'https://api.themoviedb.org/3/genre/tv/list?language=pt-BR',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzJmMzZlNGVkMzljZjJiZDJhMjI5ZjNhM2JkMjZhOCIsIm5iZiI6MTczMTM1MzY5NS41NDM4NjYsInN1YiI6IjY3MzI1YTNmZjNlYWZjNTIwMWZkNTYzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TLLWxX_XHj_6dIiWqt04Ym8pFuglxjCbFsg-hzWVtQ`,
        },
      },
    );
    TVGenres.value = response.data.genres;
  });
</script> -->
<script setup>
  import { ref, onMounted } from 'vue';
  import api from './plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>

<template>
  <h1>Gêneros de filmes</h1>
  <ul>
    <li v-for="genre in moviesGenres" :key="genre.id">
      {{ genre.name }} 
    </li>
  </ul>
  <hr />
  <h1>Gêneros de programas de TV</h1>
  <ul>
    <li v-for="genre in TVGenres" :key="genre.id">
      {{ genre.name }}
    </li>
  </ul>
</template>