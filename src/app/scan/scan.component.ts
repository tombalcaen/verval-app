import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  @ViewChild('video') private video: ElementRef;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init(){
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream", 
        constraints: {
          width: 320,
          height: 240,          
        },       
        target: this.video.nativeElement   // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["ean_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(((data)=>{  
      let countDecodedCodes = 0; 
      let err = 0;
      data.codeResult.decodedCodes.map((object)=>{                    
          countDecodedCodes++;          
          err = err + parseFloat(object.error);        
      })
      
      console.log(err/countDecodedCodes)

      if ((err/countDecodedCodes) < 0.2) {
        console.log(data.codeResult.code)
      } else {

      }
      // console.log(data)
    }))

    Quagga.onProcessed(function (result) {
      
      var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
          if (result.boxes) {
              drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
              result.boxes.filter(function (box) {
                  return box !== result.box;
              }).forEach(function (box) {
                  Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
              });
          }

          if (result.box) {
              Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }

          if (result.codeResult && result.codeResult.code) {
              Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
          }
      }
    });
  }

}
