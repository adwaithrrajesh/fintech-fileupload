import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [headers, setHeaders] = useState();

  useEffect(() => {
    getFintechToken();
  }, []);

  const getFintechToken = async () => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1YWFhMTEzYzU1MTA5ZDE4NGU2ZWUiLCJpYXQiOjE3MDc0NTMwODksImV4cCI6MTcwOTE4MTA4OX0.cFkkwjoNLOCQi0oLJQW0tkw74ocmOOrQVxxs6GPKjoc';
    const response = await axios.get('https://simplus-backend.onrender.com/api/getTokenFromFintech', { headers: { 'Authorization': `Bearer ${userToken}` } });
    setHeaders({ ...response.data.headers, 'Content-Type': 'multipart/form-data' });
    console.log(response.data.headers)
  };

  const fileUpload = async (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
    const formData = new FormData();
    formData.append('file', file);
    console.log(headers,'hereeeeeeeee')
    try {
      const response = await axios.post('https://s.finprim.com/files', formData, { headers });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <>
      <input type="file" onChange={fileUpload} />
    </>
  );
}

export default App;
