import React, { useEffect, useState } from 'react';

const Crud = () => {
  const [userdata, setUserdata] = useState([]);
  const [editUser, setEdituser] = useState(null);
  const [formdata, setFormdata] = useState({ name: '', password: '' });
  useEffect(() => {
    getLogindata();
  }, []);
  const getLogindata = async () => {
    try {
      const getdata = await fetch('http://localhost:8007/api/getuserLogin');
      const data = await getdata.json();
      setUserdata(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const Deleteuserdata = async (id) => {
    try {
      const getdeleteData = await fetch(
        `http://localhost:8007/api/getuserLoginDelete/${id}`,
        { method: 'DELETE' }
      );
      const deletdata = await getdeleteData.json();
      console.log(deletdata);
    } catch (error) {
      console.log('error', error);
    }
  };

  const UpdateuserLogin = async (id) => {
    try {
      const getupdateData = await fetch(
        `http://localhost:8007/api/getuserLoginUpdate/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
        }
      );
      const response = await getupdateData.json();
      console.log(response);
      setEdituser(null);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const initiateEdit = (user) => {
    setEdituser(user._id);
    setFormdata({ name: user.name, password: user.password });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((item, index) => {
            return (
              // Use return statement here
              <tr key={index}>
                <td>{item._id}</td>
                <td>
                  {editUser === item._id ? (
                    <input
                      type="text"
                      name="name"
                      value={formdata.name}
                      onChange={handleinputChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editUser === item._id ? (
                    <input
                      type="text"
                      name="password"
                      value={formdata.password}
                    />
                  ) : (
                    item.password
                  )}
                </td>
                <td>
                  {editUser === item._id ? (
                    <button onClick={() => UpdateuserLogin(item._id)}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => initiateEdit(item)}>EDIT</button>
                  )}
                </td>
                <td>
                  <button onClick={() => Deleteuserdata(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Crud;
