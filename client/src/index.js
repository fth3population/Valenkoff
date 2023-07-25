import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import TemplateContextProvider from "./contexts/TemplateContext";
import Store from "./store/store";

const store = new Store();
export const Context = createContext({
    store,
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider value={{store}}>
        <React.StrictMode>
            <TemplateContextProvider>
                <Router>
                    <App />
                </Router>
            </TemplateContextProvider>
        </React.StrictMode>
    </Context.Provider>
);

