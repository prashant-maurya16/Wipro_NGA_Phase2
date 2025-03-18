import { createContext } from "react"

export const UserData = {
  userName : "Prashant",
  company : "Wipro",
  topic : "React Trainee"   
}

export const UserConText = createContext(UserData);