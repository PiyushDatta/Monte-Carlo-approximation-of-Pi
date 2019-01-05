import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'Monte Carlo Simulation to approximate pi';
  points = [{x_point: '0.65'}, {x_point: '0.344'}];

  constructor(private api: ApiService){
  	this.getPoints();
  }

  getPoints = () => {
  	this.api.getAllPoints().subscribe(
  		data => {
  			this.points = data;	
  		},
  		error => {
  			console.log(error);
  		}
  	)
  }
}
