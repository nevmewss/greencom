import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PartnersRoute from "../../app/partners/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PartnersRoute />
  </StrictMode>,
);
