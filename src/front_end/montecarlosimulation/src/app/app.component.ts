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

  total;
  inside;
  stopped;
  i;
  originalSvg;
  intervalId
  singlePoint;

  constructor(private api: ApiService){
    this.i = 0;
    this.total = 0;
    this.inside = 0;
    this.stopped = false;
    this.singlePoint = false;
    this.originalSvg = document.getElementById("simSvg");
  }


  getPoints = () => {
  	this.api.getAllPoints().subscribe(
  		data => {
          // Start simulation 
          this.intervalFunction(data);

          if (this.singlePoint == false){
            this.intervalId = setInterval(function() { this.intervalFunction(data); }.bind(this), 40);
          }
          
  		},
  		error => {
  			console.log(error);
  		}
  	)
  }

  intervalFunction = (data): any => {
    if (this.i < data.length && (this.stopped == false || this.singlePoint)){
      this.checkPoint(data[this.i]['x_point'], data[this.i]['y_point']);
      document.getElementById('total').innerHTML = String(this.total);
      document.getElementById('inside').innerHTML = String(this.inside);
      document.getElementById('pi').innerHTML = String(this.inside / this.total * 4);
      this.i++;
      if (this.singlePoint) this.singlePoint = false;
    }else{
      // Reset state ready for next time.
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
  }

  stopSimulation = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.stopped = true;
  }

  startSimulation = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    if (this.stopped){
      this.stopped = false;
    }
    if (this.singlePoint){
      this.singlePoint = false;
    }
    this.getPoints();
  }

  resetSimulation = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.total = 0;
    this.inside = 0;
    document.getElementById('total').innerHTML = String(this.total);
    document.getElementById('inside').innerHTML = String(this.inside);
    document.getElementById('pi').innerHTML = String(0);

    // Delete all the drawn dots
    while (document.getElementById('simSvg').childNodes.length > 2) {
      document.getElementById('simSvg').removeChild(document.getElementById('simSvg').lastChild);
    }

    this.i = 0;
  }

  resetAndStartSimulation = (): void => {
    this.resetSimulation();
    this.startSimulation();
  }

  addASinglePoint = (): void => {
    this.singlePoint = true;
    this.getPoints();
    console.log("Added single point");
  }

  checkPoint = (x, y): any => {
    var num = (Math.sqrt(x * x + y * y))*300;
    console.log(num)
    var inside_circle = num < 150;
    console.log(inside_circle)

    this.total++;
    
    var current_point = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    current_point.setAttribute('x', String((x + 1) * 300));
    current_point.setAttribute('y', String((y + 1) * 300));
    current_point.setAttribute('width', String(1));
    current_point.setAttribute('height', String(1));
    if (inside_circle){
      this.inside++;
      current_point.setAttribute('class', 'inside');
    }
    document.getElementById('simSvg').appendChild(current_point);
  }

}
