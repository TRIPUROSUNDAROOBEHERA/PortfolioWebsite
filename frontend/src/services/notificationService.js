class NotificationService {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(message, type = 'info', duration = 3500) {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const notification = { id, message, type, duration };

    this.listeners.forEach((callback) => callback(notification));

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  success(message, duration) {
    return this.notify(message, 'success', duration);
  }

  error(message, duration) {
    return this.notify(message, 'error', duration);
  }

  warning(message, duration) {
    return this.notify(message, 'warning', duration);
  }

  info(message, duration) {
    return this.notify(message, 'info', duration);
  }

  dismiss(id) {
    this.listeners.forEach((callback) => callback({ id, dismiss: true }));
  }
}

export const notificationService = new NotificationService();
export default notificationService;