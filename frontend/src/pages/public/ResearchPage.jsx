import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-3xl font-extrabold border-l-4 border-blue-500 pl-3">Research Focus Areas</h1>
        <div className="space-y-4">
          <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-xl">
            <h3 className="text-base font-bold text-white mb-2">1. Applied Artificial Intelligence in Higher Education</h3>
            <p className="text-xs text-slate-300">Automated grading protocols and adaptive student assessment models.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchPage;