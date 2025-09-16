import { BASE_FEE, Networks, Operation, TransactionBuilder } from "@stellar/stellar-sdk";
import { getKit } from "@/components/kit";
import { Server } from "@stellar/stellar-sdk/rpc";

export async function updateSigners(signers: string[], votersThreshold: number) {
    const kit = getKit();
    const address = await kit.getAddress();
    const server = new Server('https://horizon-testnet.stellar.org');

    const voterPower = 200 / votersThreshold; // setting the voterPower to 200 / votersThreshold to make it so that the votersThreshold is the amount of voter power needed to sign a transaction

    const processedSigners = signers.map(signer => {
        return Operation.setOptions({
            signer: {
                ed25519PublicKey: signer,
                weight: voterPower,
            },
        })
    })
    
    let transaction = new TransactionBuilder(await server.getAccount(address.address), {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })

    processedSigners.forEach(op => {
        transaction.addOperation(Operation.setOptions({
            medThreshold: 200,
            highThreshold: 255,
        }));
        transaction = transaction.addOperation(op);
        
    });

    const xdr = transaction.build();    

    const signedTransaction = await getKit().signTransaction(xdr.toXDR());

    return 
}