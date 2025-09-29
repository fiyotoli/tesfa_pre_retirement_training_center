import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProfileContext = createContext();

const ProfileContextProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch employee profiles
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/profile/list`);
      if (response.data.success) {
        setProfiles(response.data.employees); // Adjust to match your backend response key
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const value = {
    profiles,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
