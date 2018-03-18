import React from 'react';
import { render } from 'react-dom';
import Storage from 'storage';
import Settings from './components/settings';


const store = new Storage();
const rootElement = document.getElementById('root');

function renderRoot(settings) {
  render(
    React.createElement(Settings, {warnings: settings.warnings || {}, storage: store}, null),
    rootElement
  );
}

async function initialize() {
  await store.initializeSettings();
  const settings = await store.getSettings();
  renderRoot(settings);

  store.onChange((settings) => {
    renderRoot(settings);
  });
}

initialize();
