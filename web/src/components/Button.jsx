import React from 'react';

class Button extends React.Component {
  render() {
    const className = this.props.className ? this.props.className : "button_default";
    return (
      <button className={className} onClick={this.props.onClick}>{this.props.title}</button>
    );
  }
}

export default Button;