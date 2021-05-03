import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./context/context";
import { FormProvider } from "./context/form_validate_context";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <FormProvider>
        <App />
      </FormProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
