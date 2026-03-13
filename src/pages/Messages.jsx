import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Send, User, Loader2, PlusCircle, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Messages = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
      // Optional: Polling for new messages
      const interval = setInterval(() => fetchMessages(selectedUser.id, true), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchConversations = async () => {
    try {
      // Fetch all messages where user is sender or receiver
      const { data: sent, error: sentError } = await supabase
        .from('messages')
        .select('receiver_id, created_at')
        .eq('sender_id', user.id);
        
      const { data: received, error: receivedError } = await supabase
        .from('messages')
        .select('sender_id, created_at')
        .eq('receiver_id', user.id);

      if (sentError || receivedError) throw new Error("Failed to fetch conversations");

      // Extract unique user IDs
      const uniqueIds = new Set();
      sent?.forEach(m => uniqueIds.add(m.receiver_id));
      received?.forEach(m => uniqueIds.add(m.sender_id));
      
      if (uniqueIds.size === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Fetch user details for these IDs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, email, user_type')
        .in('id', Array.from(uniqueIds));

      if (profilesError) throw profilesError;
      setConversations(profiles || []);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Could not load conversations." });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId, silent = false) => {
    if (!silent) setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error(error);
      if (!silent) toast({ variant: "destructive", title: "Error", description: "Could not load messages." });
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const tempMessage = {
      id: 'temp-' + Date.now(),
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content: newMessage,
      created_at: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: selectedUser.id,
          content: tempMessage.content
        }]);

      if (error) throw error;
      
      // Refresh to get real ID and timestamp
      fetchMessages(selectedUser.id, true);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to send message." });
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id)); // Rollback
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if(!userSearchTerm.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, user_type')
        .ilike('email', `%${userSearchTerm}%`)
        .limit(5);
        
      if(error) throw error;
      setSearchResults(data || []);
    } catch(error) {
      console.error(error);
    }
  };

  const startNewConversation = (userProfile) => {
    setSelectedUser(userProfile);
    setShowNewMessageModal(false);
    setUserSearchTerm('');
    setSearchResults([]);
    
    // Add to conversations list if not already there
    if (!conversations.find(c => c.id === userProfile.id)) {
      setConversations(prev => [userProfile, ...prev]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Messages - Auprolis</title>
      </Helmet>
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-64px)]">
        
        {/* Sidebar */}
        <div className={`md:col-span-1 bg-white rounded-lg border shadow-sm flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
            <h2 className="font-bold text-lg text-gray-800">Messages</h2>
            <Button size="icon" variant="ghost" onClick={() => setShowNewMessageModal(true)}>
              <PlusCircle className="h-5 w-5 text-[#2563eb]" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No conversations yet. Start a new chat!
              </div>
            ) : (
              conversations.map(conv => (
                <div 
                  key={conv.id}
                  onClick={() => setSelectedUser(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-[#2563eb]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-900 truncate">{conv.name || conv.email}</p>
                      <p className="text-xs text-gray-500 capitalize">{conv.user_type}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`md:col-span-3 bg-white rounded-lg border shadow-sm flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
          {!selectedUser ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <User className="h-16 w-16 mb-4 opacity-20" />
              <p>Select a conversation to start messaging</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center gap-3 bg-gray-50 rounded-t-lg">
                <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setSelectedUser(null)}>Back</Button>
                <div className="bg-[#2563eb] rounded-full p-2">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedUser.name || selectedUser.email}</h3>
                  <p className="text-xs text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
                {loadingMessages ? (
                  <div className="flex justify-center p-4"><Loader2 className="animate-spin text-gray-400" /></div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-400 my-8 text-sm">No messages yet. Say hello!</div>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.sender_id === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${isMe ? 'bg-[#2563eb] text-white rounded-br-none' : 'bg-white border shadow-sm rounded-bl-none text-gray-800'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white rounded-b-lg">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New Message Modal Overlay */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4">New Message</h3>
            <form onSubmit={handleSearchUsers} className="flex gap-2 mb-4">
              <Input 
                placeholder="Search user by email..." 
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
              />
              <Button type="submit"><Search className="h-4 w-4" /></Button>
            </form>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map(res => (
                  <div 
                    key={res.id} 
                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => startNewConversation(res)}
                  >
                    <div>
                      <p className="font-medium text-sm">{res.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{res.email}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Send className="h-4 w-4 text-blue-500" /></Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Search for users to message</p>
              )}
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => setShowNewMessageModal(false)}>Cancel</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Messages;