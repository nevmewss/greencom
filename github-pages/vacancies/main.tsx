import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import VacanciesRoute from "../../app/vacancies/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VacanciesRoute />
  </StrictMode>,
);
