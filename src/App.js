import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const api = 'https://quickchart.io/qr'
  const [link, setLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading]=useState(false);
  useEffect(() => {
    return () => {
      if (qrCode) URL.revokeObjectURL(qrCode);
    };
  }, [qrCode])
  const generateQr = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(api, {
        params: {
          text: link,
          dark:"ffffff",
          light:"000000"
        },
        responseType: "blob",
      })
      const blobUrl = URL.createObjectURL(response.data);
      setTimeout(() => {
        setQrCode(blobUrl);
        setIsLoading(false);
      }, 5000);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Enter the URL or Text and get Your QR code!</h1>
      <div className='input'>
        <form onSubmit={generateQr} className='form'>
          <input type='text' placeholder='Enter URL here' onChange={(e) => setLink(e.target.value)} />
          <button>Generate QR Code</button>
        </form>
      </div>
      {isLoading && (
        <div>
          <h1>Your content is loading</h1>
        </div>
      )}
      {qrCode && !isLoading &&
      (
        <div className='output'>
          <img src={qrCode} />
        </div>
      )}
    </div>
  );
}

export default App;
