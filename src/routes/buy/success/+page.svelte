<script>
import { encodeAbiParameters, keccak256 } from 'viem';
import { readContract } from '@wagmi/core'
import { TSabi } from '$lib/TeleSagesKeysV1.js'
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public'

// Define the ABI parameters for the arguments you want to encode
const params = [
  { name: 'keySubject', type: 'address' }, // Assuming 'keySubject' is an address type
  { name: 'poolIndex', type: 'uint256' } // Assuming 'poolIndex' is a uint256 type
];

// Provide the actual values for the arguments
const values = [
  '0x339c3c59e1cf3998f5abc14ff3d0930f292ab019', // Replace with the actual keySubject address
   11 // Replace with the actual pool index
];

// Encode the ABI parameters with their corresponding values
const encodedParams = encodeAbiParameters(params, values);

// Calculate the Keccak256 hash of the encoded parameters
const poolId = keccak256(encodedParams);

console.log(`The pool ID is: ${poolId}`);




const read = readContract({
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'pools',
				args: [poolId],
			}).then(x => console.log(x)).catch(e => console.log(e))

	// import { encodeAbiParameters, keccak256 } from 'viem'
	// import { readContract, writeContract } from '@wagmi/core'


	export let data

	// const getPoolID = (subject, poolIndex) => {
	// 	return keccak256(encodeAbiParameters(subject, poolIndex))
	// }

	// console.log(getPoolID('0x339c3c59e1cf3998f5abc14ff3d0930f292ab019', 1))
</script>

asd
<pre>{JSON.stringify(data, null, 2)}</pre>