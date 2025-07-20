import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, ShieldAlert, BarChart2, Plus } from 'lucide-react';
// Mock data for admin stats
const MOCK_STATS = {
  totalUsers: 248,
  totalBoards: 32,
  totalListings: 156,
  pendingApprovals: 8
};
// Mock data for recent activities
const MOCK_ACTIVITIES = [{
  id: '1',
  type: 'user_registration',
  details: 'New provider registration: Sarah Johnson',
  time: '10 minutes ago'
}, {
  id: '2',
  type: 'listing_created',
  details: 'New listing: "Wedding Photography Package" by John Smith',
  time: '1 hour ago'
}, {
  id: '3',
  type: 'board_created',
  details: 'New board: "Corporate Event Planning" created',
  time: '3 hours ago'
}, {
  id: '4',
  type: 'listing_flagged',
  details: 'Listing flagged: "DJ Services" - pricing issue',
  time: '5 hours ago'
}, {
  id: '5',
  type: 'user_registration',
  details: 'New customer registration: Michael Brown',
  time: '8 hours ago'
}];
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            System overview and management
          </p>
        </div>
        <button onClick={() => navigate('/admin/board/new')} className="bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center gap-2">
          <Plus size={16} />
          <span>Create Board</span>
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">{MOCK_STATS.totalUsers}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ClipboardList className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Boards</p>
              <h3 className="text-2xl font-bold">{MOCK_STATS.totalBoards}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart2 className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Listings</p>
              <h3 className="text-2xl font-bold">{MOCK_STATS.totalListings}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <ShieldAlert className="text-amber-500" size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Pending Approvals</p>
              <h3 className="text-2xl font-bold">
                {MOCK_STATS.pendingApprovals}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="p-4">
              {MOCK_ACTIVITIES.map(activity => <div key={activity.id} className="py-3 border-b border-border last:border-0">
                  <div className="flex justify-between">
                    <p>{activity.details}</p>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="bg-white rounded-lg border border-border p-4">
            <div className="space-y-3">
              <button onClick={() => navigate('/admin/users')} className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted rounded-md transition-colors">
                <Users size={18} />
                <span>Manage Users</span>
              </button>
              <button onClick={() => navigate('/admin/panel')} className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted rounded-md transition-colors">
                <ClipboardList size={18} />
                <span>Manage Boards</span>
              </button>
              <button onClick={() => navigate('/admin/approvals')} className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted rounded-md transition-colors">
                <ShieldAlert size={18} />
                <span>Review Pending Approvals</span>
              </button>
              <button onClick={() => navigate('/admin/analytics')} className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted rounded-md transition-colors">
                <BarChart2 size={18} />
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};