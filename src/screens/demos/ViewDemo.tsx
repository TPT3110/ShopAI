import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ViewDemo() {
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.title}>ShopAI</Text>
                <Text style={styles.caption}>View chỉ là hộp chứa — chữ phải nằm trong Text</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
    },
    title: { fontSize: 22, fontWeight: '700', color: '#FF4D4F' },
    caption: { marginTop: 8, color: '#7F8C8D' },
});

export default ViewDemo;