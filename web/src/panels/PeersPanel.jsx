import React from 'react';
import { connect } from "react-redux";
import './Panels.css';
import Button from '../components/Button'
import Table from '../components/Table'
import Input from '../components/Input'
import { getPeers, addPeers, deletePeers } from "shared";
import { PEERS_RELOAD } from "shared";

class PeersPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      peer: null
    };
  }

  componentDidMount() {
    const { loading, payload } = this.props.accounts;
    if (!loading && (payload == null || payload.peers == null)) {
      this.props.dispatch(getPeers());
    }
  }

  componentDidUpdate() {
    const { payload } = this.props.peers;
    if (payload === PEERS_RELOAD) {
      this.props.dispatch(getPeers());
    }
  }

  selectedCallback = (selected) => {
    this.setState({
      selected
    });
  }

  onPeerChange = (event) => {
    this.setState({
      peer: event.target.value
    });
  }

  addPeers = (event) => {
    this.props.dispatch(addPeers(this.state.peer));
  }

  deletePeers = (event) => {
    this.props.dispatch(deletePeers(this.state.selected));
  }

  render() {
    const { error, loading, payload } = this.props.peers;

    if (error) {
      return <div>{error}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const headers = [];

    headers.push({
      title: '',
      key: 'peers',
      type: 'checkbox'
    });
    headers.push({
      title: 'Peers',
      key: 'peers',
      type: 'string'
    });

    const body = [];
    if (payload && payload.peers && payload.peers.length > 0) {
      body.push(...payload.peers);
    }

    return (
      <div className="grid-container-content">
        <div className="header">
          <div>
            <h2>Peers</h2>
          </div>
          <div className="header_buttons">
            <Input onChange={this.onPeerChange} />
            <Button title="Add Peer" onClick={this.addPeers} />
            <Button title="Delete Peers" onClick={this.deletePeers} />
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

export default connect(mapStateToProps)(PeersPanel);