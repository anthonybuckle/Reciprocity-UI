import React, { Component } from 'react';
import { connect } from "react-redux";
import ButtonExt from '../components/ButtonExt';
import TextInputExt from '../components/TextInputExt';
import Table from '../components/Table';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getContracts, watchContracts, deleteContracts } from "shared";
import { CONTRACTS_RELOAD } from "shared";

class ContractsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            contract: null
        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#a044ff',
        },
    };

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
            return <Text>{error}</Text>;
        }

        if (loading) {
            return <Text>Loading...</Text>;
        }

        const headers = [];

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
            <View style={styles.content}>
                <View style={{flex: 1}}>
                    <Text style={styles.header}>Contracts</Text>
                </View>
                <View style={{flex: 1}}>
                    <TextInputExt onChangeText={this.onContractChange} />
                </View>
                <View style={styles.header_buttons}>
                    <ButtonExt title="Watch Contract" onPress={this.watchContracts} color='white' />
                    <ButtonExt title="Delete Contracts" onPress={this.deleteContracts} color='white' />
                </View>
                <View style={{flex: 12}}>
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

export default connect(mapStateToProps)(ContractsPanel);