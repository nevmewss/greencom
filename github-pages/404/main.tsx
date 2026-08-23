import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CmsPage } from "../../app/components/cms-page";
import "../../app/globals.css";

const requestedPath = decodeURIComponent(window.location.pathname).replace(/^\/+|\/+$/g, "");
const slug = requestedPath !== "" && !requestedPath.includes("/") ? requestedPath : "404";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CmsPage slug={slug} />
  </StrictMode>,
);
