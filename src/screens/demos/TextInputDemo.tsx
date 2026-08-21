import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

function TextInputDemo() {
    const [keyword, setKeyword] = useState('');

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.box}>
                <Text style={styles.label}>Tìm sản phẩm ShopAI</Text>
                <TextInput
                    value={keyword}
                    onChangeText={setKeyword}
                    placeholder="Ví dụ: tai nghe"
                    placeholderTextColor="#95A5A6"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    onSubmitEditing={() => {
                        console.log('Tìm:', keyword);
                    }}
                />
                <Text style={styles.preview}>Bạn đang gõ: {keyword || '(trống)'}</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#fff' },
    box: { flex: 1, padding: 16, justifyContent: 'center' },
    label: { marginBottom: 8, fontWeight: '600', color: '#2C3E50' },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FAFAFA',
        fontSize: 16,
        color: '#2C3E50',
    },
    preview: { marginTop: 12, color: '#7F8C8D' },
});

export default TextInputDemo;