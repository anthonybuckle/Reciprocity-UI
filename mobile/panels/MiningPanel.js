import React, { Component } from 'react';
import { connect } from "react-redux";
import PickerExt from '../components/PickerExt'
import ButtonExt from '../components/ButtonExt'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'

class MiningPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: null
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

    onAddressChange = (value) => {
        this.setState({
            address: value
        });
    }

    render() {
        const { error, loading, payload } = this.props.accounts;

        if (error) {
            return <Text>{error}</Text>;
        }

        if (loading) {
            return <Text>Loading...</Text>;
        }

        let items = [];
        if (payload && payload.accounts && payload.accounts.length > 0) {
            items = payload.accounts.map((account) => {
                return {
                    title: `${account.address} (${account.balance})`,
                    key: account.address
                }
            });
        }

        return (
            <View style={styles.content}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Mining</Text>
                </View>
                <View style={{flex: 6}}>
                    <View>
                        <Text style={styles.body_text}>Mining Account</Text>
                        <PickerExt items={items} onValueChange={this.onAddressChange} selectedValue={this.state.address} />
                    </View>
                    <View>
                        <ButtonExt title="Start Mining" onPress={this.onStartClick} color='white' />
                        <ButtonExt title="Stop Mining" onPress={this.onStopClick} color='white' />
                    </View>
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
    },
    body_text: {
        color: "white",
        fontSize: 18,
        padding: 5
    }
});

function mapStateToProps(state, ownProps) {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(MiningPanel);