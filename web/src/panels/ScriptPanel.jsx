import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import Label from '../components/Label'
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'
import { keccak256 } from 'js-sha3';

class ScriptPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      script: null,
      parameters: null,
      fee: 0.01,
      value: null,
      deploy: null,
      local: null
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
    const parameters = [
      ...this.state.parameters
    ]

    let method;
    let type;
    if (this.state.deploy) {
      if (this.state.local) {
        method = 'DeployLocalScript';
        type = 'Result';
      } else {
        method = 'DeployScript';
        type = 'TxID';
      }
    } else {
      if (this.state.local) {
        method = 'CallLocalScript';
        type = 'Value';
      } else {
        method = 'CallTxScript';
        type = 'Result';
      }
      
      if (parameters && parameters.length > 0) {
        const methodHash = keccak256(parameters[0]);
        parameters[0] = methodHash.substring(0, 8)
      }
    }

    const body = {
      'jsonrpc': '2.0', 
      'method': method, 
      'params': {
        'fromAddress': this.state.from, 
        'script': this.state.script, 
        'parameters': parameters, 
        'value': parseFloat(this.state.value), 
        'gasLimit': 21000,
        'gasPrice': parseFloat(this.state.fee)
      }, 
      'id': 1
    };

    postRequest(body)            
    .then(json => {
      alert(type.concat(': ', json.result));
    });
  }

  onFromAddressChange = (event) => {
    this.setState({
      from: event.target.value
    });
  }

  onScriptChange = (event) => {
    this.setState({
      script: event.target.value
    });
  }

  onParametersChange = (event) => {
    const parameters = event.target.value.split('\n')
    this.setState({
      parameters
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

  onDeployChange = (event) => {
    this.setState({
      deploy: event.target.checked
    });
  }

  onLocalChange = (event) => {
    this.setState({
      local: event.target.checked
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
              <h2>Script</h2>
          </div>
        </div>
        <div className="content inner_content">
          <div className="label_content">
            <Label text={'From Address:'} />
            <Select options={options} onChange={this.onFromAddressChange} />
            <Label text={'Script:'} />
            <TextArea onChange={this.onScriptChange} />
            <Label text={'Parameters:'} />
            <TextArea onChange={this.onParametersChange} />
            <Label text={'Fee:'} />
            <Input type='number' value={this.state.fee} onChange={this.onFeeChange} className='input_number' />
            <Label text={'Value:'} />
            <Input type='number' step='0.00000001' onChange={this.onValueChange} className='input_number' />
            <Label text={'Deploy:'} />
            <Input type="checkbox" className="checkbox" onChange={this.onDeployChange} />
            <Label text={'Local Call:'} />
            <Input type="checkbox" className="checkbox" onChange={this.onLocalChange} />
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

export default connect(mapStateToProps)(ScriptPanel);
