import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
    </BrowserRouter>
      </Suspense>
  </React.StrictMode>
);

reportWebVitals();