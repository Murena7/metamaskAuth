import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: Web3;

  constructor() {
    this.web3 = this.web3Init();
  }

  private web3Init(): Web3 {
    try {
      const provider = 'ethereum' in window ? (window as any).ethereum : Web3.givenProvider;
      return new Web3(provider);
    } catch (e) {
      throw e;
    }
  }

  async connectWallet(): Promise<void> {
    try {
      if (this.web3.currentProvider === null) {
        // Need Show notification
        return;
      }

      // @ts-ignore
      if ('enable' in this.web3.currentProvider) {
        await (this.web3.currentProvider as any).enable();
      }
    } catch (e) {
      throw e;
    }
  }
}
