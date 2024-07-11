"use client"

import { useEffect } from 'react';

const WhatsappChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.dataset.useServiceCore = "true";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="elfsight-app-822d9ddb-8db6-48e8-a5bf-3d04c40eb7e3" data-elfsight-app-lazy></div>
  );
};

export default WhatsappChat;
