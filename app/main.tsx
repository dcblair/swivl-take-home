import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          {/* Treating Details tab as index */}
          <Route index element={<span>Details</span>} />
          <Route path="/cortex" element={<span>Cortex</span>} />
          <Route path="/escalations" element={<span>Escalations</span>} />
          <Route path="/sequences" element={<span>Sequences</span>} />
          <Route
            path="/locations-variables"
            element={<span>Locations and Variables</span>}
          />
          <Route path="/spot-is" element={<span>spot.is</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
