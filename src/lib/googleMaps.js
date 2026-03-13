let isLoading = false;
let isLoaded = false;
let loadPromise = null;

export const loadGoogleMaps = (apiKey) => {
  if (typeof window === 'undefined') return Promise.reject(new Error("Window not defined"));
  if (window.google && window.google.maps) {
    isLoaded = true;
    return Promise.resolve();
  }
  
  if (isLoaded) return Promise.resolve();
  if (isLoading) return loadPromise;

  isLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-script';
    
    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
    };
    
    script.onerror = (err) => {
      isLoading = false;
      reject(err);
    };
    
    document.head.appendChild(script);
  });
  
  return loadPromise;
};