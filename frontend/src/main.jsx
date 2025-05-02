import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx"; // Main app component
import { store, persistor } from "./redux/store"; // Redux store and persistor

import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (for dropdowns, modals...)
import "./index.css"; // Custom styles

// Render the React application to the DOM
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Redux store provider */}
    <Provider store={store}>
      {/* PersistGate delays rendering until persisted state is loaded */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
