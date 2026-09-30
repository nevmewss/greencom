import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FaqPage from "../../app/faq/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FaqPage />
  </StrictMode>,
);
