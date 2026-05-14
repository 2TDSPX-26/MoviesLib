import axios from "axios";

const API_URL = "https://movies-api.eric-brito.workers.dev/movies"

export const getMovies = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}

export const addMovie = async (movie) => {
    const response = await axios.post(API_URL, movie)
    return response.data
}

export const updateMovie = async (id, movie) => {
    const response = await axios.put(`${API_URL}/${id}`, movie)
    return response.data
}