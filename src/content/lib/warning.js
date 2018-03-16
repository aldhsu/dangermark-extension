export default class Warning {
  constructor({context = window} = {}) {
    this.context = context;
    this.warning = null;
  }

  get shouldWarn() {
    return this.warning;
  }

  async testPage() {
    try {
      const url = this.context.location.toString();
      const warnings = await browser.storage.local.get().then((settings) => { return settings.warnings });
      const address = Object.keys(warnings).find((address) => {
        const re = new RegExp(address);
        return url.match(re);
      });
      if (!address) return;

      this.warning = warnings[address];
    } catch(e) {
      throw e;
    }

    return this;
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
}

