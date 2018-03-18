import React from 'react';
import { render } from 'react-dom';
import Storage from '../lib/storage';
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
  await store.initializeSettings()
  const settings = await browser.storage.local.get()
  renderRoot(settings);

  browser.storage.onChanged.addListener(async () => {
    const settings = await browser.storage.local.get();
    renderRoot(settings);
  });
}

initialize();
