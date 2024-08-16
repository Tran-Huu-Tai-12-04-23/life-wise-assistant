import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';
import store from './redux/store';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <BrowserRouter>
          <Suspense>
              <App />
              <ToastContainer style={{ zIndex: 100000000 }} theme="light" />
          </Suspense>
        </BrowserRouter>
      </LocalizationProvider>
     
    </Provider>
  </HelmetProvider>
);
