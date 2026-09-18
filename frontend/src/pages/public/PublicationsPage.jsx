import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const publications = [
  { title: 'Web Development with Django and Microservices', venue: 'International Journal of Computer Science', year: '2023' },
  { title: 'React for Modern Web & Asynchronous Architectures', venue: 'Tech Review Proceedings', year: '2022' },
  { title: 'Database Optimization Strategies in High-Throughput Systems', venue: 'IJIT Journal', year: '2021' },
];

const PublicationsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-3xl font-extrabold border-l-4 border-blue-500 pl-3">Research Publications</h1>
        <div className="space-y-4">
          {publications.map((pub, idx) => (
            <div key={idx} className="p-5 bg-slate-800/40 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-white">"{pub.title}"</h3>
                <p className="text-xs text-slate-400 mt-1">{pub.venue} — <span className="text-blue-400">{pub.year}</span></p>
              </div>
              <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition">
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicationsPage;