import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from '@react-navigation/elements';
import { MIDNIGHT_GREEN } from '../styles/palette';
import Projects from "./Projects";
import { ProjectDetail } from "../components/ProjectDetail";
import { OtherUser } from "../components/OtherUser";
import  CreatePost from "../screens/CreatePost"

export function MyProjects() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                    color: MIDNIGHT_GREEN,
                },

                // Make header back button green
                headerLeft: () => (
                    <HeaderBackButton
                        tintColor={MIDNIGHT_GREEN}
                        onPress={navigation.goBack}
                    />
                ),
            })}
        >
            <Stack.Screen
                name="Projects"
                component={Projects}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Details"
                component={ProjectDetail}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Editing Project"
                component={CreatePost}
                />
            <Stack.Screen
                name="Other User"
                component={OtherUser}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}