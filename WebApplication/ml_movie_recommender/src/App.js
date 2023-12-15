import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './backend_js/pages/Home';
import RecommendationPage from './backend_js/pages/RecommendationPage';
import Login from './backend_js/pages/Login';
import NoPage from './backend_js/pages/NoPage';
import reportWebVitals from './reportWebVitals';
import Header from './backend_js/components/HeaderComponent'
import UserPage from './backend_js/pages/UserPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recommendation" element={<RecommendationPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/userpage" element={<UserPage/>} />
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
