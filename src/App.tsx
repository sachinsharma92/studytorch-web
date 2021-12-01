import AppRouter from './AppRouter';
import perisistStore from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import './styles/css/antd.css';
import './styles/App.scss';

const { store, persistor } = perisistStore;
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app-container">
          <AppRouter />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;