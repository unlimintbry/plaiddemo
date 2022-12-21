import { FC, useCallback, ReactNode } from 'react';
import { useEthereumProvider, PlaidWeb3OnSuccess } from 'react-plaid-link/web3';
import { PlaidLinkOnExit } from 'react-plaid-link';


const PlaidConnect: FC<{ children: ReactNode }> = ({ children }) => {

    const onSuccess = useCallback<PlaidWeb3OnSuccess>(
    // provider is an EIP-1193 compatible JavaScript object https://eips.ethereum.org/EIPS/eip-1193
    // provider can be used by other libraries to request more data
    async (provider) => {
      const accounts = await provider.request({
        method: 'eth_accounts',
      });
      // use accounts
    },
    [],
  );
  
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // Optional callback, called if the user exits without connecting a wallet
    // See https://plaid.com/docs/link/web/#onexit for details
  }, []);
  
  const { open, ready } = useEthereumProvider({
    token: 'link-sandbox-258829f0-cee6-4346-acc5-07273abcf1ad', // retrieve from https://dashboard.plaid.com/team/wallet-onboard
    chain: {
      // RPC gateway URL to use for non-wallet methods
      rpcUrl: '',
      // EVM chain ID in hexadecimal format as described in https://eips.ethereum.org/EIPS/eip-695
      // See https://chainlist.org/ for a list of common chains
      chainId: '0x1',
    },
    onSuccess,
    onExit,
  });
  
  return (
    <button onClick={() => open()} disabled={!ready}>
    Connect wallet
  </button>

  );

}


export default PlaidConnect

