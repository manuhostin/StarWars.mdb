<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const isLoading = ref(false);
const genres = ref([]);
const series = ref([]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

// Função para listar séries com "Star Wars" no título
const listStarWarsSeries = async (genreId = null) => {
    isLoading.value = true;
    const start = Date.now();

    const response = await api.get('search/tv', {
        params: {
            query: 'Star Wars', // Busca por séries com "Star Wars" no título
            language: 'pt-BR'
        }
    });

    // Filtra as séries pelo gênero selecionado, se houver
    if (genreId) {
        series.value = response.data.results.filter(serie => serie.genre_ids.includes(genreId));
    } else {
        series.value = response.data.results;
    }

    // Calcula o tempo restante para completar os 2 segundos
    const elapsed = Date.now() - start;
    const remaining = 2000 - elapsed;
    if (remaining > 0) {
        await delay(remaining);
    }

    isLoading.value = false;
};

// Função para buscar gêneros que aparecem nas séries de Star Wars
const fetchStarWarsGenres = async () => {
    const response = await api.get('search/tv', {
        params: {
            query: 'Star Wars', // Busca por séries com "Star Wars" no título
            language: 'pt-BR'
        }
    });

    const allGenresResponse = await api.get('genre/tv/list?language=pt-BR');
    const allGenres = allGenresResponse.data.genres;

    // Obtém os gêneros exclusivos das séries de Star Wars
    const genreIds = new Set(response.data.results.flatMap(serie => serie.genre_ids));
    genres.value = allGenres.filter(genre => genreIds.has(genre.id));
};

onMounted(async () => {
    // Busca os gêneros relacionados às séries de Star Wars
    await fetchStarWarsGenres();

    // Lista as séries de Star Wars por padrão
    await listStarWarsSeries();
});
</script>

<template>
    <div v-if="isLoading" class="loading">
    </div>
    <h1>Séries do Universo <span>Star Wars</span></h1>
    <ul class="genre-list">
        <li
            v-for="genre in genres"
            :key="genre.id"
            class="genre-item"
            @click="listStarWarsSeries(genre.id)"
        >
            {{ genre.name }}
        </li>
    </ul>
    <div class="series-list">
        <div v-for="item in series" :key="item.id" class="series-card">
            <img
                :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.name"
            />
            <div class="series-details">
                <p class="series-title">{{ item.name }}</p>
                <p class="series-release-date">{{ formatDate(item.first_air_date) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
span {
  color: #f5c518;
}
* {
  font-family: 'Star Jedi', sans-serif;
}
body {
    background-color: #000;
    color: #fff;
    margin: 0;
    font-family: Arial, sans-serif;
}

.series-genres {
    background-color: #000;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;
}

.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
}
h1 {
    text-align: center !important;
}
.genre-item {
    background-color: #000;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    align-self: center;
    color: #f5c518;
    display: flex;
    justify-content: center;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #f5c518;
    color: #000;
    box-shadow: 0 0 0.5rem #f5c518;
}

.series-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.series-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.series-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.series-details {
    padding: 0 0.5rem;
}

.series-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
}
</style>
