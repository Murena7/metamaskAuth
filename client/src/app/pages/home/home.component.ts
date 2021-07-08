import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Web3Service} from '../../core/services/web3.service';
import {AuthStatus, IAuthBody} from '../../core/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private web3Service: Web3Service) {
  }

  ngOnInit(): void {

  }

  async auth(): Promise<void> {
    try {
      await this.web3Service.connectWallet();

      const nonce = await this.authService.getNonce().toPromise();
      const publicAddress = await this.web3Service.web3.eth.getCoinbase();

      const signature = await this.web3Service.web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        ''
      );

      if (!signature) {
        return
      }

      await this.authRequest({
        address: publicAddress,
        signature,
        nonce
      })

    } catch (e) {
      console.log(e);
    }
  }

  async authRequest(body: IAuthBody): Promise<void> {
    try {
      const response = await this.authService.auth(
        body
      ).toPromise();

      if (response.body?.status === AuthStatus.success) {
        this.authService.isAuth = true;
      }

    } catch (error) {
      if (error?.status === 401) {
        // TODO Show Authorized Error Notification
        console.log(error);
      }
    }
  }

}
