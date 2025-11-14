export interface User {
  id: string | null;
  fullName: string | null;
  email?: string | null;
  roles: string[] | null;      // change from string → string[] since roles may contain ["Admin", "Manager", ...]
  isAdmin?: boolean;
  status?: "Online" | "Offline" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUser: (newData: Partial<User>) => void;
  unsetUser: () => Promise<void> | void;
}

export interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}
