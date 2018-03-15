import React from 'react';
import { render } from 'react-dom';

class Warning extends React.Component {
  render() {
    return (
      <li>
        <ul>
          <li>
            <label>Address
              <input type="text" readOnly value={this.props.address} />
            </label>
          </li>
          <li>
            <label>Colour
              <input type="text" readOnly value={this.props.options.colour} />
            </label>
          </li>
          <li>
            <label>Words
              <input type="text" readOnly value={this.props.options.words} />
            </label>
          </li>
          <li>
            <label>CSS
              <input type="text" readOnly value={this.props.options.css} />
            </label>
          </li>
          <button onClick={() => {this.props.removeOption(this.props.address)}}>Remove</button>
        </ul>
      </li>
    );
  }
}

class WarningBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      colour: "",
      words: "",
      css: "",
    }
  }

  updateWarning = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitWarning = (event) => {
    event.preventDefault();
    this.props.addOption(this.state.address, {colour: this.state.colour, words: this.state.words, css: this.state.css});
    this.state = {
      address: "",
      colour: "",
      words: "",
      css: "",
    }
  }

  render() {
    return (
      <form>
        <ul>
          <li>
            <label>Address
              <input type="text" name="address" value={this.state.address} onChange={this.updateWarning}/>
            </label>
          </li>
          <li>
            <label>Colour
              <input type="text" name="colour" value={this.state.colour} onChange={this.updateWarning}/>
            </label>
          </li>
          <li>
            <label>Words
              <input type="text" name="words" value={this.state.words} onChange={this.updateWarning}/>
            </label>
          </li>
          <li>
            <label>CSS
              <input type="text" name="css" value={this.state.css} onChange={this.updateWarning}/>
            </label>
          </li>
        </ul>
        <button onClick={this.submitWarning}>Add Warning</button>
      </form>
    );
  }
}

class Settings extends React.Component {
  render() {
      return (
        <>
        <WarningBuilder
          addOption={this.props.storage.addOption}
        />
        <ul>
          {
            Object.keys(this.props.warnings).map((key) => {
              return <Warning
                key={key}
                address={key}
                options={this.props.warnings[key]}
                removeOption={this.props.storage.removeOption}
              />
            })
          }
        </ul>
        </>
    );
  }
}

class Storage {
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
}

const store = new Storage();
const rootElement = document.getElementById('root');

function renderRoot(settings) {
  render(<Settings warnings={settings.warnings || {}} storage={ store }/>, rootElement);
}

store.initializeSettings().then(() => {
  browser.storage.local.get().then((settings) => {
    renderRoot(settings);
  });
});

browser.storage.onChanged.addListener(async () => {
  const settings = await browser.storage.local.get();
  renderRoot(settings);
})
