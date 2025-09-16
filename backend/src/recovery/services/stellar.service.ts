import { Injectable } from "@nestjs/common";
import { Keypair } from "@stellar/stellar-sdk";


@Injectable()
export class StellarService {
    constructor() {}

    createAccount(): Keypair {
        const keypair = Keypair.random();
        return keypair;
    }

    
}