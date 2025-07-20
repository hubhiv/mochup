import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
// Mock data for boards
const MOCK_BOARDS = [{
  id: '1',
  title: 'Wedding Planning',
  description: 'Find the perfect vendors for your special day',
  theme: 'Wedding',
  coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=3869&auto=format&fit=crop',
  vendorCount: 12
}, {
  id: '2',
  title: 'Home Renovation',
  description: 'Contractors and services for your renovation project',
  theme: 'Home',
  coverImage: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?q=80&w=3869&auto=format&fit=crop',
  vendorCount: 8
}, {
  id: '3',
  title: 'Event Planning',
  description: 'Services for corporate events and parties',
  theme: 'Events',
  coverImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=3870&auto=format&fit=crop',
  vendorCount: 15
}];
export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBoards = MOCK_BOARDS.filter(board => board.title.toLowerCase().includes(searchQuery.toLowerCase()) || board.description.toLowerCase().includes(searchQuery.toLowerCase()) || board.theme.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Browse and manage your boards
        </p>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search boards..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-input rounded-md" />
        </div>
        <button className="p-2 border border-input rounded-md">
          <Filter size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoards.map(board => <div key={board.id} className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/customer/board/${board.id}`)}>
            <div className="h-48 overflow-hidden">
              <img src={board.coverImage} alt={board.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{board.title}</h3>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                  {board.theme}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                {board.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {board.vendorCount} vendors
                </span>
                <button className="text-sm text-primary hover:underline">
                  View Board
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {filteredBoards.length === 0 && <div className="text-center py-12">
          <p className="text-muted-foreground">
            No boards found matching your search.
          </p>
        </div>}
    </div>;
};