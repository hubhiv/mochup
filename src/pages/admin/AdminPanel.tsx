import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Settings, Shield, AlertTriangle } from 'lucide-react';
// Mock data for boards
const MOCK_BOARDS = [{
  id: '1',
  title: 'Wedding Planning',
  description: 'Find the perfect vendors for your special day',
  theme: 'Wedding',
  status: 'active',
  vendorCount: 12,
  customerCount: 48,
  createdAt: '2023-05-15'
}, {
  id: '2',
  title: 'Home Renovation',
  description: 'Contractors and services for your renovation project',
  theme: 'Home',
  status: 'active',
  vendorCount: 8,
  customerCount: 32,
  createdAt: '2023-06-10'
}, {
  id: '3',
  title: 'Corporate Event Planning',
  description: 'Services for corporate events and parties',
  theme: 'Events',
  status: 'active',
  vendorCount: 15,
  customerCount: 27,
  createdAt: '2023-07-22'
}, {
  id: '4',
  title: 'Birthday Celebrations',
  description: 'Everything you need for the perfect birthday party',
  theme: 'Birthday',
  status: 'archived',
  vendorCount: 10,
  customerCount: 18,
  createdAt: '2023-04-05'
}];
// Mock data for pending approvals
const MOCK_APPROVALS = [{
  id: '1',
  type: 'provider_application',
  details: {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    business: 'Elegant Events',
    category: 'Event Planning',
    submittedAt: '2023-08-12'
  }
}, {
  id: '2',
  type: 'listing_review',
  details: {
    title: 'Premium DJ Services',
    provider: 'Rhythm Masters',
    category: 'Entertainment',
    reason: 'Price discrepancy',
    flaggedAt: '2023-08-14'
  }
}, {
  id: '3',
  type: 'provider_application',
  details: {
    name: 'Michael Brown',
    email: 'michael@example.com',
    business: 'Brown Photography',
    category: 'Photography',
    submittedAt: '2023-08-15'
  }
}];
export const AdminPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'boards' | 'approvals'>('boards');
  const filteredBoards = MOCK_BOARDS.filter(board => {
    const matchesSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase()) || board.description.toLowerCase().includes(searchQuery.toLowerCase()) || board.theme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || board.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Control Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage system boards, users, and approvals
          </p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button className={`py-2 px-4 font-medium ${activeTab === 'boards' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`} onClick={() => setActiveTab('boards')}>
          Boards Management
        </button>
        <button className={`py-2 px-4 font-medium ${activeTab === 'approvals' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`} onClick={() => setActiveTab('approvals')}>
          Pending Approvals{' '}
          <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
            {MOCK_APPROVALS.length}
          </span>
        </button>
      </div>
      {activeTab === 'boards' && <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="text" placeholder="Search boards..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-input rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <select className="border border-input rounded-md py-2 px-3" value={statusFilter || ''} onChange={e => setStatusFilter(e.target.value || null)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center gap-2">
              <Plus size={16} />
              <span>New Board</span>
            </button>
          </div>
          {/* Boards Table */}
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Board</th>
                  <th className="text-left py-3 px-4 font-medium">Theme</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Vendors</th>
                  <th className="text-left py-3 px-4 font-medium">Customers</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoards.map(board => <tr key={board.id} className="border-t border-border">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{board.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {board.description.substring(0, 40)}...
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{board.theme}</td>
                    <td className="py-3 px-4">
                      <span className={`
                        inline-block px-2 py-1 text-xs rounded-full
                        ${board.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                      `}>
                        {board.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{board.vendorCount}</td>
                    <td className="py-3 px-4 text-sm">{board.customerCount}</td>
                    <td className="py-3 px-4 text-sm">{board.createdAt}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          View
                        </button>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button className={`text-sm ${board.status === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'}`}>
                          {board.status === 'active' ? 'Archive' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </>}
      {activeTab === 'approvals' && <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
          </div>
          {MOCK_APPROVALS.map(approval => <div key={approval.id} className="bg-white p-4 rounded-lg border border-border">
              <div className="flex items-start">
                <div className={`
                  p-3 rounded-full mr-4
                  ${approval.type === 'provider_application' ? 'bg-blue-100' : 'bg-amber-100'}
                `}>
                  {approval.type === 'provider_application' ? <Users className={`text-blue-500`} size={24} /> : <AlertTriangle className={`text-amber-500`} size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">
                        {approval.type === 'provider_application' ? `Provider Application: ${approval.details.name}` : `Listing Review: ${approval.details.title}`}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm">
                        {approval.type === 'provider_application' ? <>
                            <p>
                              <span className="text-muted-foreground">
                                Business:
                              </span>{' '}
                              {approval.details.business}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Email:
                              </span>{' '}
                              {approval.details.email}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Category:
                              </span>{' '}
                              {approval.details.category}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Submitted:
                              </span>{' '}
                              {approval.details.submittedAt}
                            </p>
                          </> : <>
                            <p>
                              <span className="text-muted-foreground">
                                Provider:
                              </span>{' '}
                              {approval.details.provider}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Category:
                              </span>{' '}
                              {approval.details.category}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Reason:
                              </span>{' '}
                              {approval.details.reason}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Flagged:
                              </span>{' '}
                              {approval.details.flaggedAt}
                            </p>
                          </>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="py-1 px-3 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors">
                        Approve
                      </button>
                      <button className="py-1 px-3 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          {MOCK_APPROVALS.length === 0 && <div className="text-center py-12 bg-white rounded-lg border border-border">
              <Shield className="mx-auto text-green-500 mb-2" size={32} />
              <p className="text-muted-foreground">
                No pending approvals at this time.
              </p>
            </div>}
        </div>}
    </div>;
};