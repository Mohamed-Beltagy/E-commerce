import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import AuthContextProvider from './Component/Context/AuthContext';
import CartContextProvider from './Component/Context/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';



const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthContextProvider>

        <CartContextProvider>
          <App />
        </CartContextProvider>

      </AuthContextProvider>


    </QueryClientProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
