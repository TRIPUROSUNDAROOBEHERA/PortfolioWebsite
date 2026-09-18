import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import profileApi from '../api/profileApi';

const ProfileContext = createContext();

const initialProfileState = {
  full_name: 'S. Ram Kumar',
  initials: 'SR',
  role: 'MCA Graduate | Software Developer',
  email: 'sramkumar0101@gmail.com',
  phone: '+91 98765 43210',
  location: 'India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  workspaceImg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
  bio: 'Passionate about building web applications and exploring new technologies. Love to solve real-world problems and contribute to impactful solutions.',
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(initialProfileState);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await profileApi.getProfile();
      const data = Array.isArray(res) ? res[0] : (res?.results ? res.results[0] : res);
      if (data && data.full_name) {
        setProfile((prev) => ({ ...prev, ...data }));
      }
    } catch {
      // Retains safe default values if the backend is idle
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInitialProfile = async () => {
      try {
        const res = await profileApi.getProfile();
        const data = Array.isArray(res) ? res[0] : (res?.results ? res.results[0] : res);
        if (isMounted && data && data.full_name) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // Fallback default retained
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = async (id, updatedData) => {
    const res = await profileApi.patchProfile(id, updatedData);
    setProfile((prev) => ({ ...prev, ...res }));
    return res;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export default ProfileContext;