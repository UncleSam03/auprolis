import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import { supabase } from '../../../lib/customSupabaseClient';

const AdminInstitutions = () => {
  const [agents, setAgents] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'agent')
        .order('created_at', { ascending: false });

      if (agentsError) throw agentsError;
      setAgents(agentsData || []);

      // Group by institution for the institutions list
      const { data: allProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('institution, name, email, status')
        .not('institution', 'is', null);

      if (profilesError) throw profilesError;

      const grouped = allProfiles.reduce((acc, profile) => {
        const inst = profile.institution;
        if (!acc[inst]) {
          acc[inst] = { name: inst, members: 0, activeMembers: 0 };
        }
        acc[inst].members += 1;
        if (profile.status === 'active') acc[inst].activeMembers += 1;
        return acc;
      }, {});

      setInstitutions(Object.values(grouped));

    } catch (err) {
      console.error('Error fetching institutional data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout 
      title="Institutional Governance" 
      subtitle="Manage registered agents and institutional entities across the platform."
    >
      <div className="space-y-12 pb-24">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-authoritative border border-outline-variant/10 group">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 mb-4">Registered Agents</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter leading-none">{agents.length}</h3>
              <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-authoritative border border-outline-variant/10 group">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 mb-4">Total Organizations</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter leading-none">{institutions.length}</h3>
              <span className="material-symbols-outlined text-secondary text-2xl">corporate_fare</span>
            </div>
          </div>
          <div className="bg-on-background text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-authoritative">
             <div className="absolute top-4 right-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Institutional Trust</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-[900] font-headline tracking-tighter leading-none">94%</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4B6BFB]">Verified Network</span>
            </div>
          </div>
        </section>

        {/* Managed Agents Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-authoritative border border-outline-variant/10">
          <header className="px-10 py-8 border-b border-outline-variant/5 bg-surface-container-low/30">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person_search</span>
              Active Agent Directory
            </h3>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-surface-container-low/10">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 whitespace-nowrap">Agent Identity</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 whitespace-nowrap">Organization</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 whitespace-nowrap">Status</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 whitespace-nowrap">Joined</th>
                  <th className="px-10 py-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-10 py-8 bg-surface-container-low/20 h-24 whitespace-nowrap"></td>
                    </tr>
                  ))
                ) : agents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center opacity-40 font-black uppercase tracking-widest text-[10px]">No registered agents detected</td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent.id} className="group hover:bg-surface transition-all duration-300">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs shadow-inner">
                             {(agent.name || 'A').charAt(0)}
                           </div>
                           <div className="flex flex-col gap-1">
                             <span className="font-black text-on-surface font-headline leading-none text-[1.1rem] transition-colors group-hover:text-primary">{agent.name || 'Incognito Agent'}</span>
                             <span className="text-[10px] font-medium text-outline opacity-40 italic">{agent.email}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className="text-xs font-black text-on-surface/60 font-body uppercase tracking-wider">{agent.institution || '—'}</span>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${agent.status === 'active' ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {agent.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-xs font-bold text-on-surface-variant opacity-40">
                        {new Date(agent.created_at).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-10 py-8 text-right">
                         <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-outline/30 hover:bg-on-surface hover:text-white transition-all">
                           <span className="material-symbols-outlined text-xl">shield_person</span>
                         </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Institutions Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {institutions.map((inst, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[2.5rem] border border-outline-variant/10 shadow-authoritative group transition-all hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                   <span className="material-symbols-outlined text-3xl">corporate_fare</span>
                </div>
                <div className="text-right">
                   <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{inst.activeMembers} Active</span>
                </div>
              </div>
              <h4 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-2 uppercase">{inst.name}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mb-6">Unified Administrative Entity</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/5">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-on-surface/40 uppercase mb-1">Network Capacity</span>
                    <span className="text-sm font-black text-on-surface">{inst.members} Registered Users</span>
                 </div>
                 <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/5 px-6 py-2 rounded-full transition-all flex items-center gap-2">
                   View Portfolio
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminInstitutions;
