import React, { Component } from 'react';
import { connect } from "react-redux";
import ButtonExt from '../components/ButtonExt';
import Table from '../components/Table';
import TextInputExt from '../components/TextInputExt';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getPeers, addPeers, deletePeers } from "shared";
import { PEERS_RELOAD } from "shared";

class PeersPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            peer: null
        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#a044ff',
        },
    };

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
            return <Text>{error}</Text>;
        }

        if (loading) {
            return <Text>Loading...</Text>;
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
            <View style={styles.content}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Peers</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TextInputExt onChangeText={this.onPeerChange} />
                </View>
                <View style={styles.header_buttons}>
                    <ButtonExt title="Add Peer" onPress={this.addPeers} color='white' />
                    <ButtonExt title="Delete Peers" onPress={this.deletePeers} color='white' />
                </View>
                <View style={{ flex: 12 }}>
                    <Table headers={headers} body={body} selectedCallback={this.selectedCallback} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a044ff'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
        padding: 10
    },
    header_buttons: {
        flex: 1,
        flexDirection: 'row'
    }
});

function mapStateToProps(state, ownProps) {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(PeersPanel);