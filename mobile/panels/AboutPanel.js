import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import reciprocity_logo from 'shared/img/reciprocity_logo.png';

class AboutPanel extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#a044ff',
        },
    };

    render() {
        return (
            <View style={styles.content}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>About</Text>
                </View>
                <View style={{ flex: 12, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={reciprocity_logo} style={styles.image} />
                    <Text style={styles.body_text}>Reciprocity Core</Text>
                    <Text style={styles.body_text}>© 2019 Anthony Buckle, April Buckle</Text>
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
    image: {
        width: 200,
        height: 200,
        padding: 5
    },
    body_text: {
        color: "white",
        fontSize: 18,
        padding: 5
    }
});

export default AboutPanel;