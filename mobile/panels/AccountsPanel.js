import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import ButtonExt from '../components/ButtonExt';
import Table from '../components/Table';
import { getAccounts, getNewAccount, deleteAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";

class AccountsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#a044ff',
        },
    };

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
            return <Text>{error}</Text>;
        }

        if (loading) {
            return <Text>Loading...</Text>;
        }

        const headers = [];

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
            <View style={styles.content}>
                <View style={{flex: 1}}>
                    <Text style={styles.header}>Accounts</Text>
                </View>
                <View style={styles.header_buttons}>
                    <ButtonExt title="New Account" onPress={this.getNewAccount} color='white' />
                    <ButtonExt title="Delete Accounts" onPress={this.deleteAccounts} color='white' />
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

export default connect(mapStateToProps)(AccountsPanel);