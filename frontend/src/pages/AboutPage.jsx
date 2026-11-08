import React from 'react';
import AboutSection from '../components/sections/AboutSection';

export default function AboutPage({ setActiveTab }) {
  return <AboutSection setActiveTab={setActiveTab} isStandalonePage={true} />;
}