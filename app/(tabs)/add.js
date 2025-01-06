import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AddUserPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New User</Text>
            <Text>This is the Add New User page.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default AddUserPage;