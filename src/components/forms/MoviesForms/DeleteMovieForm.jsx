import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "../../../styles/AdminForm.module.css";
import useFetch from "../../../hooks/useFetch";
import axios, { AxiosHeaders } from "axios";
import ConfirmationPopUp from "../../ConfirmationPopUp";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function DeleteMovieForm() {
    // Inicializa o React Hook Form
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [selectedMovie, setSelectedMovie] = useState(null); // Estado para armazenar o filme selecionado
    const [filteredTitles, setFilteredTitles] = useState([]); // Títulos filtrados pelo input
    const [showPopUp, setShowPopUp] = useState(false)

    
   
   
   
   

//1. puxar a lsita de nomes de filme
   const { data: moviesNamesList, loading, error } = useFetch("http://localhost:3000/api/movies/names");
   
   if (loading) return <p>Carregando...</p>;
   if (error) return <p>Erro ao carregar os filmes.</p>;

//2. funcao para filtrar o input com os nomes
   const handleInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();

    // Filtrar apenas os títulos que correspondem ao texto digitado
    const filtered = moviesNamesList
        .filter(movie => movie.title.toLowerCase().includes(searchValue)) // Filtra os objetos
        .map(movie => movie.title); // Extrai apenas os títulos (string)

    setFilteredTitles(filtered); // Atualiza o estado com os títulos
};

//3. handleMovieSelect para puxar as infos do filme selecionado
//4. preencher o formulario com as infos do filme selecionado
const handleTitleSelect = async (title) => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    try {
        const response = await axios.post(
            "http://localhost:3000/api/movies/getMovie",
            {
                title: title
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}` // Configura o token de autorização
                }
            }
        );

        //console.log("Filme selecionado:", response.data[0]); // Loga a resposta para verificar
        const movie = response.data[0][0]
        setSelectedMovie(movie); // Atualiza o estado com os dados do filme
        //console.log(response.data[0][0].title)
        setFilteredTitles([])

        // Preenche os campos do formulário com os dados do filme
        setValue("title", movie.title);
        setValue("description", movie.description);
        setValue("duration", movie.duration);
        setValue("age_rating", movie.age_rating);
        setValue("cover_image_url", movie.cover_image_url);
        setValue("video_url", movie.video_url);
        
    } catch (error) {
        // Loga detalhes do erro
        if (error.response) {
            console.error("Erro no servidor:", error.response.data);
        } else {
            console.error("Erro ao buscar os detalhes do filme:", error.message);
        }
    }
};

 const handleConfirm = async() => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    try {
        const response = await axios.delete("http://localhost:3000/api/movies", {
            headers: {
                Authorization: `Bearer ${token}` // Configura o token de autorização
            },
            data: {
                movie_id: selectedMovie.movie_id // Envia o ID do filme no body da requisição
            }
        });

        // Exibe notificação de sucesso
        toast.success("✅ Filme Deletado com sucesso! ✅", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setSelectedMovie(null); // Limpa o filme selecionado
        setFilteredTitles([])
        setShowPopUp(false); // Fecha o pop-up
    } catch (error) {
        console.error("Erro ao deletar o filme:", error.response?.data || error.message);
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
}

 const handleCancel = () => {
    setShowPopUp(false)
 }



    // Função chamada ao enviar o formulário
    const onSubmit = async (data) => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    try { 
            setShowPopUp(true)
            //reset();
            //setSelectedMovie(null)
    }catch(error){
        console.log(error)
    }
}

    
    return (
        <div>
            {/* se nao for selecionado um movie retorna campo de busca de movies*/ }
         {!selectedMovie && (
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Deletar Filme</h3>
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
                            onClick={() => handleTitleSelect(title)} // Passa apenas o título para a função
                        >
                            {title} {/* Exibe o título do filme */}
                        </li>
                    ))}

                <button className={styles.button} type="submit" >
                    Buscar Filme
                </button>
            </form>
         )}
            
 {/* se for selecionado um movie retorna formulario para preencher*/ }
            {selectedMovie && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Deletar Filme: {selectedMovie.title}</h3>

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
                        ></textarea>
                        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                    </label>

                    <label>
                        Duração (em minutos):
                        <input
                            className={styles.input}
                            type="number"
                            {...register("duration", {
                                required: "A duração é obrigatória",
                                min: { value: 1, message: "A duração deve ser maior que 0 minutos" }
                            })}
                            placeholder="Digite a duração do filme"
                        />
                        {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
                    </label>

                    <label>
                        Classificação Etária:
                        <input
                            className={styles.input}
                            type="number"
                            {...register("age_rating", {
                                required: "A classificação etária é obrigatória",
                                min: { value: 0, message: "Classificação mínima é 0" },
                                max: { value: 18, message: "Classificação máxima é 18" }
                            })}
                            placeholder="Digite a classificação etária"
                        />
                        {errors.age_rating && <span className={styles.error}>{errors.age_rating.message}</span>}
                    </label>

                    <label>
                        URL da Capa:
                        <input
                            className={styles.input}
                            type="url"
                            {...register("cover_image_url", {
                                required: "A URL da capa é obrigatória",
                                pattern: {
                                    value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                                    message: "Digite uma URL válida"
                                }
                            })}
                            placeholder="Digite a URL da capa do filme"
                        />
                        {errors.cover_image_url && <span className={styles.error}>{errors.cover_image_url.message}</span>}
                    </label>

                    <label>
                        URL do Vídeo:
                        <input
                            className={styles.input}
                            type="url"
                            {...register("video_url", {
                                required: "A URL do vídeo é obrigatória",
                                pattern: {
                                    value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                                    message: "Digite uma URL válida"
                                }
                            })}
                            placeholder="Digite a URL do vídeo do filme"
                        />
                        {errors.video_url && <span className={styles.error}>{errors.video_url.message}</span>}
                    </label>

                    <button className={styles.button} type="submit" >
                        Deletar Filme?
                    </button>
                    {showPopUp && (
                        <ConfirmationPopUp message={`Deseja realmente Deletar o filme: ${selectedMovie.title}`}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
                </form>
            )}
            <ToastContainer/>
        </div>
    );
}

export default DeleteMovieForm;
