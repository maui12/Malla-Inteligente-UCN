import { UserProvider } from "./UserContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};
