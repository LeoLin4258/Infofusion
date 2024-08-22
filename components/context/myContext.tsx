import { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {
    runnerApiUrl: string;
    setRunnerApiUrl: (value: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};

interface MyProviderProps {
    children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [runnerApiUrl, setRunnerApiUrl] = useState<string>('http://127.0.0.1:8000');

    return (
        <MyContext.Provider value={{ runnerApiUrl, setRunnerApiUrl }}>
            {children}
        </MyContext.Provider>
    );
};
