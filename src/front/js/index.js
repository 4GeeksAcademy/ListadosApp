// Importaciones necesarias
import React from "react";
import ReactDOM from "react-dom";

// Importa el Auth0Provider de la librería de Auth0
import { Auth0Provider } from "@auth0/auth0-react";

// Incluye tu archivo de estilos
import "../styles/index.css";

// Importa tu componente raíz (Layout)
import Layout from "./layout";

// Configura las variables de entorno para Auth0
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

// Renderiza tu aplicación, envolviéndola en el Auth0Provider
ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: audience,
            scope: "openid profile email",
        }}
    >
        <Layout />
    </Auth0Provider>,
    document.querySelector("#app")
);
