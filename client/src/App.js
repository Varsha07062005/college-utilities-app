// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import LostAndFoundPage from './pages/LostAndFoundPage';
import TimetablePage from './pages/TimetablePage';
import HostelComplaintsPage from './pages/HostelComplaintsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import DynamicBackground from './components/layout/DynamicBackground';
import MainLayout from './components/layout/MainLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#e74c3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <DynamicBackground>
            <MainLayout>
              <AnimatePresence mode='wait'>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/announcements" element={<AnnouncementsPage />} />
                    <Route path="/lost-and-found" element={<LostAndFoundPage />} />
                    <Route path="/timetable" element={<TimetablePage />} />
                    <Route path="/hostel-complaints" element={<HostelComplaintsPage />} />
                  </Route>
                  
                  <Route element={<AdminRoute />}>
                    <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
                    <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
                  </Route>
                  
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </MainLayout>
          </DynamicBackground>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;