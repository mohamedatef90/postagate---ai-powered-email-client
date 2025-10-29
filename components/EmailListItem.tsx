import React from 'react';
import type { Thread } from '../types';

interface EmailListItemProps {
  thread: Thread;
  isSelected: boolean;
  isSelectedForBulk: boolean;
  onSelect: (id: string) => void;
  onToggleSelection: (id: string) => void;
  onSnoozeClick: (threadId: string, anchorEl: HTMLElement) => void;
  onOpenKebabMenu: (threadId: string, anchorEl: HTMLElement) => void;
  onContextMenu: (event: React.MouseEvent, threadId: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ thread, isSelected, isSelectedForBulk, onSelect, onToggleSelection, onSnoozeClick, onOpenKebabMenu, onContextMenu }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (date > startOfDay) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];

    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - now.getDay());

    if (date > startOfWeek) {
        return dayName;
    }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  const sender = thread.messages[thread.messages.length - 1].sender;
  const isHighlighted = isSelected || isSelectedForBulk;

  return (
    <div
      onClick={() => onSelect(thread.id)}
      onContextMenu={(e) => onContextMenu(e, thread.id)}
      className={`group flex items-start p-3 border-b border-border cursor-pointer ${isHighlighted ? 'bg-secondary' : ''}`}
    >
       <div className="w-6 h-10 flex-shrink-0 flex items-center justify-center mr-2">
         <input 
            type="checkbox"
            checked={isSelectedForBulk}
            onChange={() => onToggleSelection(thread.id)}
            onClick={(e) => e.stopPropagation()}
            className="h-5 w-5 rounded border-input bg-transparent text-primary focus:ring-primary focus:ring-offset-0"
            aria-label={`Select email from ${sender.name}`}
          />
       </div>

      <div className="w-10 h-10 mr-3 flex-shrink-0 flex items-center justify-center">
        {!thread.isRead ? (
            <span className="h-2 w-2 rounded-full bg-primary"></span>
        ) : (
             <img src={sender.avatarUrl} alt={sender.name} className="w-8 h-8 rounded-full" />
        )}
      </div>
      
      <div className={`flex-1 min-w-0`}>
        <div className="flex justify-between items-baseline">
          <p className={`text-sm truncate ${!thread.isRead ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'}`}>
            {sender.name}
          </p>
           <div className="flex items-center space-x-2">
             <p className="text-xs text-muted-foreground whitespace-nowrap group-hover:hidden">{formatDate(thread.timestamp)}</p>
             <div className="hidden group-hover:flex items-center text-muted-foreground">
                <button onClick={(e) => { e.stopPropagation(); onSnoozeClick(thread.id, e.currentTarget); }} className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-background" title="Snooze"><i className="fa-regular fa-clock w-4 h-4"></i></button>
                <button onClick={(e) => { e.stopPropagation(); onOpenKebabMenu(thread.id, e.currentTarget); }} className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-background" title="More options"><i className="fa-solid fa-ellipsis-v w-4 h-4"></i></button>
             </div>
           </div>
        </div>
        <p className={`text-sm truncate ${!thread.isRead ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          {thread.subject}
        </p>
        <p className="text-sm text-muted-foreground truncate pr-4 mt-1">
          {thread.messages[thread.messages.length - 1].body.replace(/<[^>]*>/g, '').substring(0, 80)}...
        </p>
      </div>
    </div>
  );
};

export default EmailListItem;
