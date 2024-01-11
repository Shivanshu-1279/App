
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'; 

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    // Fetching users
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = () => {
    // if (searchTerm.trim() === '') return;

    // Update past searches
    setPastSearches(prevSearches => [...prevSearches, searchTerm]);

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(filteredUsers);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setUsers(sortedUsers);
  };

  return (
    <div className="app-container">
      <h1>User Info</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="past-searches">
        <p>Past Searches:</p>
        {pastSearches.map((search, index) => (
          <span key={index}>{search}</span>
        ))}
      </div>
      <button onClick={handleSort}>Sort by Name</button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
