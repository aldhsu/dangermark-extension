import React from 'react';
import { render } from 'react-dom';
import Overlay from '../components/overlay.jsx';

export default class Warning {
  constructor({context: window, doc: document}) {
    this.doc = doc;
    this.context = context;
    this.warning = null;
  }

  async apply() {
    await this._testPage();
    if (!this.warning) return;

    this._injectRoot();
    this._attachOverlay();
  }

  async _testPage() {
    try {
      const url = this.context.location.toString();
      const warnings = await browser.storage.local.get().then((settings) => { return settings.warnings });
      const address = Object.keys(warnings).find((address) => {
        const re = new RegExp(address);
        return url.match(re);
      });
      if (!address) return;

      this.warning = warnings[address];
      console.log(this.warning);
    } catch(e) {
      throw e;
    }
  }

  _buildCSS() {
`
  #page-warning-extension-overlay::before {
    content: '${this.warning.words || 'Warning'}';
    font-size: 160px;
    transform: rotate(-45deg);
    display: block;
    position: relative;
    margin: 0 auto;
  }
`
  }
  _injectRoot() {
    this.injectedRoot = this.doc.createElement('div');
    this.injectedRoot.id = "page-warning-extension-overlay";
    this.doc.body.appendChild(this.injectedRoot);
  }

  _attachOverlay() {
    render(<Overlay settings={this.warning}/>, this.injectedRoot);
  }

}

