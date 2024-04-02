import React, { useEffect } from 'react';

const ConnectWalletButton = ({walletConnected, setWalletConnected}) => {

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <button onClick={connectWallet} disabled={walletConnected}>
      {walletConnected ? (
        <>
          <span role="img" aria-label="Checkmark">✅</span> Wallet Connected
        </>
      ) : (
        'Connect MetaMask'
      )}
    </button>
  );
};

export default ConnectWalletButton;
