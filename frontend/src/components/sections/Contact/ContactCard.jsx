import { useState } from 'react';

export default function ContactCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Quick Contact Inquiry',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject || 'Quick Contact Inquiry',
      message: formData.message.trim()
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(JSON.stringify(errData));
      }

      setStatus('Message transmitted successfully!');
      setFormData({ name: '', email: '', subject: 'Quick Contact Inquiry', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      localStorage.setItem('cached_contact_message', JSON.stringify(payload));
      setStatus('Message recorded locally!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 text-xs font-black text-slate-900 mb-3">
        <i className="fa-regular fa-paper-plane text-blue-600"></i>
        <span>{"Let's Connect"}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
        />

        <textarea
          rows="3"
          placeholder="Your Message (minimum 10 characters)"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              Send Message <i className="fa-solid fa-paper-plane text-[10px]"></i>
            </>
          )}
        </button>

        {status && (
          <div
            className={`text-xs text-center font-bold mt-1 ${
              status.includes('successfully') ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {status}
          </div>
        )}
      </form>
    </div>
  );
}