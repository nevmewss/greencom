import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContactPage from "../../app/contact/page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>,
);
