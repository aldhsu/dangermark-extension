import React from 'react';

export default class WarningBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      colour: "",
      words: "",
      css: "",
    };
  }

  updateWarning = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitWarning = (event) => {
    event.preventDefault();
    this.props.addOption(this.state.address, {colour: this.state.colour, words: this.state.words, css: this.state.css});
    this.setState({
      address: "",
      colour: "",
      words: "",
      css: "",
    });
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
