import React from 'react';

const OPTIONS = [
  {
    name: "Address",
    key: "address",
    type: "text",
  },
  {
    name: "Colour",
    key: "colour",
    type: "text",
  },
  {
    name: "Words",
    key: "words",
    type: "text",
  },
  {
    name: "CSS",
    key: "css",
    type: "text",
  }
];



class OptionField extends React.Component {
  updateWarning = (event) => {
    event.preventDefault();
    this.props.updateField({[this.props.key]: event.target.value})
  }

  render() {
    return (
      <li>
        <label>{this.props.name}
          <input type={this.props.type} onChange={this.updateWarning} value={this.props.address} />
        </label>
      </li>
    )
  }
}

export default class Warning extends React.Component {
  updateField = (event) => {
    event.preventDefault();
    this.props.updateWarning({})
  }

  render() {
    return (
      <li>
        <ul>
          {
            OPTIONS.map(option => {
              return (
                <OptionField name={option.name} updateField={this.updateField} key={option.key} />
              );
            })
          }
          <button onClick={() => {this.props.removeOption(this.props.address)}}>Remove</button>
        </ul>
      </li>
    );
  }
}

