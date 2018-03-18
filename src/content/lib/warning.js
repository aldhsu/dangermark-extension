import Storage from 'storage';

export default class Warning {
  constructor({context = window} = {}) {
    this.context = context;
    this.warning = null;
  }

  get shouldWarn() {
    return !!this.warning;
  }

  async testPage() {
    try {
      const url = this.context.location.toString();
      const warnings = await new Storage().getWarnings();
      const address = Object.keys(warnings).find((address) => {
        const re = new RegExp(address);
        return url.match(re);
      });

      this.warning = warnings[address];
    } catch(e) {
      throw e;
    }

    return this;
  }
}
