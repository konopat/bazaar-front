import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Компоненты
import Header from './layout/Header';
import Footer from './layout/Footer';

// Страницы
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import DeliveryPage from './pages/DeliveryPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import BlogPage from './pages/BlogPage';
import VacanciesPage from './pages/VacanciesPage';
import PrivacyPage from './pages/PrivacyPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 