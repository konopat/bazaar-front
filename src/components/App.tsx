import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PageSkeleton from './common/PageSkeleton';
import ScrollToTop from './common/ScrollToTop';
import { StaticRouter } from 'react-router-dom/server';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const DeliveryPage = lazy(() => import('./pages/DeliveryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const VacanciesPage = lazy(() => import('./pages/VacanciesPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Определяем, работаем ли на сервере или в браузере
const isServer = typeof window === 'undefined';

// Основной контент приложения
const AppContent = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

// Корневой компонент с обработкой серверного и клиентского рендеринга
const App = () => {
  // На клиенте используем BrowserRouter, на сервере - ничего (роутер придет снаружи)
  if (!isServer) {
    return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <AppContent />
      </Router>
    );
  }
  
  // Для сервера возвращаем только контент (StaticRouter будет добавлен внешне)
  return <AppContent />;
};

export default App; 