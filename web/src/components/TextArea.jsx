import React from 'react';

class TextArea extends React.Component {
  render() {
    return (
      <textarea 
        onChange={this.props.onChange}
      />
    );
  }
}

export default TextArea;