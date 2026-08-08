import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PricePage from "../../app/price/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PricePage />
  </StrictMode>,
);
