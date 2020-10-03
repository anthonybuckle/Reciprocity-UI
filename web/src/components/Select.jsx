import React from 'react';

class Select extends React.Component {
  render() {
    return (
      <select onChange={this.props.onChange}>
        {
          this.props.options.map((option) => {
            return (
              <option key={option.key} value={option.key}>{option.title}</option>
            )
          })
        }
      </select> 
    );
  }
}

export default Select;