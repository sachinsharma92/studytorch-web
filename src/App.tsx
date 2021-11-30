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

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Kernify React Template
//         </p>
//         <a
//           className="App-link"
//           href="https://www.kernify.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Kernify Creation Pvt. Limited
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
