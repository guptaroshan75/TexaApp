import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'

interface splash {
    navigation: any
}

const Splash: React.FC<splash> = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('Login');
        }, 2000)
    }, [])
    
    return (
        <View style={styles.container}>
            <Image source={require('../Images/texa.png')} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#39A7FF',
    },
})