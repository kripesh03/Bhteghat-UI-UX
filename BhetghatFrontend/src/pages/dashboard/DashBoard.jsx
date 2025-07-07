// Dashboard.jsx (Updated with smaller pie chart)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';
import { MdEventNote, MdAttachMoney, MdPerson4, MdCategory } from 'react-icons/md';
import RevenueChart from './RevenueChart';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSales: 0,
    totalOrders: 0,
    eventsByCategory: {},
    upcomingEvents: [],
  });
  const [revenueData, setRevenueData] = useState(Array(12).fill(0));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/api/admin2`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const productRes = await axios.get(`${getBaseUrl()}/api/product`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const allEvents = productRes.data || [];
        const upcomingEvents = allEvents
          .filter(e => new Date(e.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        const eventsByCategory = allEvents.reduce((acc, cur) => {
          acc[cur.category] = (acc[cur.category] || 0) + 1;
          return acc;
        }, {});

        setStats({
          totalEvents: res.data.totalProducts,
          totalSales: parseFloat(res.data.totalSales).toFixed(2),
          totalOrders: res.data.totalOrders,
          eventsByCategory,
          upcomingEvents,
        });

        const monthlySales = res.data.monthlySales || [];
        const monthlyRevenue = Array(12).fill(0);
        monthlySales.forEach(entry => {
          const month = new Date(entry._id + '-01').getMonth();
          monthlyRevenue[month] = entry.totalSales;
        });
        setRevenueData(monthlyRevenue);

      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="flex items-center p-5 bg-white rounded-lg shadow border">
      <div className={`h-12 w-12 flex items-center justify-center rounded-full bg-${color}-100 text-${color}-600 mr-4`}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold">{value ?? 0}</div>
        <div className="text-gray-600 text-sm">{title}</div>
      </div>
    </div>
  );

  const categoryPieData = {
    labels: Object.keys(stats.eventsByCategory),
    datasets: [
      {
        label: 'Events',
        data: Object.values(stats.eventsByCategory),
        backgroundColor: [
          '#60a5fa', '#fbbf24', '#34d399', '#f472b6', '#818cf8', '#f87171'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="px-36 py-6 bg-[#f8fcff] min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Namaste, Organizer!</h1>
          <p className="text-sm text-gray-600">Welcome back. Here’s an overview of your events and engagement.</p>
        </div>
        <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">🗓 Active Organizer</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Events" value={stats.totalEvents} icon={<MdEventNote className="w-6 h-6" />} color="blue" />
        <StatCard title="Total Revenue" value={`Rs. ${stats.totalSales}`} icon={<MdAttachMoney className="w-6 h-6" />} color="green" />
        <StatCard title="Total RSVP's" value={stats.totalOrders} icon={<MdPerson4 className="w-6 h-6" />} color="orange" />
        <StatCard title="Categories" value={Object.keys(stats.eventsByCategory).length} icon={<MdCategory className="w-6 h-6" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow border min-h-[300px]">
          <h3 className="font-semibold text-gray-800 mb-2">RSVP Trends (Monthly Sales)</h3>
          <RevenueChart revenueData={revenueData} />
        </div>
        <div className="bg-white p-5 rounded-lg shadow border min-h-[300px] flex items-center justify-center">
          <div className="w-full max-w-xs">
            <h3 className="font-semibold text-center text-gray-800 mb-4">Events by Category</h3>
            <Pie data={categoryPieData} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Upcoming Events</h3>
        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {stats.upcomingEvents.slice(0, 2).map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>{event.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.category}</td>
                  <td className="px-6 py-4">Rs. {parseFloat(event.price?.$numberDecimal ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            onClick={() => navigate('/dashboard/manage-product')}
            className="p-4 text-right text-blue-500 font-medium cursor-pointer"
          >
            View All →
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;