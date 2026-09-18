import React from 'react';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found',
}) {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
        <span className="text-xs text-slate-500 font-semibold">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-xs font-['Plus_Jakarta_Sans',sans-serif]">
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-600 uppercase text-[10.5px] font-black tracking-wider">
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-400 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-slate-800 font-medium">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}