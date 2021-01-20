import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges,OnInit {

  constructor(private apiService: ApiService) { }
  @Input() currentUserData: any;
  currentUserRole: string;
  
  ngOnChanges(changes: SimpleChanges): void {
    //update userData in here, userData will need to be passed into this component from app? 
  }

  ngOnInit(): void {
    console.log(`ngOnInit userData: `, this.currentUserData);
    this.currentUserRole = this.currentUserData.currentUserData.userData.role;

  }

  testClick() {
    console.log(`clickevent: `, this.currentUserData);
  }

}
