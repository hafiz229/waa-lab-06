import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CommentProvider } from "./context/CommentContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CommentProvider>
    <App />
  </CommentProvider>
);
