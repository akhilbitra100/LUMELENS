import React, { useState } from "react";
import { Calendar, MapPin, Clock, AlertCircle, IndianRupee, Users } from "lucide-react";

const Auction = () => {
  const [activeTab, setActiveTab] = useState("current");

  const currentAuctions = [
    {
      id: 1,
      title: 'White Land',
      description: 'Shiny Moon',
      category: 'AstroPhotography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375702/photo-uploads/nt1lltiil6najyarnbze.jpg',
      location: 'Grand Ballroom, Hotel Majestic',
      dateTime: 'April 12, 2025, 2:00 PM IST',
      attendees: 450,
      currentBid: "₹1,200"
    },
    {
      id: 2,
      title: 'Spider Eyes',
      description: 'Depth of Eyes',
      category: 'Macro Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375212/photo-uploads/qw0bhyvem97jbdicjogz.jpg',
      location: 'Art Gallery, Downtown Plaza',
      dateTime: 'April 15, 2025, 11:00 AM IST',
      attendees: 320,
      currentBid: "₹5000"
    },
    {
      id: 3,
      title: 'Clock Tower',
      description: 'Shows you the Time',
      category: 'Architecalture Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744373738/photo-uploads/uee3fjpplvvspmx5eez9.jpg',
      location: 'The Heritage Museum Hall',
      dateTime: 'April 18, 2025, 4:00 PM IST',
      attendees: 280,
      currentBid: "₹9000"
    },
  ];

  const upcomingAuctions = [
    {
      id: 4,
      title: 'Eiffel Tower',
      description: 'Known as Steel Tower',
      category: 'Black and White Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744376155/photo-uploads/fichzyuehxrfhw9v3l9e.jpg',
      location: 'The Collector\'s Guild Hall',
      dateTime: 'April 25, 2025, 3:00 PM IST',
      startingBid: "₹4000",
      expectedAttendees: 350
    },
    {
      id: 5,
      title: 'Fly High',
      description: 'Snow Surfing',
      category: 'Sports Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744354181/photo-uploads/xye9eo4gl8kexfosvaze.jpg',
      location: 'Sports Arena VIP Lounge',
      dateTime: 'April 30, 2025, 6:00 PM IST',
      startingBid: "₹6500",
      expectedAttendees: 500
    },
    {
      id: 6,
      title: 'Chubby Boy',
      description: 'Wall Printing',
      category: 'Fine Art Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744376325/photo-uploads/t0chekqfm7wbid5qq84x.jpg',
      location: 'The Numismatic Society Center',
      dateTime: 'May 5, 2025, 10:00 AM IST',
      startingBid: "₹8000",
      expectedAttendees: 400
    },
  ];

  const pastAuctions = [
    {
      id: 7,
      title: 'Sparkling Dragon',
      description: 'Dragon Festival',
      category: 'Event Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744374329/photo-uploads/om2vm4olufaaymaazoqn.jpg',
      location: 'Old Town Auction House',
      dateTime: 'April 01, 2024, 1:00 PM IST',
      soldPrice: '₹350',
      participants: 220
    },
    {
      id: 8,
      title: 'The Triplets',
      description: '3 Sheeps at Peak',
      category: 'Wildlife Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744352523/photo-uploads/p0dk1nq2ffeoogzeyaim.jpg',
      location: 'Modern Art Gallery',
      dateTime: 'March 15, 2024, 5:00 PM IST',
      soldPrice: '₹7000',
      participants: 180
    },
    {
      id: 9,
      title: 'Girl in Yellow',
      description: 'Crop Top and Cargo Pants',
      category: 'Fashion Photography',
      imageUrl: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744352900/photo-uploads/fgd7ln50ob5y8funfnpj.jpg',
      location: 'The Oriental Carpet Emporium',
      dateTime: 'March 10, 2025, 2:30 PM IST',
      soldPrice: '₹12000',
      participants: 310
    },
  ];

  const getAuctionsByTab = () => {
    switch(activeTab) {
      case "current": return currentAuctions;
      case "upcoming": return upcomingAuctions;
      case "past": return pastAuctions;
      default: return currentAuctions;
    }
  };

  const renderCardByType = (auction) => {
    switch(activeTab) {
      case "current":
        return (
          <div key={auction.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative">
              <img src={auction.imageUrl} alt={auction.title} className="w-full h-64 object-cover" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
              <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                Live Now
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 text-indigo-600 font-bold py-1 px-3 rounded-lg text-sm">
                  Current Bid: {auction.currentBid}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">{auction.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{auction.description}</p>
                <p className="my-2 text-base text-gray-500"><b>{auction.category} </b></p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                  <span>{auction.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                  <span>{auction.dateTime}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-4 w-4 mr-2 text-indigo-400" />
                  <span>{auction.attendees} participants</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "upcoming":
        return (
          <div key={auction.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative">
              <img src={auction.imageUrl} alt={auction.title} className="w-full h-64 object-cover" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                Coming Soon
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 text-emerald-600 font-bold py-1 px-3 rounded-lg text-sm">
                  Starting Bid: {auction.startingBid}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">{auction.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{auction.description}</p>
                <p className="my-2 text-base text-gray-500"><b>{auction.category} </b></p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                  <span>{auction.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
                  <span>{auction.dateTime}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-4 w-4 mr-2 text-emerald-400" />
                  <span>Expected: {auction.expectedAttendees}+ attendees</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "past":
        return (
          <div key={auction.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full opacity-90 hover:opacity-100">
            <div className="relative">
              <img src={auction.imageUrl} alt={auction.title} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
              <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                Completed
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 text-gray-700 font-bold py-1 px-3 rounded-lg text-sm flex items-center">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  Sold: {auction.soldPrice}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-3">{auction.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{auction.description}</p>
                <p className="my-2 text-base text-gray-500"><b>{auction.category} </b></p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{auction.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{auction.dateTime}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{auction.participants} participants</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Offline Auctions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exclusive items at our in-person auction events. Bid on rare collectibles, artwork, and more.
          </p>
        </div>

        {/* Tab Navigation with Fixed Background Colors */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white shadow-md rounded-lg p-1">
            <button
              onClick={() => setActiveTab("current")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "current"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Current Auctions
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "upcoming"
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming Auctions
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "past"
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Auctions
            </button>
          </div>
        </div>

        {/* Alert Box */}
        {activeTab === "current" && (
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg mb-8 flex items-start">
            <AlertCircle className="h-5 w-5 text-indigo-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-indigo-800">Live Auctions in Progress</h3>
              <p className="text-indigo-700 text-sm">These auctions are currently active. Register now to participate or visit the venue to bid in person.</p>
            </div>
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg mb-8 flex items-start">
            <AlertCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-800">Upcoming Auction Events</h3>
              <p className="text-emerald-700 text-sm">Register interest to receive notifications and secure your spot at these upcoming auctions.</p>
            </div>
          </div>
        )}

        {activeTab === "past" && (
          <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded-lg mb-8 flex items-start">
            <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800">Past Auction Results</h3>
              <p className="text-gray-700 text-sm">Browse completed auctions to see final sale prices and history of our events.</p>
            </div>
          </div>
        )}

        {/* Auction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getAuctionsByTab().map(auction => renderCardByType(auction))}
        </div>
      </div>
    </div>
  );
};

export default Auction;