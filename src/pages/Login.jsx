import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  
  const loginWithFacebook = () => {
    // Redirect the user to the Facebook OAuth dialog
    window.location.href = 'http://localhost:3000/login';
  };

  const handleCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      try {
        const response = await axios.get(`http://localhost:3000/callback?code=${code}`);
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Error during callback:', error);
      }
    }
  };

  // Check if the code is in the URL (after redirection)
  React.useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div>
      <h1>Facebook Authentication with Instagram Access</h1>
      {!accessToken ? (
        <button onClick={loginWithFacebook}>Login with Facebook</button>
      ) : (
        <div>
          <h2>Logged in successfully!</h2>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
}

export default App;
