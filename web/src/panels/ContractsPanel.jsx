import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Button from '../components/Button'
import Input from '../components/Input'
import Table from '../components/Table'
import { getContracts, watchContracts, deleteContracts } from "shared";
import { CONTRACTS_RELOAD } from "shared";

class ContractsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      contract: null
    };
  }

  componentDidMount() {
    const { loading, payload } = this.props.accounts;
    if (!loading && (payload == null || payload.contracts == null)) {
      this.props.dispatch(getContracts());
    }
  }

  componentDidUpdate() {
    const { payload } = this.props.contracts;
    if (payload === CONTRACTS_RELOAD) {
      this.props.dispatch(getContracts());
    }
  }

  selectedCallback = (selected) => {
    this.setState({
      selected
    });
  }

  onContractChange = (event) => {
    this.setState({
      contract: event.target.value
    });
  }


  watchContracts = (event) => {
    this.props.dispatch(watchContracts(this.state.contract));
  }

  deleteContracts = (event) => {
    this.props.dispatch(deleteContracts(this.state.selected));
  }

  render() {
    const { error, loading, payload } = this.props.contracts;

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
      title: 'Contract Address',
      key: 'address',
      type: 'string'
    });
    headers.push({
      title: 'Balance',
      key: 'balance',
      type: 'decimal'
    });

    const body = [];
    if (payload && payload.contracts && payload.contracts.length > 0) {
      body.push(...payload.contracts);
    }

    return (
      <div className="grid-container-content">
        <div className="header">
          <div>
            <h2>Contracts</h2>
          </div>
          <div className="header_buttons">
            <Input onChange={this.onContractChange} />
            <Button title="Watch Contract" onClick={this.watchContracts} />
            <Button title="Delete Contracts" onClick={this.deleteContracts} />
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

export default connect(mapStateToProps)(ContractsPanel);