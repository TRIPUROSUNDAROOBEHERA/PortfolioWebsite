/* ==========================================================================
   PORTFOLIO ADMIN CMS - INTERACTIVE ENHANCEMENTS
   File: backend/static/js/admin.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Auto-dismiss alerts & messages after 5 seconds
  const messageList = document.querySelector('ul.messagelist');
  if (messageList) {
    setTimeout(() => {
      messageList.style.transition = 'opacity 0.5s ease';
      messageList.style.opacity = '0';
      setTimeout(() => messageList.remove(), 500);
    }, 5000);
  }

  // 2. Format & highlight status cells in changelist tables
  const rows = document.querySelectorAll('#changelist tbody tr');
  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      const text = cell.innerText.trim().toLowerCase();
      if (text === 'unread' || text === 'critical' || text === 'error') {
        cell.style.color = '#dc2626';
        cell.style.fontWeight = '600';
      } else if (text === 'read' || text === 'completed' || text === 'published' || text === 'success') {
        cell.style.color = '#16a34a';
        cell.style.fontWeight = '600';
      } else if (text === 'in_progress' || text === 'ongoing' || text === 'planned') {
        cell.style.color = '#2563eb';
        cell.style.fontWeight = '600';
      }
    });
  });

  // 3. Quick Confirmation for destructive bulk actions
  const actionForm = document.querySelector('#changelist-form');
  const actionSelect = document.querySelector('select[name="action"]');
  if (actionForm && actionSelect) {
    actionForm.addEventListener('submit', (e) => {
      const selectedAction = actionSelect.value;
      if (selectedAction && selectedAction.includes('delete')) {
        const confirmed = window.confirm('Are you sure you want to delete the selected items? This action cannot be undone.');
        if (!confirmed) {
          e.preventDefault();
        }
      }
    });
  }
});