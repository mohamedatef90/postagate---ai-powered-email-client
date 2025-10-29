import React from 'react';
import type { Thread } from '../types';

interface EmailDetailHeaderProps {
    thread: Thread | null;
    onToggleAIAssistant: () => void;
    onBack: () => void;
    isDetailView: boolean;
    onDiscoverClick: () => void;
    onScheduleMeetingClick: () => void;
    onSnoozeClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onOpenKebabMenu: (threadId: string, anchorEl: HTMLElement) => void;
    onUnsnooze: (threadId: string) => void;
    onSummarize: () => void;
    isSummarizing: boolean;
    onComposeInteraction: (type: 'reply' | 'reply-all' | 'forward') => void;
    onToggleStar: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onOpenSearchFilters: (anchorEl: HTMLElement) => void;
    areFiltersActive: boolean;
}

const EmailDetailHeader: React.FC<EmailDetailHeaderProps> = ({ 
    thread, onToggleAIAssistant, onBack, isDetailView, onDiscoverClick, 
    onScheduleMeetingClick, onSnoozeClick, onOpenKebabMenu, onUnsnooze, onSummarize, 
    isSummarizing, onComposeInteraction, onToggleStar, searchQuery, onSearchQueryChange,
    onOpenSearchFilters, areFiltersActive
}) => {
    const isSnoozed = thread?.snoozedUntil && new Date(thread.snoozedUntil) > new Date();
    const isStarred = thread?.isStarred;
    
    return (
        <header className="bg-background p-2 flex items-center justify-between flex-shrink-0 border-b border-border space-x-2">
            <div className="flex items-center space-x-1">
                <button onClick={onBack} className={`h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent md:hidden ${isDetailView ? 'flex' : 'hidden'}`} title="Back to list"><i className="fa-solid fa-arrow-left w-5 h-5"></i></button>
                
                <div className="flex items-center bg-secondary rounded-full">
                    <button onClick={() => onComposeInteraction('reply')} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Reply"><i className="fa-solid fa-reply w-5 h-5"></i></button>
                    <button onClick={() => onComposeInteraction('reply-all')} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Reply All"><i className="fa-solid fa-reply-all w-5 h-5"></i></button>
                    <button onClick={() => onComposeInteraction('forward')} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Forward"><i className="fa-solid fa-share w-5 h-5"></i></button>
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
                 <div className="hidden sm:flex items-center bg-secondary rounded-full">
                    <button className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Mark done"><i className="fa-regular fa-circle-check w-5 h-5"></i></button>
                    {isSnoozed ? (
                        <button onClick={() => thread && onUnsnooze(thread.id)} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Unsnooze">
                            <i className="fa-regular fa-bell w-5 h-5 text-primary"></i>
                        </button>
                    ) : (
                        <button onClick={onSnoozeClick} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Snooze">
                            <i className="fa-regular fa-clock w-5 h-5"></i>
                        </button>
                    )}
                    <button onClick={onToggleStar} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Star">
                         <i className={`w-5 h-5 ${isStarred ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star'}`}></i>
                    </button>
                    <button onClick={(e) => thread && onOpenKebabMenu(thread.id, e.currentTarget)} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="More options"><i className="fa-solid fa-ellipsis-v w-5 h-5"></i></button>
                 </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 justify-end">
                <div className="relative flex-1 max-w-xs">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="w-full bg-secondary border-none rounded-full pl-9 pr-4 h-9 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                </div>
                 <button 
                    onClick={(e) => onOpenSearchFilters(e.currentTarget)}
                    className={`h-9 w-9 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors ${areFiltersActive ? 'text-primary' : 'text-muted-foreground'}`}
                    title="Advanced search"
                >
                    <i className="fa-solid fa-sliders w-4 h-4"></i>
                </button>
                {thread && (
                    <button 
                        onClick={onSummarize}
                        disabled={isSummarizing}
                        className="h-9 px-3 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Summarize thread"
                    >
                        <i className={`fa-solid fa-wand-magic-sparkles w-4 h-4 mr-2 ${isSummarizing ? 'animate-spin' : ''}`}></i>
                        <span>{isSummarizing ? 'Summarizing...' : 'Summarize'}</span>
                    </button>
                )}
                 <div className="flex items-center bg-secondary rounded-full">
                     <button onClick={onToggleAIAssistant} className="h-9 px-3 flex items-center justify-center text-muted-foreground hover:bg-accent font-bold text-sm" title="AI Assistant">AI</button>
                     <button onClick={onScheduleMeetingClick} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-accent" title="Insert Meeting"><i className="fa-regular fa-calendar w-5 h-5"></i></button>
                 </div>
                 <button 
                    onClick={onDiscoverClick}
                    className="h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
                    title="Discover"
                 >
                    <i className="fa-solid fa-bolt w-5 h-5"></i>
                 </button>
            </div>
        </header>
    );
};

export default EmailDetailHeader;