import React, { Component } from 'react';
import { 
    Button,
    StyleSheet, 
    Text,
    Image,
    View 
} from 'react-native';
import reciprocity_logo from 'shared/img/reciprocity_logo.png';

class HomePanel extends Component {
    static navigationOptions = {
        headerStyle: {
          backgroundColor: '#a044ff',
        },
      };

    render() {
        return (
            <View style={styles.content}>
                <Image source={reciprocity_logo} style={styles.image} />
                <Text style={styles.header}>Home</Text>
                <Button 
                    title='Accounts'
                    onPress={() => this.props.navigation.navigate('accounts')}
                    color={'white'}
                />
                <Button 
                    title='Send'
                    onPress={() => this.props.navigation.navigate('send')}
                    color={'white'}
                />
                <Button 
                    title='Mining'
                    onPress={() => this.props.navigation.navigate('mining')}
                    color={'white'}
                />
                <Button
                    title='Contracts'
                    onPress={() => this.props.navigation.navigate('contracts')}
                    color={'white'}
                />
                <Button
                    title='Script'
                    onPress={() => this.props.navigation.navigate('script')}
                    color={'white'}
                />
                <Button
                    title='Peers'
                    onPress={() => this.props.navigation.navigate('peers')}
                    color={'white'}
                />
                <Button 
                    title='About'
                    onPress={() => this.props.navigation.navigate('about')}
                    color={'white'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a044ff' 
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
    },
    image: {
        width: 200, 
        height: 200
    }
});

export default HomePanel;