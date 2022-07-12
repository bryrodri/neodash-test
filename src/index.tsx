import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { Auth0Provider } from "@auth0/auth0-react";

/**
 * Set up the NeoDash application and wrap it in the needed providers.
 */
const store = configureStore();

// @ts-ignore
const persister = persistStore(store);

/** Wrap the application in a redux provider / browser cache persistance gate **/
const provider = <ReduxProvider store={store}>
    <PersistGate persistor={persister} loading={<div>Loading NeoDash...</div>}>
    <Auth0Provider
    domain="dev-5ftozwok.us.auth0.com"
    clientId="85DNNVlBLOrHQHTztjJwUJZnRSyMQEiZ"
    redirectUri={window.location.origin}
    >
        <App/>
    </Auth0Provider>
    </PersistGate>
</ReduxProvider>

ReactDOM.render(<React.StrictMode>{provider}</React.StrictMode>, document.getElementById('root'));