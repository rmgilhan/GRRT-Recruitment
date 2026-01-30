import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    // We check if the script is already there so we don't load it twice
    if (document.getElementById('tawk-script')) return;

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.id = 'tawk-script';
    s1.async = true;
    // This is YOUR specific ID from the snippet you provided
    s1.src = 'https://embed.tawk.to/697c8694e9d06f1c35e3ff03/1jg76rds7';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }
  }, []);

  return null; 
};

export default TawkChat;