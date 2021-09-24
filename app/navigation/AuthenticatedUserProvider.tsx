import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});

/**
 * Context for the sign in/out
 * @param children
 * @constructor
 */
export const AuthenticatedUserProvider = ({ children }:any) => {
    const [user, setUser] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};
