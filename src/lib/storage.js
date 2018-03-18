export default class Storage {
  async initializeSettings() {
    const settings = await browser.storage.local.get()
    settings.warnings = settings.warnings || {};
    return await browser.storage.local.set(settings);
  }

  async removeOption(address) {
    const settings = await browser.storage.local.get();
    delete settings.warnings[address];
    return await browser.storage.local.set(settings);
  }

  async addOption(address, options) {
    const settings = await browser.storage.local.get()
    settings.warnings[address] = options;
    return await browser.storage.local.set(settings);
  }

  async getWarnings() {
    const settings = await browser.storage.local.get();
    const {warnings = {}} = settings;
    return warnings;
  }
}

