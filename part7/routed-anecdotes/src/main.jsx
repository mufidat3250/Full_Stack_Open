import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {NoticiationProviderContext} from './context/notificationContext'

ReactDOM.createRoot(document.getElementById("root")).render(
 <NoticiationProviderContext>
     <BrowserRouter>
    <App />
  </BrowserRouter>
 </NoticiationProviderContext>
);
