import React from 'react';
import {
  Button
} from 'react-native';

class ButtonExt extends React.Component {
  render() {
    return (
      <Button
        title={this.props.title}
        onPress={this.props.onPress}
        color={this.props.color}
      />
    );
  }
}

export default ButtonExt;