import { useState, useEffect, useCallback } from 'react';
import projectsApi from '../api/projectsApi';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Portfolio Website',
    cat: 'frontend',
    category: 'frontend',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    desc: 'Personal portfolio website to showcase skills, projects and achievements.',
  },
  {
    id: 2,
    title: 'Task Management System',
    cat: 'fullstack',
    category: 'fullstack',
    tags: ['React', 'Node.js', 'MongoDB'],
    desc: 'A full stack task management application with authentication and dashboard.',
  },
  {
    id: 3,
    title: 'Blog Platform',
    cat: 'fullstack',
    category: 'fullstack',
    tags: ['Django', 'Bootstrap', 'SQLite'],
    desc: 'A full-stack blog platform with user authentication, categories and rich text editor.',
  },
];

export default function useProjects(category = 'all') {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = category !== 'all' ? { category } : {};
      const res = await projectsApi.getAll(params);
      const data = res?.results || res;
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true;

    const executeFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = category !== 'all' ? { category } : {};
        const res = await projectsApi.getAll(params);
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjects(data);
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

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { projects, loading, error, refetch: fetchProjects, setProjects };
}