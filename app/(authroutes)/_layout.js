import { Stack } from "expo-router";
import { SafeAreaView, useColorScheme } from "react-native";


export default function AuthLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
        <Stack
            screenOptions={{
            headerShown: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="startOptions" />
            <Stack.Screen name="signUp" />
            <Stack.Screen name="otpVerification" />
            <Stack.Screen name="loginWithPhonenumber" />
            <Stack.Screen name="accountRecovery" />
            <Stack.Screen name="loginIssueForm" />
            <Stack.Screen name="loginIssueFormSuccess" />
            <Stack.Screen name="registrationPage" />
            <Stack.Screen name="profileTagPage" />
        </Stack>
        </SafeAreaView>
    )
}