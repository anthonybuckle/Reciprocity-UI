import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Select from '../components/Select'
import Input from '../components/Input'
import Button from '../components/Button'
import Label from '../components/Label'
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'

class SendPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      fee: 0.01,
      value: null,
    };
  }

  componentDidMount() {
    const { loading, payload } = this.props.accounts;
    if (!loading && (payload == null || payload.accounts == null)) {
      this.props.dispatch(getAccounts());
    }
  }

  componentDidUpdate() {
    const { payload } = this.props.accounts;
    if (payload === ACCOUNTS_RELOAD) {
      this.props.dispatch(getAccounts());
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.address == null) {
      const { loading, payload } = props.accounts;
      if (!loading && payload) {
        const accounts = payload.accounts;
        if (accounts && accounts.length) {
          return {
            from: accounts[0].address
          };
        }
      }
    }
    return null;
  }

  onSendClick = () => {
    const body = {
      'jsonrpc': '2.0', 
      'method': 'SendTransaction', 
      'params': {
        'fromAddress': this.state.from, 
        'toAddress': this.state.to, 
        'value': parseFloat(this.state.value), 
        'gasLimit': 21000,
        'gasPrice': parseFloat(this.state.fee)
      }, 
      'id': 1
    };

    postRequest(body)            
    .then(json => {
      alert(json.result);
    });
  }

  onFromAddressChange = (event) => {
    this.setState({
      from: event.target.value
    });
  }

  onToAddressChange = (event) => {
    this.setState({
      to: event.target.value
    });
  }

  onFeeChange = (event) => {
    this.setState({
      fee: event.target.value
    });
  }

  onValueChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { error, loading, payload } = this.props.accounts;

    if (error) {
      return <div>{error}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    let options = [];
    if (payload && payload.accounts && payload.accounts.length > 0) {
      options = payload.accounts.map((account) => {
        return {
          title: `${account.address} (${account.balance})`,
          key: account.address
        }
      });
    }

    return (
      <div className="grid-container-content">
        <div className="header">
          <div>
              <h2>Send</h2>
          </div>
        </div>
        <div className="content inner_content">
          <div className="label_content">
            <Label text={'From Address:'} />
            <Select options={options} onChange={this.onFromAddressChange} />
            <Label text={'To Address:'} />
            <Input onChange={this.onToAddressChange} />
            <Label text={'Fee:'} />
            <Input type='number' value={this.state.fee} onChange={this.onFeeChange} className='input_number' />
            <Label text={'Value:'} />
            <Input type='number' step='0.00000001' onChange={this.onValueChange} className='input_number' />
          </div>
          <div>
            <Button title="Send" onClick={this.onSendClick} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state
  }
};

export default connect(mapStateToProps)(SendPanel);
