import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    const [runnerApiUrl, setRunnerApiUrl] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('runnerApiUrl') || 'http://127.0.0.1:8000';
        }
        return 'http://127.0.0.1:8000';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('runnerApiUrl', runnerApiUrl);
        }
    }, [runnerApiUrl]);

    const setRunnerApiUrlAndStore = (value: string) => {
        setRunnerApiUrl(value);
        if (typeof window !== 'undefined') {
            localStorage.setItem('runnerApiUrl', value);
        }
    };

    return (
        <MyContext.Provider value={{ runnerApiUrl, setRunnerApiUrl: setRunnerApiUrlAndStore }}>
            {children}
        </MyContext.Provider>
    );
};
