import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "../../../styles/AdminForm.module.css";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";


function UpdateMovieForm() {
    // Inicializa o React Hook Form
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [selectedMovie, setSelectedMovie] = useState(null); // Estado para armazenar o filme selecionado
    const [filteredTitles, setFilteredTitles] = useState([]); // Títulos filtrados pelo input
    const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados

    // Opções de gêneros para o campo de gêneros
    const genresOptions = [
        { value: "acao", label: "Ação" },
        { value: "comedia", label: "Comédia" },
        { value: "terror", label: "Terror" },
        { value: "suspense", label: "Suspense" },
        { value: "drama", label: "Drama" },
        { value: "kids", label: "KIDS" }
    ];

    //1. Puxar a lista de nomes de filmes
    const { data: moviesNamesList, loading, error } = useFetch("http://localhost:3000/api/movies/names");

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os filmes.</p>;

    //2. Função para filtrar o input com os nomes
    const handleInputChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filtered = moviesNamesList
            .filter(movie => movie.title.toLowerCase().includes(searchValue))
            .map(movie => movie.title);

        setFilteredTitles(filtered);
    };

    //3. handleTitleSelect para puxar as infos do filme selecionado
    const handleTitleSelect = async (title) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:3000/api/movies/getMovie",
                { title },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const movie = response.data[0][0];
            setSelectedMovie(movie); // Atualiza o estado com os dados do filme
            setFilteredTitles([]); // Limpa as sugestões

            // Preenche os campos do formulário com os dados do filme
            setValue("title", movie.title);
            setValue("description", movie.description);
            setValue("duration", movie.duration);
            setValue("age_rating", movie.age_rating);
            setValue("cover_image_url", movie.cover_image_url);
            setValue("video_url", movie.video_url);

            // Preenche os gêneros no React Select
            const genres = movie.genres.split(", "); // Assuming genres is a string like "terror, acao"
            const genresSelect = genresOptions.filter(option => genres.includes(option.value));
            setSelectedGenres(genresSelect);
            setValue("genres", genresSelect);

        } catch (error) {
            console.error("Erro ao buscar os detalhes do filme:", error.message);
        }
    };

    // Função para lidar com mudanças nos gêneros selecionados
    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions || []);
        setValue("genres", selectedOptions.map(option => option.value).join(", ")); // Converte para string separada por vírgulas
    };

    // Função chamada ao enviar o formulário
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                "http://localhost:3000/api/movies",
                {
                    "movie_id": selectedMovie.movie_id,
                    ...data,
                    genres: data.genres // Passa o campo de gêneros como string
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Exibe notificação de sucesso
            toast.success("✅ Filme Atualizado com sucesso! ✅", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reset();
            setSelectedMovie(null);

        } catch (error) {
            console.error("Erro ao atualizar o filme:", error);
            toast.error("❌ Ocorreu um erro ao adicionar o filme! ❌", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div>
            {/* Se não for selecionado um movie, retorna campo de busca de movies */}
            {!selectedMovie && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3>Buscar Filme</h3>
                    <label>
                        Título do Filme:
                        <input
                            className={styles.input}
                            {...register("searchTitle", { required: "O título é obrigatório para buscar" })}
                            placeholder="Digite o título do filme"
                            onChange={handleInputChange}
                        />
                        {errors.searchTitle && <span className={styles.error}>{errors.searchTitle.message}</span>}
                    </label>

                    {/* Sugestões de títulos */}
                    {filteredTitles.map((title, index) => (
                        <li
                            key={index}
                            className={styles.suggestionItem}
                            onClick={() => handleTitleSelect(title)}
                        >
                            {title}
                        </li>
                    ))}

                    <button className={styles.button} type="submit">
                        Buscar Filme
                    </button>
                </form>
            )}

            {/* Se for selecionado um movie, retorna formulário para preencher */}
            {selectedMovie && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Atualizar Filme: {selectedMovie.title}</h3>

                    <label>
                        Título:
                        <input
                            className={styles.input}
                            {...register("title", { required: "O título é obrigatório" })}
                            placeholder="Digite o título do filme"
                        />
                        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            className={styles.input}
                            {...register("description", { required: "A descrição é obrigatória" })}
                            placeholder="Digite a descrição do filme"
                        />
                        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                    </label>

                    <label>
                        Duração (em minutos):
                        <input
                            className={styles.input}
                            type="number"
                            {...register("duration", { required: "A duração é obrigatória" })}
                            placeholder="Digite a duração do filme"
                        />
                        {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
                    </label>

                    <label>
                        Classificação Etária:
                        <input
                            className={styles.input}
                            type="number"
                            {...register("age_rating", { required: "A classificação etária é obrigatória" })}
                            placeholder="Digite a classificação etária"
                        />
                        {errors.age_rating && <span className={styles.error}>{errors.age_rating.message}</span>}
                    </label>

                    <label>
                        Gêneros:
                        <Select
                            options={genresOptions}
                            isMulti
                            value={selectedGenres}
                            onChange={handleGenreChange}
                            placeholder="Selecione os gêneros"
                            styles={{
                                control: (base, state) => ({
                                  ...base,
                                  borderColor: state.isFocused ? 'red' : 'grey',  // Borda vermelha quando focado
                                  backgroundColor: 'black',  // Fundo preto
                                  color: 'red',  // Texto vermelho
                                  padding: '8px',  // Adicionando padding para evitar que o conteúdo fique "justo" ao controle
                                  borderRadius: '4px',  // Definindo borda arredondada
                                  minHeight: '40px',  // Ajustando a altura do controle
                                  boxSizing: 'border-box',  // Garantindo que o padding não quebre o layout
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? 'darkred' : 'black',  // Opção selecionada com fundo vermelho
                                    color: state.isSelected ? 'white' : 'red',  // Texto da opção selecionada
                                    padding: '10px',  // Garantindo que as opções não fiquem comprimidas
                                    '&:hover': {
                                      backgroundColor: 'darkred',  // Cor ao passar o mouse sobre a opção
                                      color: 'white',  // Texto branco ao passar o mouse
                                    },
                                  }),
                            }}
                        />
                        {errors.genres && <span className={styles.error}>{errors.genres.message}</span>}
                    </label>

                    <label>
                        URL da Capa:
                        <input
                            className={styles.input}
                            type="url"
                            {...register("cover_image_url", { required: "A URL da capa é obrigatória" })}
                            placeholder="Digite a URL da capa"
                        />
                        {errors.cover_image_url && <span className={styles.error}>{errors.cover_image_url.message}</span>}
                    </label>

                    <label>
                        URL do Vídeo:
                        <input
                            className={styles.input}
                            type="url"
                            {...register("video_url", { required: "A URL do vídeo é obrigatória" })}
                            placeholder="Digite a URL do vídeo"
                        />
                        {errors.video_url && <span className={styles.error}>{errors.video_url.message}</span>}
                    </label>

                    <button className={styles.button} type="submit">
                        Atualizar Filme
                    </button>
                </form>
            )}

            {/* Toast Notifications */}
            <ToastContainer />
            
        </div>
    );
}

export default UpdateMovieForm;
