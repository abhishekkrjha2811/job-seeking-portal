import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
    <>
        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#363636',
                },
            }}
        />
        {/* <StrictMode> */}
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        {/* </StrictMode> */}
    </>
);
