import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';

class TextInputExt extends React.Component {
  render() {
    const value = this.props.value ? this.props.value.toString() : null;
    return (
        <TextInput
            style={styles.content}
            onChangeText={this.props.onChangeText}
            value={value}
            keyboardType={this.props.keyboardType}
            multiline={this.props.multiline}
        />
    );
  }
}

const styles = StyleSheet.create({
  content: { 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

export default TextInputExt;

