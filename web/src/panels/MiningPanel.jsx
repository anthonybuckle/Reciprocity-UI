import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Select from '../components/Select'
import Button from '../components/Button'
import Label from '../components/Label'
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'

class MiningPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null
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
            address: accounts[0].address
          };
        }
      }
    }
    return null;
  }

  onStartClick = () => {
    this.handleMiningWorker(true)
  }

  onStopClick = () => {
    this.handleMiningWorker(false)
  }

  handleMiningWorker = (isMining) => {
    const body = {
      'jsonrpc': '2.0', 
      'method': 'GetMiningWorker', 
      'params': {
        'address': this.state.address, 
        'enabled': isMining
      }, 
      'id': 1
    };

    postRequest(body)            
      .then(json => {
        alert(json.result);
      });
  }

  onAddressChange = (event) => {
    this.setState({
      address: event.target.value
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
                <h2>Mining</h2>
            </div>
          </div>
          <div className="content inner_content">
            <div className="label_content">
              <Label text={'Mining Account:'} />
              <Select options={options} onChange={this.onAddressChange} />
            </div>
            <div>
              <Button title="Start Mining" onClick={this.onStartClick} />
              <Button title="Stop Mining" onClick={this.onStopClick} />
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

export default connect(mapStateToProps)(MiningPanel);
