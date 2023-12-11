import React from 'react';
import ReactDOM from 'react-dom/client';
import RecommendationPage from './backend_js/pages/RecommendationPage';
import Home from './backend_js/pages/Home';
import NoPage from './backend_js/pages/NoPage';
import reportWebVitals from './reportWebVitals';
import Header from './backend_js/components/HeaderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/recommendation" element={<RecommendationPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Header/>
//     <RecommendationPage />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
