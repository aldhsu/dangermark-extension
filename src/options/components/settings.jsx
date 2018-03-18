import React from 'react';
import WarningBuilder from './warning_builder';
import Warning from './warning';

export default class Settings extends React.Component {
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

