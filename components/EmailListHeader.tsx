import React from 'react';

interface EmailListHeaderProps {
    activeView: string;
    showUnreadOnly: boolean;
    onToggleUnreadFilter: () => void;
    isSearching: boolean;
}

const EmailListHeader: React.FC<EmailListHeaderProps> = ({ activeView, showUnreadOnly, onToggleUnreadFilter, isSearching }) => {
  const tabs = ['Primary', 'Promotions', 'Social', 'Updates', 'Forums'];
  const [activeTab, setActiveTab] = React.useState('Primary');
  
  const getTitle = (view: string) => {
      if (view === 'inbox') return 'Inbox';
      return view.charAt(0).toUpperCase() + view.slice(1);
  }

  return (
    <div className="p-3 border-b border-border flex-shrink-0 bg-background">
      <div className="flex items-center justify-between mb-3">
         <h1 className="text-xl font-bold text-foreground">{isSearching ? 'Search Results' : getTitle(activeView)}</h1>
         <div className="flex items-center space-x-1">
            {!isSearching && (
              <button 
                onClick={onToggleUnreadFilter}
                className={`h-8 w-8 rounded-md flex items-center justify-center hover:bg-accent ${showUnreadOnly ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`} 
                title={showUnreadOnly ? 'Show all emails' : 'Show unread only'}
              >
                <i className="fa-solid fa-filter w-5 h-5"></i>
              </button>
            )}
         </div>
      </div>
      {activeView === 'inbox' && !isSearching && (
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailListHeader;