import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { AuthProvider } from './auth/auth';
import UserContext from './context/UserIntroContext';
import UserProjectsContext from './context/UserProjectsContext';
import './css/style.css';
import ProudOfContext from './context/ProudOfContext';
import ContactContext from './context/ContactContext';
import UserSocialContext from './context/userSocialContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <UserContext>
          <UserProjectsContext>
            <ProudOfContext>
              <ContactContext>
                <UserSocialContext>
                  <App />
                </UserSocialContext>
              </ContactContext>
            </ProudOfContext>
          </UserProjectsContext>
        </UserContext>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
