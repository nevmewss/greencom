import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import VacancyRoute from "../../app/vacancy/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VacancyRoute />
  </StrictMode>,
);
