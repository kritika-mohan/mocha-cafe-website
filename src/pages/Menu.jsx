import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import { menuData } from '../data/menuData';
import './Menu.css';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('drinks');

  const tabs = [
    { id: 'drinks', label: 'Drinks' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'maggi', label: 'Maggi' }
  ];

  return (
    <div className="page-transition menu-page">
      <div className="menu-header">
        <div className="container">
          <SectionHeading eyebrow="Taste The Craft" title="Our Menu" centered={true} />
        </div>
      </div>

      <div className="container menu-container">
        <div className="menu-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {menuData[activeTab].map((item, index) => (
            <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
