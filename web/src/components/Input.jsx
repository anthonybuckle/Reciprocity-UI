import React from 'react';

class Input extends React.Component {
  render() {
    const type = this.props.type ? this.props.type : 'text';
    return (
      <input 
        type={type}
        step={this.props.step}
        value={this.props.value} 
        onClick={this.props.onClick} 
        onChange={this.props.onChange}
        className={this.props.className} />
    );
  }
}

export default Input;