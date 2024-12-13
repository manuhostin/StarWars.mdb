<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const genres = ref([]);
const tv = ref([]);
const christmasKeywordId = ref(null); // ID da palavra-chave "Christmas"

// Função para listar programas de TV com base no gênero e palavra-chave "Christmas"
const listTV = async (genreId) => {
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            with_keywords: christmasKeywordId.value, // Filtra pela palavra-chave "Christmas"
            language: 'pt-BR'
        }
    });
    tv.value = response.data.results;
};

// Função para buscar a palavra-chave "Christmas"
const fetchChristmasKeyword = async () => {
    const response = await api.get('search/keyword', {
        params: {
            query: 'Christmas',
            language: 'pt-BR'
        }
    });

    // Se encontrar a palavra-chave "Christmas", armazena o ID
    if (response.data.results.length > 0) {
        christmasKeywordId.value = response.data.results[0].id;
    }
};

onMounted(async () => {
    // Busca pelos gêneros de programas de TV
    const genreResponse = await api.get('genre/tv/list?language=pt-BR');
    genres.value = genreResponse.data.genres;

    // Busca o ID da palavra-chave "Christmas"
    await fetchChristmasKeyword();
});
</script>

<template>
    <h1>Programas de TV de Natal</h1>
    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" @click="listTV(genre.id)" class="genre-item">
            {{ genre.name }}
        </li>
    </ul>
    <div class="tv-list">
        <div v-for="item in tv" :key="item.id" class="tv-card">
            <img
                :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.original_name"
            />
            <div class="tv-details">
                <p class="tv-title">{{ item.original_name }}</p>
                <p class="tv-release-date">{{ item.first_air_date }}</p>
                <p class="tv-genres">{{ item.genre_ids }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
}

.genre-item {
    background-color: #5d6424;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    align-self: center;
    color: #fff;
    display: flex;
    justify-content: center;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #7d8a2e;
    box-shadow: 0 0 0.5rem #5d6424;
}

.tv-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tv-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.tv-details {
    padding: 0 0.5rem;
}

.tv-title {
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
