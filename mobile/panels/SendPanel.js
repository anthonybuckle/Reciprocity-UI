import React, { Component } from 'react';
import { connect } from "react-redux";
import PickerExt from '../components/PickerExt'
import TextInputExt from '../components/TextInputExt'
import ButtonExt from '../components/ButtonExt'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'

class SendPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            from: null,
            to: null,
            fee: 0.01,
            value: null,
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

    onFromAddressChange = (value) => {
        this.setState({
            from: value
        });
    }

    onToAddressChange = (value) => {
        this.setState({
            to: value
        });
    }

    onFeeChange = (value) => {
        this.setState({
            fee: value
        });
    }

    onValueChange = (value) => {
        this.setState({
            value
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
                    <Text style={styles.header}>Send</Text>
                </View>
                <View style={{flex: 6}}>
                    <View>
                        <Text style={styles.body_text}>From Address</Text>
                        <PickerExt items={items} onValueChange={this.onFromAddressChange} selectedValue={this.state.from} />
                        <Text style={styles.body_text}>To Address</Text>
                        <TextInputExt onChangeText={this.onToAddressChange} />
                        <Text style={styles.body_text}>Fee</Text>
                        <TextInputExt value={this.state.fee} onChangeText={this.onFeeChange} keyboardType="numeric" />
                        <Text style={styles.body_text}>Value</Text>
                        <TextInputExt onChangeText={this.onValueChange} keyboardType="numeric" />
                    </View>
                    <View>
                        <ButtonExt title="Send" onPress={this.onSendClick} color='white' />
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

export default connect(mapStateToProps)(SendPanel);
