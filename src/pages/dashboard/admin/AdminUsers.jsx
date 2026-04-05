import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import { supabase } from '../../../lib/customSupabaseClient';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout title="Community Management" subtitle="Monitor and verify user accounts across the Botswana real estate ecosystem.">
      <div className="space-y-12 pb-24">
        {/* Filters Toolbar */}
        <section className="bg-surface-container-low/50 rounded-[2.5rem] p-10 flex flex-wrap gap-12 items-center border border-outline-variant/10 shadow-inner">
          <div className="space-y-2 group cursor-pointer">
            <label className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] ml-1 font-headline">Account Role</label>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-outline-variant/5 group-hover:border-primary/50 transition-all">
              <span className="text-sm font-[800] text-on-surface">Role: All Member Types</span>
              <span className="material-symbols-outlined text-sm text-outline/30">expand_more</span>
            </div>
          </div>
          <div className="w-[2px] h-12 bg-outline-variant/15 rounded-full"></div>
          <div className="space-y-2 group cursor-pointer">
            <label className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] ml-1 font-headline">Verification</label>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-outline-variant/5 group-hover:border-primary/50 transition-all">
              <span className="text-sm font-[800] text-on-surface">Status: Global Verification</span>
              <span className="material-symbols-outlined text-sm text-outline/30">expand_more</span>
            </div>
          </div>
          <div className="w-[2px] h-12 bg-outline-variant/15 rounded-full"></div>
          <div className="space-y-2 group cursor-pointer">
            <label className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] ml-1 font-headline">Intelligence Plan</label>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-outline-variant/5 group-hover:border-primary/50 transition-all">
              <span className="text-sm font-[800] text-on-surface">Any Intelligence Tier</span>
              <span className="material-symbols-outlined text-sm text-outline/30">expand_more</span>
            </div>
          </div>
          <button className="ml-auto flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 px-6 py-3 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Advanced Analytics
          </button>
        </section>

        {/* User Directory Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-authoritative border border-outline-variant/10">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-surface-container-low/30">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Intelligence Identity</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Role & Position</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Organization</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Plan Tier</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Joined</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Status</th>
                <th className="px-10 py-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 leading-none">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-10 py-8 bg-surface-container-low/20 h-24"></td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-10 py-20 text-center opacity-40 font-black uppercase tracking-widest text-[10px]">No active entity records</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="group hover:bg-surface transition-all duration-300">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-[900] text-sm font-headline shadow-inner scale-100 group-hover:scale-110 transition-transform ${
                            user.user_type === 'admin' ? 'bg-error/10 text-error' : 
                            user.user_type === 'seller' ? 'bg-primary/10 text-primary' : 
                            user.user_type === 'agent' ? 'bg-tertiary/10 text-tertiary' : 'bg-secondary/10 text-secondary'
                          }`}>
                            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-[800] text-[1.1rem] text-on-surface font-headline leading-tight group-hover:text-primary transition-colors">{user.name || 'Incognito User'}</span>
                            <span className="text-[11px] font-medium text-on-surface-variant opacity-40 italic">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest leading-none shadow-sm ${
                          user.user_type === 'agent' ? 'bg-tertiary/10 text-tertiary' : 
                          user.user_type === 'seller' ? 'bg-primary/10 text-primary' : 
                          user.user_type === 'admin' ? 'bg-on-surface/90 text-white' : 'bg-surface-container-high text-on-surface-variant opacity-60'
                        }`}>
                          {user.user_type || 'Buyer'}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-sm font-[800] text-on-surface/70 italic">{user.institution || '—'}</td>
                      <td className="px-8 py-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-[900] text-on-surface leading-none">{user.subscription_type || 'Free'}</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-outline/40 leading-none">Intelligence Tier</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-xs font-bold text-on-surface-variant opacity-60 font-body">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${
                            user.status?.toLowerCase() === 'active' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                            user.status?.toLowerCase() === 'pending' ? 'bg-amber-400 shadow-amber-400/20' : 'bg-error shadow-error/20'
                          }`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            user.status?.toLowerCase() === 'active' ? 'text-emerald-700' : 
                            user.status?.toLowerCase() === 'pending' ? 'text-amber-700' : 'text-error'
                          }`}>
                            {user.status || 'Active'}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-outline/30 hover:bg-on-surface hover:text-white transition-all shadow-md group-hover:shadow-lg">
                          <span className="material-symbols-outlined text-xl">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
          </table>
          
          <footer className="px-10 py-8 flex items-center justify-between bg-surface-container-low/30 border-t border-outline-variant/10">
            <span className="text-[11px] font-black uppercase tracking-widest text-outline/40 italic">System Directory Coverage: 2,482 Entity Records</span>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-outline/40 flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-primary text-white text-xs font-black shadow-xl shadow-primary/20 flex items-center justify-center">1</span>
                <span className="w-10 h-10 rounded-xl text-on-surface font-black text-xs hover:bg-white transition-all flex items-center justify-center cursor-pointer">2</span>
                <span className="w-10 h-10 rounded-xl text-on-surface font-black text-xs hover:bg-white transition-all flex items-center justify-center cursor-pointer">3</span>
              </div>
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </footer>
        </section>

        {/* Global Intelligence Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { 
              label: 'Total Institutional Users', 
              value: users.filter(u => u.institution && u.institution !== '—').length.toString(), 
              trend: '+12%', 
              color: 'emerald', 
              icon: 'corporate_fare' 
            },
            { 
              label: 'Pending Approvals', 
              value: users.filter(u => u.status?.toLowerCase() === 'pending').length.toString(), 
              icon: 'hourglass_empty', 
              color: 'amber' 
            },
            { 
              label: 'Platform Reach', 
              value: users.length.toString(), 
              trend: 'Users', 
              color: 'emerald', 
              icon: 'group' 
            },
            { 
              label: 'Network Gravity', 
              value: '99.9%', 
              subtext: 'System Stable', 
              icon: 'shield', 
              color: 'primary' 
            }
          ].map((stat, idx) => (stat.label === 'Network Gravity' ? (
            <div key={idx} className="bg-on-background text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-authoritative">
              <div className="absolute top-4 right-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-[900] font-headline tracking-tighter leading-none">{stat.value}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4B6BFB]">{stat.subtext}</span>
              </div>
            </div>
          ) : (
            <div key={idx} className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-authoritative border border-outline-variant/10 group hover:scale-[1.03] transition-all">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter leading-none">{stat.value}</h3>
                {stat.trend && (
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {stat.trend}
                  </span>
                )}
                {stat.icon && !stat.trend && (
                  <span className={`material-symbols-outlined text-2xl ${
                    stat.color === 'amber' ? 'text-amber-500' : 'text-primary'
                  }`}>{stat.icon}</span>
                )}
              </div>
            </div>
          )))}
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUsers;
