import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Button from '../components/Button'
import Table from '../components/Table'
import { getAccounts, getNewAccount, deleteAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";

class AccountsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
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

  selectedCallback = (selected) => {
    this.setState({
      selected
    });
  }

  getNewAccount = (event) => {
    this.props.dispatch(getNewAccount());
  }

  deleteAccounts = (event) => {
    this.props.dispatch(deleteAccounts(this.state.selected));
  }

  render() {
    const { error, loading, payload } = this.props.accounts;

    if (error) {
      return <div>{error}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const headers = [];

    headers.push({
      title: '',
      key: 'address',
      type: 'checkbox'
    });
    headers.push({
      title: 'Public Address',
      key: 'address',
      type: 'string'
    });
    headers.push({
      title: 'Balance',
      key: 'balance',
      type: 'decimal'
    });

    const body = [];
    if (payload && payload.accounts && payload.accounts.length > 0) {
      body.push(...payload.accounts);
    }

    return (
      <div className="grid-container-content">
        <div className="header">
          <div>
            <h2>Accounts</h2>
          </div>
          <div className="header_buttons">
            <Button title="New Account" onClick={this.getNewAccount} />
            <Button title="Delete Accounts" onClick={this.deleteAccounts} />
          </div>
        </div>
        <div className="content">
          <Table headers={headers} body={body} selectedCallback={this.selectedCallback} />
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

export default connect(mapStateToProps)(AccountsPanel);