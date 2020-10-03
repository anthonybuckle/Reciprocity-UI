import React, { Component } from 'react';
import { connect } from "react-redux";
import ButtonExt from '../components/ButtonExt'
import TextInputExt from '../components/TextInputExt'
import PickerExt from '../components/PickerExt'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getAccounts } from "shared";
import { ACCOUNTS_RELOAD } from "shared";
import { postRequest } from 'shared'

class ScriptPanel extends Component {
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

    keccak256(value) {
        return value;
    }

    onSendClick = () => {
        const parameters = this.state.parameters;

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

    onFromAddressChange = (value) => {
        this.setState({
            from: value
        });
    }

    onScriptChange = (value) => {
        this.setState({
            script: value
        });
    }

    onParametersChange = (value) => {
        this.setState({
            parameters: value
        });
    }

    onFeeChange = (value) => {
        this.setState({
            fee: value
        });
    }

    onValueChange = (value) => {
        this.setState({
            value: value
        });
    }

    onDeployChange = (value) => {
        this.setState({
            deploy: value
        });
    }

    onLocalChange = (value) => {
        this.setState({
            local: value
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
                    <Text style={styles.header}>Script</Text>
                </View>
                <View style={{flex: 6}}>
                    <View>
                        <Text style={styles.body_text}>From Address</Text>
                        <PickerExt items={items} onValueChange={this.onFromAddressChange} selectedValue={this.state.from} />
                        <Text style={styles.body_text}>Script</Text>
                        <TextInputExt onChangeText={this.onScriptChange} multiline={true} />
                        <Text style={styles.body_text}>Parameters</Text>
                        <TextInputExt onChangeText={this.onParametersChange} multiline={true} />
                        <Text style={styles.body_text}>Fee</Text>
                        <TextInputExt value={this.state.fee} onChangeText={this.onFeeChange} keyboardType="numeric" />
                        <Text style={styles.body_text}>Value</Text>
                        <TextInputExt onChangeText={this.onValueChange} keyboardType="numeric" />
                        <Text style={styles.body_text}>Deploy</Text>
                        <TextInputExt onChangeText={this.onDeployChange} />
                        <Text style={styles.body_text}>Local Call</Text>
                        <TextInputExt onChangeText={this.onLocalChange} />
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

export default connect(mapStateToProps)(ScriptPanel);