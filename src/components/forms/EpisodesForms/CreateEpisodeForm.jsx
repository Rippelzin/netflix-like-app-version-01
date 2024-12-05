import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "../../../styles/AdminForm.module.css";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CreateEpisodeForm() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [selectedSeries, setSelectedSeries] = useState(null);  // Estado para armazenar a série selecionada
    const [filteredTitles, setFilteredTitles] = useState([]);    // Títulos filtrados pelo input

    //1. Puxar a lista de séries para buscar
    const { data: seriesNamesList, loading, error } = useFetch("http://localhost:3000/api/series/names");

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar as séries.</p>;

    //2. Função para filtrar os títulos das séries
    const handleInputChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filtered = seriesNamesList
            .filter(series => series.title.toLowerCase().includes(searchValue))
            .map(series => series.title);

        setFilteredTitles(filtered);
    };

    //3. Função para quando um título de série é selecionado
    const handleTitleSelect = async (title) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:3000/api/series/getSeries",
                { title },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const series = response.data[0][0];  // Obtemos os dados da série
            setSelectedSeries(series);            // Atualiza o estado com os dados da série
            setFilteredTitles([]);                // Limpa as sugestões de busca

            // Preenche o formulário com os dados da série
            setValue("title", series.title);
            setValue("description", series.description);
            setValue("duration", series.duration);
            setValue("age_rating", series.age_rating);
            setValue("cover_image_url", series.cover_image_url);
            setValue("video_url", series.video_url);

        } catch (error) {
            console.error("Erro ao buscar os detalhes da série:", error.message);
        }
    };

    // Função chamada ao enviar o formulário
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/episodes",
                {
                    series_id: selectedSeries.series_id,  // Associa o episódio à série selecionada
                    ...data
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Exibe notificação de sucesso
            toast.success("✅ Episódio Adicionado com sucesso! ✅", {
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
            setSelectedSeries(null);

        } catch (error) {
            console.error("Erro ao adicionar o episódio:", error);
            toast.error("❌ Ocorreu um erro ao adicionar o episódio! ❌", {
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
            {/* Se não for selecionada uma série, exibe o campo de busca */}
            {!selectedSeries && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Buscar Série</h3>
                    <label>
                        Título da Série:
                        <input
                            className={styles.input}
                            {...register("searchTitle", { required: "O título é obrigatório para buscar" })}
                            placeholder="Digite o título da série"
                            onChange={handleInputChange}
                        />
                        {errors.searchTitle && <span className={styles.error}>{errors.searchTitle.message}</span>}
                    </label>

                    {/* Sugestões de séries */}
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
                        Buscar Série
                    </button>
                </form>
            )}

            {/* Se a série for selecionada, exibe o formulário para adicionar o episódio */}
            {selectedSeries && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Adicionar Episódio para: {selectedSeries.title}</h3>

                    <label>
                        Título do Episódio:
                        <input
                            className={styles.input}
                            {...register("episode_title", { required: "O título do episódio é obrigatório" })}
                            placeholder="Digite o título do episódio"
                        />
                        {errors.episode_title && <span className={styles.error}>{errors.episode_title.message}</span>}
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            className={styles.input}
                            {...register("description", { required: "A descrição é obrigatória" })}
                            placeholder="Digite a descrição do episódio"
                        />
                        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                    </label>

                    <label>
                        Duração (em minutos):
                        <input
                            className={styles.input}
                            type="number"
                            {...register("duration", { required: "A duração é obrigatória" })}
                            placeholder="Digite a duração do episódio"
                        />
                        {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
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
                        Adicionar Episódio
                    </button>
                </form>
            )}

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
}

export default CreateEpisodeForm;
