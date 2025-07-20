import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Info, Plus, MoreHorizontal, ExternalLink } from 'lucide-react';
// Mock data for board
const MOCK_BOARD = {
  id: '1',
  title: 'Wedding Planning',
  description: 'Find the perfect vendors for your special day',
  theme: 'Wedding',
  coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=3869&auto=format&fit=crop',
  status: 'active',
  createdAt: '2023-05-15'
};
// Mock data for columns and cards
const MOCK_COLUMNS = [{
  id: 'available',
  title: 'Available',
  cards: [{
    id: '1',
    title: 'Wedding Photography Package',
    provider: 'John Smith Photography',
    description: 'Professional photography services for your wedding day',
    price: '$1,500 - $3,000',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=3000&auto=format&fit=crop',
    category: 'Photography'
  }, {
    id: '2',
    title: 'Event Catering Services',
    provider: 'Gourmet Delights',
    description: 'Catering for weddings and corporate events',
    price: '$25 - $45 per person',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=3870&auto=format&fit=crop',
    category: 'Food & Beverage'
  }]
}, {
  id: 'booked',
  title: 'Booked',
  cards: [{
    id: '3',
    title: 'DJ Services',
    provider: 'Rhythm Masters',
    description: 'Professional DJ services for any event',
    price: '$800 - $1,200',
    image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=3870&auto=format&fit=crop',
    category: 'Entertainment'
  }]
}, {
  id: 'completed',
  title: 'Completed',
  cards: []
}];
export const BoardDetails: React.FC = () => {
  const {
    boardId
  } = useParams<{
    boardId: string;
  }>();
  const {
    user
  } = useAuth();
  const [columns, setColumns] = useState(MOCK_COLUMNS);
  const [draggedCard, setDraggedCard] = useState<null | {
    id: string;
    columnId: string;
  }>(null);
  // Only providers and admins can drag cards
  const canDragCards = user?.role === 'provider' || user?.role === 'admin';
  // Only providers can add new listings (to their own listings)
  const canAddListing = user?.role === 'provider';
  // Only admins can edit board details
  const canEditBoard = user?.role === 'admin';
  const handleDragStart = (cardId: string, columnId: string) => {
    if (!canDragCards) return;
    setDraggedCard({
      id: cardId,
      columnId
    });
  };
  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (!canDragCards || !draggedCard) return;
  };
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!canDragCards || !draggedCard) return;
    // Don't do anything if dropping in the same column
    if (draggedCard.columnId === targetColumnId) return;
    // Find the card in the source column
    const sourceColumn = columns.find(col => col.id === draggedCard.columnId);
    const card = sourceColumn?.cards.find(card => card.id === draggedCard.id);
    if (!sourceColumn || !card) return;
    // Remove from source column and add to target column
    const updatedColumns = columns.map(col => {
      if (col.id === draggedCard.columnId) {
        return {
          ...col,
          cards: col.cards.filter(c => c.id !== draggedCard.id)
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          cards: [...col.cards, card]
        };
      }
      return col;
    });
    setColumns(updatedColumns);
    setDraggedCard(null);
  };
  const handleCardClick = (cardId: string) => {
    // In a real app, this would open a modal with detailed info
    console.log(`Viewing card ${cardId}`);
  };
  return <div className="container mx-auto">
      {/* Board Header */}
      <div className="relative h-48 rounded-lg mb-6 bg-cover bg-center flex items-end" style={{
      backgroundImage: `url(${MOCK_BOARD.coverImage})`
    }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative p-6 w-full">
          <div className="flex justify-between items-end">
            <div>
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded mb-2 inline-block">
                {MOCK_BOARD.theme}
              </span>
              <h1 className="text-3xl font-bold text-white">
                {MOCK_BOARD.title}
              </h1>
              <p className="text-white text-opacity-90 mt-1">
                {MOCK_BOARD.description}
              </p>
            </div>
            {canEditBoard && <button className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white py-1 px-3 rounded-md text-sm">
                Edit Board
              </button>}
          </div>
        </div>
      </div>
      {/* Board Content */}
      <div className="flex overflow-x-auto pb-4 space-x-4">
        {columns.map(column => <div key={column.id} className="flex-shrink-0 w-80 bg-secondary rounded-lg" onDragOver={e => handleDragOver(e, column.id)} onDrop={e => handleDrop(e, column.id)}>
            <div className="p-3 font-medium border-b border-border bg-secondary">
              <div className="flex items-center justify-between">
                <h3>{column.title}</h3>
                <span className="bg-white text-xs px-2 py-0.5 rounded-full">
                  {column.cards.length}
                </span>
              </div>
            </div>
            <div className="p-2 min-h-[200px]">
              {column.cards.map(card => <div key={card.id} draggable={canDragCards} onDragStart={() => handleDragStart(card.id, column.id)} onClick={() => handleCardClick(card.id)} className="bg-white p-3 rounded-md mb-2 shadow-sm cursor-pointer">
                  {card.image && <div className="h-32 rounded-md overflow-hidden mb-2">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    </div>}
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{card.title}</h4>
                    {user?.role !== 'provider' && <div className="relative group">
                        <button className="p-1 rounded-full hover:bg-muted">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.provider}
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {card.category}
                    </span>
                    <span className="text-xs font-medium">{card.price}</span>
                  </div>
                  {user?.role === 'customer' && <button className="w-full mt-3 text-sm bg-primary text-primary-foreground py-1 px-3 rounded flex items-center justify-center gap-1">
                      <span>Book Now</span>
                      <ExternalLink size={14} />
                    </button>}
                </div>)}
              {column.cards.length === 0 && <div className="flex items-center justify-center h-24 border border-dashed border-border rounded-md">
                  <p className="text-sm text-muted-foreground">
                    No listings yet
                  </p>
                </div>}
              {canAddListing && column.id === 'available' && <button className="w-full p-2 border border-dashed border-border rounded-md flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus size={16} />
                  <span>Add Listing</span>
                </button>}
            </div>
          </div>)}
      </div>
    </div>;
};