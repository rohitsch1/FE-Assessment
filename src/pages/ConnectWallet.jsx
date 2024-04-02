import React, { useState } from 'react';
import Snackbar from '../components/SnackBar';

const ConnectWalletButton = ({walletConnected, setWalletConnected}) => {
  const [error, setError] = useState(null);

  // removing the error Message After 3 sec
  const handleCloseSnackbar = () => {
    setError(null); 
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        setError(null);
      } else {
        setError('MetaMask is not installed')
      }
    } catch (error) {
      const msg = 'Error connecting to MetaMask:'+ error.message
      setError(msg)
    }
  };

  return (
    <>
    <button onClick={connectWallet} disabled={walletConnected}>
      {walletConnected ? (
        <>
          <span role="img" aria-label="Checkmark">✅</span> Wallet Connected
        </>
      ) : (
        'Connect MetaMask'
      )}
    </button>
    {error && <Snackbar message={error}  onClose={handleCloseSnackbar}/>}
    </>
  );
};

export default ConnectWalletButton;
