import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash, ExternalLink } from 'lucide-react';
// Mock data for listings
const MOCK_LISTINGS = [{
  id: '1',
  title: 'Wedding Photography Package',
  description: 'Professional photography services for your wedding day',
  price: '$1,500 - $3,000',
  category: 'Photography',
  status: 'active',
  image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=3000&auto=format&fit=crop',
  boards: ['Wedding Planning', 'Event Services'],
  inquiries: 8,
  createdAt: '2023-05-10'
}, {
  id: '2',
  title: 'Event Catering Services',
  description: 'Catering for weddings and corporate events',
  price: '$25 - $45 per person',
  category: 'Food & Beverage',
  status: 'active',
  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=3870&auto=format&fit=crop',
  boards: ['Wedding Planning', 'Corporate Events', 'Birthday Celebrations'],
  inquiries: 15,
  createdAt: '2023-06-22'
}, {
  id: '3',
  title: 'DJ Services',
  description: 'Professional DJ services for any event',
  price: '$800 - $1,200',
  category: 'Entertainment',
  status: 'active',
  image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=3870&auto=format&fit=crop',
  boards: ['Wedding Planning'],
  inquiries: 5,
  createdAt: '2023-07-15'
}, {
  id: '4',
  title: 'Wedding Flowers & Decor',
  description: 'Beautiful floral arrangements for your wedding',
  price: '$500 - $2,000',
  category: 'Decor',
  status: 'draft',
  image: 'https://images.unsplash.com/photo-1561128290-000992e65bef?q=80&w=3869&auto=format&fit=crop',
  boards: [],
  inquiries: 0,
  createdAt: '2023-08-05'
}];
export const ListingManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || listing.description.toLowerCase().includes(searchQuery.toLowerCase()) || listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Listings</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your service listings
          </p>
        </div>
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center gap-2">
          <Plus size={16} />
          <span>New Listing</span>
        </button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search listings..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-input rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <select className="border border-input rounded-md py-2 px-3" value={statusFilter || ''} onChange={e => setStatusFilter(e.target.value || null)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => <div key={listing.id} className="border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 overflow-hidden relative">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`
                  text-xs px-2 py-1 rounded-full text-white
                  ${listing.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}
                `}>
                  {listing.status === 'active' ? 'Active' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                  {listing.category}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {listing.description}
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">{listing.price}</span>
                <span className="text-xs text-muted-foreground">
                  {listing.inquiries} inquiries
                </span>
              </div>
              {listing.boards.length > 0 && <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Associated boards:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {listing.boards.map((board, i) => <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {board}
                      </span>)}
                  </div>
                </div>}
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <button className="text-sm py-1 px-3 border border-input rounded-md hover:bg-muted transition-colors">
                    <Edit size={14} className="inline mr-1" />
                    Edit
                  </button>
                  <button className="text-sm py-1 px-3 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                    <Trash size={14} className="inline mr-1" />
                    Delete
                  </button>
                </div>
                {listing.status === 'active' && <button className="text-sm text-blue-600 hover:underline flex items-center">
                    <span>View Live</span>
                    <ExternalLink size={14} className="ml-1" />
                  </button>}
              </div>
            </div>
          </div>)}
      </div>
      {filteredListings.length === 0 && <div className="text-center py-12">
          <p className="text-muted-foreground">
            No listings found matching your search.
          </p>
        </div>}
    </div>;
};