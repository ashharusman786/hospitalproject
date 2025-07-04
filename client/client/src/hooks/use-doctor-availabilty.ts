import { useState, useEffect } from 'react';

function isNowInTimeRange(timeRange: string) {
  if (!timeRange) return false;
  const [start, end] = timeRange.split('-').map(s => s.trim());
  const now = new Date();

  function parseTime(str: string) {
    const [time, modifier] = str.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
  }

  const { hours: startH, minutes: startM } = parseTime(start);
  const { hours: endH, minutes: endM } = parseTime(end);

  const startDate = new Date(now);
  startDate.setHours(startH, startM, 0, 0);
  const endDate = new Date(now);
  endDate.setHours(endH, endM, 0, 0);

  return now >= startDate && now < endDate;
}

export function useDoctorAvailability(doctor: { morningHours?: string; eveningHours?: string }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      const available =
        (doctor.morningHours && isNowInTimeRange(doctor.morningHours)) ||
        (doctor.eveningHours && isNowInTimeRange(doctor.eveningHours));
      setIsAvailable(!!available);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, [doctor.morningHours, doctor.eveningHours]);

  return isAvailable;
}