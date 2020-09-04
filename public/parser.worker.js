self.addEventListener('custom', () => {});
self.addEventListener('custom2', () => {});
self.addEventListener('custom3', () => {});
self.addEventListener('custom4', () => {});
self.addEventListener('custom5', () => {});
self.addEventListener('custom6', () => {});
self.addEventListener('custom7', () => {});

self.onmessage = ({ data: { eventType } }) => {
  self.dispatchEvent(new Event());
};
