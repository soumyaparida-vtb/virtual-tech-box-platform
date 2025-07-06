import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import LearningAreas from './pages/LearningAreas';
import LearningModule from './pages/LearningModule';
import NotFound from './pages/NotFound';
import { UserProvider } from './contexts/UserContext';
import './styles/globals.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#2f447a',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              iconTheme: {
                primary: '#30753c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ee5b39',
                secondary: '#fff',
              },
            },
          }}
        />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/learning-areas" element={<LearningAreas />} />
            <Route path="/learning/:area" element={<LearningModule />} />
            <Route path="/learning/:area/module/:moduleId" element={<LearningModule />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;