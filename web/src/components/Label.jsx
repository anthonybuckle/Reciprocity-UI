import React from 'react';

class Label extends React.Component {
  render() {
    return (
      <label>{this.props.text}</label>
    );
  }
}

export default Label;