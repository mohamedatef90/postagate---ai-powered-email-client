import React, { useState, useEffect, useRef, useCallback } from 'react';
import EmailListHeader from './EmailListHeader';
import EmailList from './EmailList';
import EmailDetailHeader from './EmailDetailHeader';
import EmailDetail from './EmailDetail';
import AIAssistant from './AIAssistant';
import type { Thread, Message } from '../types';
import Resizer from './ui/Resizer';

interface EmailViewProps {
  filteredThreads: Thread[];
  selectedThreadId: string | null;
  handleSelectThread: (id: string) => void;
  activeEmailView: string;
  handleOpenSnooze: (threadId: string, anchorEl: HTMLElement) => void;
  selectedThread: Thread | null;
  toggleAIAssistant: () => void;
  handleBack: () => void;
  setIsDiscoverModalOpen: (isOpen: boolean) => void;
  handleScheduleMeeting: () => void;
  handleUnsnoozeThread: (threadId: string) => void;
  handleSummarizeThread: () => void;
  threadSummary: {
    threadId: string | null;
    summary: string | null;
    isLoading: boolean;
    error: string | null;
  };
  setThreadSummary: (summary: {
    threadId: string | null;
    summary: string | null;
    isLoading: boolean;
    error: string | null;
  }) => void;
  isAIAssistantOpen: boolean;
  handleCloseAIAssistant: () => void;
  aiAssistantMode: 'default' | 'scheduleMeeting';
  selectedThreadIds: string[];
  handleToggleSelection: (id: string) => void;
  handleBulkArchive: () => void;
  handleBulkDelete: () => void;
  handleBulkMarkAsRead: () => void;
  handleOpenContextMenu: (event: React.MouseEvent, threadId: string) => void;
  handleOpenKebabMenu: (threadId: string, anchorEl: HTMLElement) => void;
  showUnreadOnly: boolean;
  onToggleUnreadFilter: () => void;
  handleComposeInteraction: (thread: Thread, type: 'reply' | 'reply-all' | 'forward', message?: Message) => void;
  handleToggleStarThread: (threadId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onOpenSearchFilters: (anchorEl: HTMLElement) => void;
  isSearching: boolean;
  areFiltersActive: boolean;
}

const EmailView: React.FC<EmailViewProps> = ({
  filteredThreads,
  selectedThreadId,
  handleSelectThread,
  activeEmailView,
  handleOpenSnooze,
  selectedThread,
  toggleAIAssistant,
  handleBack,
  setIsDiscoverModalOpen,
  handleScheduleMeeting,
  handleUnsnoozeThread,
  handleSummarizeThread,
  threadSummary,
  setThreadSummary,
  isAIAssistantOpen,
  handleCloseAIAssistant,
  aiAssistantMode,
  selectedThreadIds,
  handleToggleSelection,
  handleBulkArchive,
  handleBulkDelete,
  handleBulkMarkAsRead,
  handleOpenContextMenu,
  handleOpenKebabMenu,
  showUnreadOnly,
  onToggleUnreadFilter,
  handleComposeInteraction,
  handleToggleStarThread,
  searchQuery,
  onSearchQueryChange,
  onOpenSearchFilters,
  isSearching,
  areFiltersActive
}) => {
  const [emailListWidth, setEmailListWidth] = useState(360);
  const isResizingList = useRef(false);
  const startListX = useRef(0);
  const startListWidth = useRef(0);
    
  const handleListMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      isResizingList.current = true;
      startListX.current = e.clientX;
      startListWidth.current = emailListWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
  }, [emailListWidth]);

  const handleListMouseMove = useCallback((e: MouseEvent) => {
      if (!isResizingList.current) return;
      const deltaX = e.clientX - startListX.current;
      const newWidth = startListWidth.current + deltaX;
      const minWidth = 280;
      const maxWidth = 500;
      setEmailListWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)));
  }, []);

  const handleListMouseUp = useCallback(() => {
      isResizingList.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
      window.addEventListener('mousemove', handleListMouseMove);
      window.addEventListener('mouseup', handleListMouseUp);
      return () => {
          window.removeEventListener('mousemove', handleListMouseMove);
          window.removeEventListener('mouseup', handleListMouseUp);
      };
  }, [handleListMouseMove, handleListMouseUp]);
  
  const showDetailView = (selectedThreadId || (isSearching && !filteredThreads.length)) && !selectedThreadIds.length;

  return (
    <div
      className="flex flex-1 min-h-0 overflow-hidden bg-transparent"
    >
      <div
        className={`
          flex-shrink-0 flex flex-col border-r border-border
          ${showDetailView ? 'hidden md:flex' : 'flex'}
        `}
        style={{ width: `${emailListWidth}px` }}
      >
        <EmailListHeader 
          activeView={activeEmailView} 
          showUnreadOnly={showUnreadOnly}
          onToggleUnreadFilter={onToggleUnreadFilter}
          isSearching={isSearching}
        />
        <EmailList
          threads={filteredThreads}
          selectedThreadId={selectedThreadId}
          onSelectThread={handleSelectThread}
          activeView={activeEmailView}
          onSnoozeClick={handleOpenSnooze}
          onOpenKebabMenu={handleOpenKebabMenu}
          selectedThreadIds={selectedThreadIds}
          onToggleSelection={handleToggleSelection}
          onBulkArchive={handleBulkArchive}
          onBulkDelete={handleBulkDelete}
          onBulkMarkAsRead={handleBulkMarkAsRead}
          onContextMenu={handleOpenContextMenu}
        />
      </div>
      
      <Resizer
        onMouseDown={handleListMouseDown}
        className={`${showDetailView ? 'hidden md:flex' : 'flex'}`}
      />

      <div className={`
        flex-1 flex flex-col relative bg-card min-w-0 backdrop-blur-xl
        ${showDetailView ? 'flex' : 'hidden md:flex'}
      `}
      >
        <EmailDetailHeader
          thread={selectedThread}
          onToggleAIAssistant={toggleAIAssistant}
          onBack={handleBack}
          isDetailView={!!selectedThreadId}
          onDiscoverClick={() => setIsDiscoverModalOpen(true)}
          onScheduleMeetingClick={handleScheduleMeeting}
          onSnoozeClick={(e) => selectedThread && handleOpenSnooze(selectedThread.id, e.currentTarget)}
          onOpenKebabMenu={handleOpenKebabMenu}
          onUnsnooze={handleUnsnoozeThread}
          onSummarize={handleSummarizeThread}
          isSummarizing={threadSummary.isLoading && threadSummary.threadId === selectedThread?.id}
          onComposeInteraction={(type) => selectedThread && handleComposeInteraction(selectedThread, type)}
          onToggleStar={() => selectedThread && handleToggleStarThread(selectedThread.id)}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          onOpenSearchFilters={onOpenSearchFilters}
          areFiltersActive={areFiltersActive}
        />
        <div className="flex-1 min-h-0">
          <EmailDetail
            thread={selectedThread}
            summaryState={threadSummary}
            onClearSummary={() => setThreadSummary({ threadId: null, summary: null, isLoading: false, error: null })}
            onComposeInteraction={(type, message) => selectedThread && handleComposeInteraction(selectedThread, type, message)}
            onToggleStar={() => selectedThread && handleToggleStarThread(selectedThread.id)}
          />
        </div>
        <div className={`
          absolute top-0 right-0 h-full w-full max-w-[412px] p-4
          transition-transform duration-300 ease-in-out
          hidden xl:block
          pointer-events-none
          ${isAIAssistantOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="w-full h-full pointer-events-auto">
            <AIAssistant
              selectedThread={selectedThread}
              onClose={handleCloseAIAssistant}
              mode={aiAssistantMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailView;