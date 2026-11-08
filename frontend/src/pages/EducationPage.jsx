import React from 'react';
import EducationSection from '../components/sections/EducationSection';

export default function EducationPage({ setActiveTab }) {
  return <EducationSection isStandalonePage={true} setActiveTab={setActiveTab} />;
}