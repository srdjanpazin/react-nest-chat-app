import { Context, createContext, useContext, useState } from "react";

interface UserContextType {
	userId: number;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext: Context<UserContextType | null> = createContext<UserContextType | null>(null);

export function UserProvider({ children }) {

	const [userId, setUserId] = useState(0);

	const value = { userId, setUserId };

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
