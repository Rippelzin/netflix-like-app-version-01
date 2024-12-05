import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../../../styles/AdminForm.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Select from "react-select";

function CreateSerieForm() {
    // Inicializa o React Hook Form
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Opções de gêneros para o campo de gêneros
    const genresOptions = [
        { value: "acao", label: "Ação" },
        { value: "comedia", label: "Comédia" },
        { value: "terror", label: "Terror" },
        { value: "suspense", label: "Suspense" },
        { value: "drama", label: "Drama" },
        { value: "kids", label: "KIDS" }
    ];

    // Variável e função para cuidar da lista de gêneros
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions || []);
        // Aqui registramos os gêneros diretamente no React Hook Form
        setValue("genres", selectedOptions.map(option => option.value)); // Alterado para 'genres'
    };

    // Função chamada ao enviar o formulário
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token"); // Obtém o token do localStorage
        try {
            const response = await axios.post(
                "http://localhost:3000/api/series",  // URL para adicionar séries
                {
                    ...data,
                    genres: data.genres.join(",") // Alterado para 'genres'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Configura o token de autorização
                    }
                }
            );

            // Exibe notificação de sucesso
            toast.success("✅ Série adicionada com sucesso! ✅", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            // Resetando o formulário e limpando o estado do Select
            reset();
            setSelectedGenres([]);  // Limpa a seleção de gêneros manualmente após o envio

        } catch (error) {
            console.log(error);
            // Exibe notificação de erro
            toast.error("❌ Ocorreu um erro ao adicionar a série! ❌", {
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
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Criar Série</h3>

                <label>
                    Título:
                    <input
                        className={styles.input}
                        {...register("title", { required: "O título é obrigatório" })}
                        placeholder="Digite o título da série"
                    />
                    {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                </label>

                <label>
                    Descrição:
                    <textarea
                        className={styles.input}
                        {...register("description", { required: "A descrição é obrigatória" })}
                        placeholder="Digite a descrição da série"
                    ></textarea>
                    {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                </label>

                <label>
                    Duração (em minutos por episódio):
                    <input
                        className={styles.input}
                        type="number"
                        {...register("duration", { 
                            required: "A duração é obrigatória", 
                            min: { value: 1, message: "A duração deve ser maior que 0 minutos" } 
                        })}
                        placeholder="Digite a duração do episódio"
                    />
                    {errors.duration && <span className={styles.error}>{errors.duration.message}</span>}
                </label>

                <label>
                    Número de Episódios:
                    <input
                        className={styles.input}
                        type="number"
                        {...register("episode_count", { 
                            required: "O número de episódios é obrigatório", 
                            min: { value: 1, message: "Deve haver pelo menos 1 episódio" } 
                        })}
                        placeholder="Digite o número de episódios"
                    />
                    {errors.episodes && <span className={styles.error}>{errors.episodes.message}</span>}
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

                <div>
                    <label>
                        Gêneros:
                        <Select
                            options={genresOptions}
                            isMulti
                            value={selectedGenres}
                            onChange={handleGenreChange}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
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
                </div>

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
                        placeholder="Digite a URL da capa da série"
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
                        placeholder="Digite a URL do vídeo da série"
                    />
                    {errors.video_url && <span className={styles.error}>{errors.video_url.message}</span>}
                </label>

                <button className={styles.button} type="submit">
                    Adicionar Série
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default CreateSerieForm;
