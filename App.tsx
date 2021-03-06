import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Tabs from "./navigation/tabs";
import SingUp from "./screens/SignUp";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App: React.FC<any> = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={"SignUp"}
            >
                <Stack.Screen name="SignUp" component={SingUp} />

                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
