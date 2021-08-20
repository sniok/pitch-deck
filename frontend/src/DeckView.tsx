import { useState } from "react";
import { baseUrl, Deck } from "./api";
import { Content, Heading, IllustratedMessage } from "@adobe/react-spectrum";
import styled from "styled-components";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const DeckViewContainer = styled.div``;

export function DeckView({ deck }: { deck: Deck | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <DeckViewContainer>
      {deck === undefined || deck.images.length === 0 ? (
        <IllustratedMessage>
          <NotFound />
          <Heading>No deck yet</Heading>
          <Content>Try uploading a pdf file</Content>
        </IllustratedMessage>
      ) : (
        <>
          <Heading>Pitch deck</Heading>
          {deck.images.map((it) => (
            <div onClick={() => setIsOpen(true)}>
              <img
                loading="lazy"
                src={baseUrl + it.thumbnailSrc}
                alt="deck"
                style={{ maxWidth: "720px" }}
              />
            </div>
          ))}
          {isOpen && (
            <Lightbox
              mainSrc={baseUrl + deck.images[imageIndex].src}
              nextSrc={
                baseUrl + deck.images[(imageIndex + 1) % deck.images.length].src
              }
              prevSrc={
                baseUrl +
                deck.images[
                  (imageIndex + deck.images.length - 1) % deck.images.length
                ].src
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setImageIndex(
                  (imageIndex + deck.images.length - 1) % deck.images.length
                )
              }
              onMoveNextRequest={() =>
                setImageIndex(
                  (imageIndex + deck.images.length + 1) % deck.images.length
                )
              }
            />
          )}
        </>
      )}
    </DeckViewContainer>
  );
}
