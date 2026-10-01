import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CaseRoute from "../../app/case/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaseRoute />
  </StrictMode>,
);
