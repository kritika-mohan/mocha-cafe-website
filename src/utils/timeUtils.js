import { storeSettings } from '../data/menuData';

export const isStoreOpen = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  return timeStr >= storeSettings.openingTime && timeStr < storeSettings.closingTime;
};
