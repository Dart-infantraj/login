import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { API_KEY_ADD_EMPLOYEE, API_KEY_ALL_EMPLOYEE } from '../Url';

export default function User() {
  const [data, setData] = useState([]);
  // const [editId, setEditId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [designation, setDesignation] = useState();
  const [joining, setJoining] = useState();
  const [epf, setEpf] = useState();
  const [esi, setEsi] = useState();
  const [photo, setPhoto] = useState();
  const [leaving, setLeaving] = useState();
  // const [updateName, setUpdateName] = useState();
  // const [updateEmail, setupdateEmail] = useState();

  const token = localStorage.getItem('token');
  console.log(token);

  // all employees details
  useEffect(() => {
    axios
      .get(API_KEY_ALL_EMPLOYEE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert('get data');
        console.log(res);
        setData(res.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  //create
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        API_KEY_ADD_EMPLOYEE,
        {
          name: name,
          email: email,
          mobile: mobile,
          designation: designation,
          date_of_joining: joining,
          epf_uan: epf,
          esi_number: esi,
          profile_photo: photo,
          date_of_relieving: leaving,
        },

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        alert('create employee');
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // //put
  // const changeEdit = (id) => {
  //   axios
  //     .get(url + id)
  //     .then((res) => {
  //       console.log(res);
  //       setUpdateName(res.data.name);

  //       setupdateEmail(res.data.email);
  //     })
  //     .catch((err) => {
  //       setEditId(id);
  //     });
  // };

  // const payload = {
  //   id: editId,
  //   name: updateName,
  //   email: updateEmail,
  // };

  // const options = JSON.stringify(payload);
  //update
  // const changeUpdate = (editId) => {
  //   axios
  //     .put(${url ${editId}, payload, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       alert('update');
  //       setEditId(-1);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='name' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
          <input type='email' placeholder='Enter Your email' onChange={(e) => setEmail(e.target.value)} />
          <input type='number' placeholder='Enter Your mobile no' onChange={(e) => setMobile(e.target.value)} />
          <input type='text' placeholder='Enter Your designation' onChange={(e) => setDesignation(e.target.value)} />
          <input type='date' placeholder='Enter Your joining date' onChange={(e) => setJoining(e.target.value)} />
          <input type='number' placeholder='Enter Your epf uan' onChange={(e) => setEpf(e.target.value)} />
          <input type='number' placeholder='Enter Your esi no' onChange={(e) => setEsi(e.target.value)} />
          <input type='text' placeholder='Enter Your photo' onChange={(e) => setPhoto(e.target.value)} />
          <input type='date' placeholder='Enter Your relieving' onChange={(e) => setLeaving(e.target.value)} />
        </div>
        <button>Add</button>
      </form>

      <table className='container'>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>email</th>
            <th>mobile</th>
            <th>designation</th>
            <th>date_of_joining</th>
            <th>epf_uan</th>
            <th>esi_number</th>
            <th>profile_photo</th>
            <th>date_of_relieving</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            // item.id === editId ? (
            //   <tr key={index}>
            //     <td>{item.id}</td>
            //     <td>
            //       {' '}
            //       <input type='text' name='name' onChange={(e) => setUpdateName(e.target.value)} />
            //     </td>
            //     <td>
            //       <input type='text' name='email' onChange={(e) => setupdateEmail(e.target.value)} />
            //     </td>
            //     <td>
            //       <button onClick={changeUpdate}>Update</button>
            //     </td>
            //   </tr>
            // ) :
            <tr key={item.index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.designation}</td>
              <td>{item.date_of_joining}</td>
              <td>{item.epf_uan}</td>
              <td>{item.esi_number}</td>
              <td>{item.profile_photo}</td>
              <td>{item.date_of_relieving}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
