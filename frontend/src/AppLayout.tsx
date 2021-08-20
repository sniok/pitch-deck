import { Button } from "@adobe/react-spectrum";
import React, { ReactNode } from "react";
import styled from "styled-components";

const AppLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppNavbar = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #dadada;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const AppContent = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
`;

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayoutContainer>
      <AppNavbar>
        🚀{" "}
        <Button
          elementType="a"
          target="_blank"
          variant="primary"
          marginStart="auto"
          href="https://github.com/sniok/pitch-deck"
        >
          code
        </Button>
      </AppNavbar>
      <AppContent>{children}</AppContent>
    </AppLayoutContainer>
  );
}
