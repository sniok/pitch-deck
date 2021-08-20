import { useState } from "react";
import { Api, Deck } from "./api";
import "./App.css";
import { AppLayout } from "./AppLayout";
import { Provider, lightTheme } from "@adobe/react-spectrum";
import styled from "styled-components";
import { DeckView } from "./DeckView";
import { useEffect } from "react";
import { FileUploader } from "./FileUploader";

export const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #333;
`;

function App() {
  const [deck, setDeck] = useState<undefined | Deck>();

  async function loadDeck() {
    setDeck(await Api.getDeck());
  }

  useEffect(() => {
    loadDeck();
  }, []);

  return (
    <Provider theme={lightTheme} colorScheme="light">
      <AppLayout>
        <FileUploader onUploadSuccessful={loadDeck} />
        <DeckView deck={deck} />
      </AppLayout>
    </Provider>
  );
}

export default App;
