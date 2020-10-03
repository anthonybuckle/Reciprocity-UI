import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      lengthLimit: 32
    };
  }

  onPress = (selectedValue) => {
    this.setState({
      selected: [
        selectedValue
      ]
    }, () => this.props.selectedCallback(this.state.selected));
  }

  render() {
    this.headers = this.props.headers.map((header, header_idx) =>
      <Text key={`header-${header_idx}`} style={styles.header_text}>{header.title}</Text>
    );

    this.body = this.props.body.map((body, body_idx) => {
      return (
        <View key={`row-${body_idx}`} style={styles.body}>
          {
            this.props.headers.map((header, header_idx) => {
              let value = body;
              if (value.constructor === Object) {
                value = body[header.key];
              }
              let displayValue = value;
              if (displayValue.length > this.state.lengthLimit) {
                displayValue = displayValue.substring(0, this.state.lengthLimit);
                displayValue = displayValue.concat('...');
              }
              return (
                <Text
                  key={`column-${body_idx}-${header_idx}`}
                  style={styles.body_text}
                  onPress={() => { this.onPress(value) }}
                >
                  {displayValue}
                </Text>
              )
            })
          }
        </View>
      )
    });

    return (
      <View>
        <View>
          <View style={styles.header}>
            {this.headers}
          </View>
        </View>
        <ScrollView>
          {this.body}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white",
    padding: 5
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body_text: {
    color: "white",
    fontSize: 14,
    padding: 5
  }
});

export default Table;