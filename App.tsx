import React from "react";

import {initialiseFirebase} from "./app/constants/Firebase";
import {AuthenticatedUserProvider} from "./app/navigation";
import RootNavigator from "./app/navigation/RootNavigator";

export default function App() {
    console.disableYellowBox = true;

    initialiseFirebase();

    return (
        <AuthenticatedUserProvider>
            <RootNavigator />
        </AuthenticatedUserProvider>
    );
}