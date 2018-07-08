import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
//import './app.global.css';
import 'semantic-ui-css/components/list.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/step.min.css';
import 'semantic-ui-css/components/grid.min.css';
import 'semantic-ui-css/components/segment.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/table.min.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}