import React, { useState } from 'react';
import './crypto.css';
const ethers = require("ethers");

const fetchLocation = async (setLocation, setError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        try {
          const response = await fetch('http://localhost:5000/api/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          });
          if (!response.ok) {
            throw new Error('Failed to send location data');
          }
          alert('Location sent successfully!');
        } catch (error) {
          setError(error.message);
        }
      },
      (err) => {
        setError(err.message);
      }
    );
  } else {
    setError('Geolocation is not supported by this browser.');
  }
};

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className='walletCard'>
      <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

const LocationFetcher = () => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const handleLocationClick = async () => {
    setError(null);
    await fetchLocation(setLocation, setError);
  };

  return (
    <div className="m-4">
      <button
        onClick={handleLocationClick}
        className="btn btn-secondary focus:ring focus:outline-none w-full"
      >
        Get Location
      </button>
      {location && (
        <div className="mt-4">
          <h2>Location:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default function Crypto() {
  return (
    <div className="crypto">
      <h1>Get paid for your data in crypto</h1>
      <p>Facebook and other companies take people's data for free and sell it among each other, of course. Wouldn't it be great if you could get paid for your data? Receive crypto coin and transfer it to money or store your crypto on our app.</p>
      <WalletCard />
      <LocationFetcher />
    </div>
  );
}
