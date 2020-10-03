import React from 'react';
import {
    Picker
} from 'react-native';

class PickerExt extends React.Component {
  render() {
    return (
        <Picker onValueChange={this.props.onValueChange} selectedValue={this.props.selectedValue}>
          {
            this.props.items.map((item) => {
              return (
                <Picker.Item key={item.key} label={item.title} value={item.key} color='white' />
              )
            })
          }
        </Picker> 
      );
  }
}

export default PickerExt;