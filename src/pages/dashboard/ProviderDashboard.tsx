import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, Users, ClipboardList } from 'lucide-react';
// Mock data for provider stats
const MOCK_STATS = {
  totalListings: 8,
  activeListings: 5,
  totalBoards: 3,
  totalReferrals: 42,
  recentInquiries: 12
};
// Mock data for listings
const MOCK_LISTINGS = [{
  id: '1',
  title: 'Wedding Photography Package',
  description: 'Professional photography services for your wedding day',
  price: '$1,500 - $3,000',
  category: 'Photography',
  status: 'active',
  boardCount: 2,
  inquiries: 8
}, {
  id: '2',
  title: 'Event Catering Services',
  description: 'Catering for weddings and corporate events',
  price: '$25 - $45 per person',
  category: 'Food & Beverage',
  status: 'active',
  boardCount: 3,
  inquiries: 15
}, {
  id: '3',
  title: 'DJ Services',
  description: 'Professional DJ services for any event',
  price: '$800 - $1,200',
  category: 'Entertainment',
  status: 'active',
  boardCount: 1,
  inquiries: 5
}];
export const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your listings and track performance
          </p>
        </div>
        <button onClick={() => navigate('/provider/listings/new')} className="bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center gap-2">
          <Plus size={16} />
          <span>New Listing</span>
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ClipboardList className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Listings</p>
              <h3 className="text-2xl font-bold">{MOCK_STATS.totalListings}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart2 className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Active Listings</p>
              <h3 className="text-2xl font-bold">
                {MOCK_STATS.activeListings}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <ClipboardList className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Boards</p>
              <h3 className="text-2xl font-bold">{MOCK_STATS.totalBoards}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Users className="text-amber-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Referrals</p>
              <h3 className="text-2xl font-bold">
                {MOCK_STATS.totalReferrals}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Listings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Listing</th>
                <th className="text-left py-3 px-4 font-medium">Category</th>
                <th className="text-left py-3 px-4 font-medium">Price</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Boards</th>
                <th className="text-left py-3 px-4 font-medium">Inquiries</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LISTINGS.map(listing => <tr key={listing.id} className="border-t border-border">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {listing.description.substring(0, 40)}...
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{listing.category}</td>
                  <td className="py-3 px-4 text-sm">{listing.price}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{listing.boardCount}</td>
                  <td className="py-3 px-4 text-sm">{listing.inquiries}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => navigate(`/provider/listings/${listing.id}`)} className="text-sm text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Board Associations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Board Associations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium mb-2">Wedding Planning</h3>
            <p className="text-sm text-muted-foreground mb-3">
              3 active listings
            </p>
            <button className="text-sm text-primary hover:underline">
              View Board
            </button>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium mb-2">Corporate Events</h3>
            <p className="text-sm text-muted-foreground mb-3">
              2 active listings
            </p>
            <button className="text-sm text-primary hover:underline">
              View Board
            </button>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium mb-2">Birthday Celebrations</h3>
            <p className="text-sm text-muted-foreground mb-3">
              1 active listing
            </p>
            <button className="text-sm text-primary hover:underline">
              View Board
            </button>
          </div>
        </div>
      </div>
    </div>;
};