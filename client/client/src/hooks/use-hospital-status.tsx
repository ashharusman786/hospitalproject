import { useState, useEffect } from 'react';

export function useHospitalStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const day = now.getDay();
      
      // Hospital open 8AM-8PM Mon-Sat, 9AM-2PM Sun
      let hospitalOpen = false;
      if (day === 0) { // Sunday
        hospitalOpen = hours >= 9 && hours < 14;
      } else { // Monday-Saturday
        hospitalOpen = hours >= 8 && hours < 22;
      }

      
      setIsOpen(hospitalOpen);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
