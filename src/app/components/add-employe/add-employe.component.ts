import { UtilService } from 'src/app/services/util.service';
import { DriverDTO } from './../../api/models/driver-dto';
import { CommandResourceService } from 'src/app/api/services';
import { Driver } from './../../api/models/driver';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss'],
})
export class AddEmployeComponent implements OnInit {
  headerName:string;
  driver:DriverDTO;
  constructor(private modalCtrl:ModalController,private navParams:NavParams,
    private commandService:CommandResourceService,
    private utilService:UtilService) { 
    navParams.get('headerName');
    this.driver=navParams.get('driver');
    console.log('driver ',this.driver);

  }

  ngOnInit() {}

  dismiss() {

    let driver:DriverDTO;
    // console.log('>>>',this.vehicle);
    // console.log('>>>',this.vehicleLookUpDTO)
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'newDriver':this.driver
    });
  }

  save(){
    this.commandService.createDriverUsingPOST(this.driver).subscribe(res1=>{
      console.log(' creaeted driver ',res1);
      this.driver=res1;
     this.dismiss();

    },err1=>{
      console.log('err creating  driver ',err1);
      this.utilService.createToast(' Try again later Server might be down ')
    })
  }


}
