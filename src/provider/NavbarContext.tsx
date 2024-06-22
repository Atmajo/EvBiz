import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface NavbarContextType {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContextType>({
  isOpen: false,
  setOpen: () => {},
});
