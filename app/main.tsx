import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import LocationsAndVariables from "@/pages/locations-and-variables";
import "./tailwind.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />}>
            {/* Treating Details tab as index */}
            <Route index element={<span>Details</span>} />
            <Route path="/cortex" element={<span>Cortex</span>} />
            <Route path="/escalations" element={<span>Escalations</span>} />
            <Route path="/sequences" element={<span>Sequences</span>} />
            <Route
              path="/locations-and-variables"
              element={<LocationsAndVariables />}
            />
            <Route path="/spot-is" element={<span>spot.is</span>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
