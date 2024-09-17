import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // const query = generateContent(`what payment methods do you allow?`);
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState('');
  const divRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
    const fetchData = async () => {
      // const newArray = [...result];
      setResult((result) => [...result, message]);
      setMessage("");
      try {
        const response = await fetch('/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message
          })
                });
        const data = await response.json(); // Assuming the backend sends JSON
        // console.log(typeof data);
        // console.log("response: ", data);
        setResult((result) => [...result, data.candidates[0].content.parts[0].text]); //Only sets chat response as result data
        // setResult(newArray);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchData();
        // Trigger your action here
      }
    };

    const handleFileChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };
  
    const handleReset = () => {
      setSelectedImage(null);
    };
  

    useEffect(() => {
      if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }, [result]);

  //   fetchData();
  // }, []);

  return (
    <div className="chatbox">
      <h1>Medical Chatbot Demo</h1>
      <div className='messages' ref={divRef}>
          {result.map((result, index) => <p key={index}>{result}</p>)}
      </div>
      <div className='input-container'>
      <input
        class 
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value) }
        placeholder="Enter your message"
        onKeyDown={handleKeyPress}
      />

        <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={handleFileChange}
      />
            {selectedImage && (
        <div>
          {/* Display the selected image */}
          {/* <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br /> */}
          {/* Button to remove the selected image */}
          <button onClick={handleReset}>Remove</button>
        </div>
      )}
      <button onClick={fetchData}>Send</button>   
      </div>
    </div>
  );
}

export default App;
