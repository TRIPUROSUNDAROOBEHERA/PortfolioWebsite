import { useState, useEffect, useCallback } from 'react';
import profileApi from '../api/profileApi';

const DEFAULT_PROFILE = {
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

export default function useProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await profileApi.getProfile();
      const data = Array.isArray(res) ? res[0] : (res?.results ? res.results[0] : res);
      if (data && data.full_name) {
        setProfile((prev) => ({ ...prev, ...data }));
      }
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const executeLoad = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await profileApi.getProfile();
        const data = Array.isArray(res) ? res[0] : (res?.results ? res.results[0] : res);
        if (isMounted && data && data.full_name) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    executeLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = async (id, updatedData) => {
    try {
      const res = await profileApi.patchProfile(id, updatedData);
      setProfile((prev) => ({ ...prev, ...res }));
      return res;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { profile, loading, error, refetch: loadProfile, updateProfile };
}