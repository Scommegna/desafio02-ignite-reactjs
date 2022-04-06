import { useEffect, useState } from "react";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { api } from "./services/api";
import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

// 1: Ver qual tipo de dado será comum para os componentes, para que sejam passados como argumentos
// 2: Ver quais dados são próprios dos componentes, para que fiquem nos componentes

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  // Estados necessários para todos os componentes
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  // Efeito quando houver mudança de gênero de filme
  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  // Função necessária para a sidebar, mas que necessita de um estado compartilhado
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Componentes */}
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <Content
        selectedGenre={selectedGenre}
        selectedGenreId={selectedGenreId}
      />
    </div>
  );
}
