import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  BookOpenCheck, 
  Bot, 
  BriefcaseBusiness
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard',      icon: LayoutDashboard,  badge: null },
    { id: 'explorer',  label: 'Career Explorer', icon: Compass,          badge: 'Mod 1' },
    { id: 'exams',     label: 'Exam Planner',    icon: BookOpenCheck,    badge: 'Mod 2' },
    { id: 'mentor',    label: 'Study Mentor',    icon: Bot,              badge: 'Mod 3' },
    { id: 'placement', label: 'Placement Lab',   icon: BriefcaseBusiness,badge: 'Mod 4' },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header" style={{ padding: '0 12px 16px 12px', fontSize: '0.7rem', fontWeight: 700, color: '#6B7D70', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Navigation Hub
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #C5DCCC' : '1px solid transparent',
                  background: isActive ? '#E4EFE7' : 'transparent',
                  color: isActive ? '#2D5F42' : '#4A5B4F',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} color={isActive ? '#3F7D58' : '#6B7D70'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: isActive ? '#C5DCCC' : '#F0F2EA',
                    color: isActive ? '#275239' : '#6B7D70',
                    fontWeight: 600
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>


    </aside>
  );
}
