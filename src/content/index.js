import React from 'react';
import Warning from './lib/warning';
import { render } from 'react-dom';
import Overlay from './components/overlay.jsx';

async function bootStrap() {
  const warning = await new Warning().testPage();
  if (!warning.shouldWarn) return;

  const injectedRoot = document.createElement('div');
  injectedRoot.id = 'page-warning-extension-overlay';
  document.body.appendChild(injectedRoot);

  render(
    React.createElement(Overlay, { settings: warning }, null),
    injectedRoot,
  );
}

bootStrap();
