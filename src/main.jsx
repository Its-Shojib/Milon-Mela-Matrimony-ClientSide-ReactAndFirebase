import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./AllRoutes/Routes";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Pages/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HelmetProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);