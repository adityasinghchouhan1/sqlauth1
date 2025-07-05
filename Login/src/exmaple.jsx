import React, { useEffect, useState } from 'react';

const Crud = () => {
  const [userdata, setUserdata] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({ name: '', password: '' });

  useEffect(() => {
    getLogindata();
  }, []);

  const getLogindata = async () => {
    try {
      const response = await fetch('http://localhost:8007/api/getuserLogin');
      const data = await response.json();
      setUserdata(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8007/api/getuserLoginUpdate/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const updatedData = await response.json();
      console.log(updatedData);
      getLogindata(); // Refresh the data after update
      setEditUserId(null); // Clear edit user ID
      setFormData({ name: '', password: '' }); // Reset form data
    } catch (error) {
      console.log('error', error);
    }
  };

  const initiateEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ name: user.name, password: user.password });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>
                {editUserId === item._id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editUserId === item._id ? (
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.password
                )}
              </td>
              <td>
                {editUserId === item._id ? (
                  <button onClick={() => handleUpdate(item._id)}>Save</button>
                ) : (
                  <button onClick={() => initiateEdit(item)}>Edit</button>
                )}
                <button onClick={() => Deleteuserdata(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Crud;
