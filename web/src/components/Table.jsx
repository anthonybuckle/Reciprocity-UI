import React from 'react';
import Input from '../components/Input'

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  onClick = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      this.setState({
        selected: [
          ...this.state.selected, selectedValue
        ]
      }, () => this.props.selectedCallback(this.state.selected));
    } else {
      this.setState({
        selected: [
          ...this.state.selected.filter((value) => value !== selectedValue)
        ]
      }, () => this.props.selectedCallback(this.state.selected));
    }
  }

  render() {
    this.headers = this.props.headers.map((header, header_idx) =>
      <th key={`header-${header_idx}`}>{header.title}</th>
    );

    this.body = this.props.body.map((body, body_idx) => {
      return (
        <tr key={`row-${body_idx}`}>
          {
            this.props.headers.map((header, header_idx) => {
              let value = body;
              if (value.constructor === Object) {
                value = body[header.key];
              }
              if (header.type === 'checkbox') {
                return (
                  <td key={`column-${body_idx}-${header_idx}`}><Input type={header.type} value={value} onClick={this.onClick} /></td>
                )
              } else {
                return (
                  <td key={`column-${body_idx}-${header_idx}`}>{value}</td>
                )
              }
            })
          }
        </tr>
      )
    });

    return (
      <table className="table_content" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            {this.headers}
          </tr>
        </thead>
        <tbody>
          {this.body}
        </tbody>
      </table>
    );
  }
}

export default Table;