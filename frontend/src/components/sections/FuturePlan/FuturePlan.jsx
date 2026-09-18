import React from 'react';
import PlanItem from './PlanItem';

export default function FuturePlan() {
  const plans = [
    'Advance Machine Learning & AI Projects',
    'Explore AWS & Cloud Deployments',
    'Publish Open-Source Python Packages'
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 text-xs font-black text-slate-900 mb-3">
        <i className="fa-solid fa-compass text-blue-600"></i>
        <span>Future Plans & Resources</span>
      </div>

      <div className="space-y-2">
        {plans.map((p, idx) => (
          <PlanItem key={idx} text={p} />
        ))}
      </div>
    </div>
  );
}