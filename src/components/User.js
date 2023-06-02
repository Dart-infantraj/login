import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import {
  API_KEY_ADD_EMPLOYEE,
  API_KEY_ALL_EMPLOYEE,
  API_KEY_DELETE_EMPLOYEE,
  API_KEY_GETONE_EMPLOYEE,
  API_KEY_UPDATE,
} from '../Url';

export default function User() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [designation, setDesignation] = useState();
  const [joining, setJoining] = useState();
  const [epf, setEpf] = useState();
  const [esi, setEsi] = useState();
  const [photo, setPhoto] = useState();
  const [leaving, setLeaving] = useState();
  const [updateName, setUpdateName] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [updateMobile, setUpdateMobile] = useState();
  const [updateDesignation, setupdateDesignation] = useState();
  const [updateJoining, setUpdateJoining] = useState();
  const [updateEpf, setUpdateEpf] = useState();
  const [updateEsi, setUpdateEsi] = useState();
  const [updatePhoto, setUpdatePhoto] = useState();
  const [updateLeaving, setUpdateLeaving] = useState();

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
        console.log(res.data);
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
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // //put
  const changeEdit = (id) => {
    axios
      .get(
        API_KEY_GETONE_EMPLOYEE + id,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data.name);
        setUpdateName(res.data.name);
        setUpdateEmail(res.data.email);
        setUpdateMobile(res.data.mobile);
        setupdateDesignation(res.data.designation);
        setUpdateJoining(res.data.date_of_joining);
        setUpdateEpf(res.data.epf_uan);
        setUpdateEsi(res.data.esi_number);
        setUpdatePhoto(res.data.profile_photo);
        setUpdateLeaving(res.data.date_of_relieving);

        alert('edit');
        //setEditId(editId);
      })
      .catch((err) => console.log(err));
    setEditId(id);
  };

  //update

  const changeUpdate = () => {
    axios
      .put(
        API_KEY_UPDATE + editId,
        {
          name: updateName,
          email: updateEmail,
          mobile: updateMobile,
          designation: updateDesignation,
          date_of_joining: `${updateJoining}`,
          epf_uan: updateEpf,
          esi_number: updateEsi,
          profile_photo: updatePhoto,
          date_of_relieving: `${updateLeaving}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        alert('update');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //delete

  const deleteItem = (id) => {
    console.log('delete');
    axios
      .delete(
        API_KEY_DELETE_EMPLOYEE + id,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        alert('deleted');
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //paginations

  const [currentPage, setCurrentpage] = useState(1);
  const pagePer = 5;
  const lastIndex = currentPage * pagePer;
  const firstIndex = lastIndex - pagePer;
  const record = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / pagePer);
  const number = [...Array(nPages + 1).keys()].slice(1);

  const prevpage = () => {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  };
  const changePage = (id) => {
    setCurrentpage(id);
  };

  const nxtpage = () => {
    if (currentPage !== nPages) {
      setCurrentpage(currentPage + 1);
    }
  };
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
          {record.map((item, index) =>
            item.id === editId ? (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {' '}
                  <input type='text' name='name' value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                </td>
                <td>
                  {' '}
                  <input
                    type='text'
                    name='email'
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </td>
                <td>
                  {' '}
                  <input
                    type='number'
                    name='mobile'
                    value={updateMobile}
                    onChange={(e) => setUpdateMobile(e.target.value)}
                  />
                </td>
                <td>
                  {' '}
                  <input
                    type='text'
                    name='designation'
                    value={updateDesignation}
                    onChange={(e) => setupdateDesignation(e.target.value)}
                  />
                </td>

                <td>
                  {' '}
                  <input name='joining' value={updateJoining} onChange={(e) => setUpdateJoining(e.target.value)} />
                </td>

                <td>
                  {' '}
                  <input type='number' name='epf' value={updateEpf} onChange={(e) => setUpdateEpf(e.target.value)} />
                </td>

                <td>
                  {' '}
                  <input type='number' name='mobile' value={updateEsi} onChange={(e) => setUpdateEsi(e.target.value)} />
                </td>

                <td>
                  {' '}
                  <input
                    type='text'
                    name='photo'
                    value={updatePhoto}
                    onChange={(e) => setUpdatePhoto(e.target.value)}
                  />
                </td>
                <td>
                  {' '}
                  <input name='mobile' value={updateLeaving} onChange={(e) => setUpdateLeaving(e.target.value)} />
                </td>

                <button onClick={changeUpdate}>Update</button>
              </tr>
            ) : (
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
                  <button onClick={() => changeEdit(item.id)}>Edit</button>

                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prevpage}>
              Prev
            </a>
          </li>

          {number.map((n, i) => (
            <li className={`page-item ${currentPage === n ? `active` : ''}`} key={i}>
              <a href='#' className='page-link' onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))}

          <li className='page-item'>
            <a href='#' className='page-link' onClick={nxtpage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
