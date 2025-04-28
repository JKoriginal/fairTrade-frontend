import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface SupportTicket {
  _id: string;
  subject: string;
  category: string;
  description: string;
  priority: string;
  createdAt: string;
  attachment?: string;
}

const SupportProducts = () => {
  const { user } = useAuthStore();
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSupportTickets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/support');
        if (!response.ok) {
          throw new Error('Failed to fetch support tickets');
        }
        const data = await response.json();
        setSupportTickets(data);
      } catch (error) {
        console.error('Error fetching support tickets:', error);
        toast.error('Failed to load support tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupportTickets();
  }, []);

  const getUniquePriorities = () => {
    const priorities = supportTickets.map(ticket => ticket.priority);
    return ['all', ...Array.from(new Set(priorities))];
  };

  const priorities = getUniquePriorities();

  const filteredTickets = selectedPriority === 'all'
    ? supportTickets
    : supportTickets.filter(ticket => ticket.priority === selectedPriority);

  const getFullAttachmentUrl = (attachment: string) => {
    return `http://localhost:5000/${attachment}`;
  };

  return (
    <div className="relative p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Filter className="w-6 h-6 text-gray-600" />
        <div className="flex flex-wrap gap-3">
          {priorities.map(priority => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority)}
              className={`px-5 py-3 rounded-lg text-lg ${selectedPriority === priority
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {priority === 'all' ? 'All Priorities' : priority}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg text-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Subject</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Description</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Priority</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Attachment</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <tr key={ticket._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">{ticket.subject}</td>
                    <td className="px-6 py-4 text-gray-700">{ticket.category}</td>
                    <td className="px-6 py-4 text-gray-700">{ticket.description}</td>
                    <td className="px-6 py-4 text-gray-700">{ticket.priority}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {ticket.attachment ? (
                        <a href={getFullAttachmentUrl(ticket.attachment)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Attachment
                        </a>
                      ) : (
                        <span className="text-gray-500">No Attachment</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No tickets found</td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>
      )}
    </div>
  );
};

export default SupportProducts;