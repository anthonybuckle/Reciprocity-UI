import React from 'react';

class Image extends React.Component {
  render() {
    return (
      <img src={this.props.src} alt={this.props.alt} width={this.props.width} height={this.props.height} />
    );
  }
}

export default Image;