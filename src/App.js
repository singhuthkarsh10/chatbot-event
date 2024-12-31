import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [preferences, setPreferences] = useState('');

  // Handle User Input
  const handleUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  // Handle Sending Messages
  const handleSendMessage = () => {
    if (userQuery) {
      setMessages([...messages, { sender: 'user', text: userQuery }]);
      getBotResponse(userQuery);
      setUserQuery('');
    }
  };

  // Handle Bot Response
  const getBotResponse = (query) => {
    // Here you would integrate with an actual bot or API
    if (query.toLowerCase().includes("event")) {
      fetchEvents();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: "Here are some events based on your query!" },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: "Sorry, I didn't quite understand that. Could you specify?" },
      ]);
    }
  };

  // Fetch Events Based on User's Query (This would normally be an API call)
  const fetchEvents = () => {
    // Example of events data - You would fetch real data from an API here
    const fetchedEvents = [
      { name: 'Music Concert', date: '2024-01-15', location: 'City Center', price: '$50' },
      { name: 'Art Exhibition', date: '2024-02-10', location: 'Gallery 1', price: 'Free' },
    ];
    setEvents(fetchedEvents);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="user-input">
          <input
            type="text"
            value={userQuery}
            onChange={handleUserQuery}
            placeholder="Ask me about events..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {events.length > 0 && (
        <div className="event-list">
          <h3>Recommended Events:</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.name}</strong><br />
                Date: {event.date}<br />
                Location: {event.location}<br />
                Price: {event.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;