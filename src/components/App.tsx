import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PageSkeleton from './common/PageSkeleton';
import ScrollToTop from './common/ScrollToTop';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const DeliveryPage = lazy(() => import('./pages/DeliveryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const VacanciesPage = lazy(() => import('./pages/VacanciesPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

const App = () => {
  return (
    <Router>
      <ScrollToTop />
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
              <Route path="/vacancies" element={<VacanciesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 