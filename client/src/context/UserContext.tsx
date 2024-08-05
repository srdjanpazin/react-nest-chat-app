import { Context, createContext, useContext, useState } from "react";

type UserContextType = {
	userId: string | null;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

type UserProviderProps = {
	children: React.ReactNode;
}

const UserContext: Context<UserContextType | null> = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {

	const [userId, setUserId] = useState<string | null>(null);

	const value = { userId, setUserId };

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
