/*const getAndDisplayWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
     getLocalWeather(position.coords.latitude,
      position.coords.longitude)
    })
  }
  else { console.log('No geolocation so no app frown face') }
}*/
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 32;

var x = 0;//testing it might break
//var stream;///

var player1X;	
var player1Y;
var player2X;
var player2Y;
var player3X;
var player3Y;

var xmov = .00000009;
var ymov = 2;


var playerDistance1;
var playerDistance2;

var amplitude = 10.0; 
var particles = [];
var particlesL = [];
var theta = 0.0;

var blue = false;
var red = false;


var s = function (sketch) {

        sketch.setup = function() {
            document.body.style['userSelect'] = 'none';
            //console.log('testing');
            let h = document.body.clientHeight;
            let c = sketch.createCanvas(sketch.windowWidth, h);
            c.position(0, 0);
            c.style('pointer-events', 'none')
            for (let i = 0; i < 45; i++){
        particles[i] = new sketch.Particle(sketch.random(0,sketch.windowWidth),sketch.random(0, sketch.height));
    }
        
            for (var i = 0; i <= sketch.width/symbolSize; i++){
               var stream = new sketch.Stream();
        stream.generateSymbols(x,sketch.random(-1000,0));
        streams.push(stream);
        x += symbolSize;
    }
    sketch.textSize(symbolSize);
            
            
            
            
            
            
            
            
            
            player2X = sketch.windowWidth/8;
	        player2Y = 0;
            
            player3X = sketch.windowWidth-150;
	        player3Y = 0;
            
            
            sketch.clear();


        }

        
        
        
        sketch.draw = function() {
            sketch.clear();// allows for the background to be whatever you want
            
            playerDistance1 = sketch.dist(sketch.mouseX, sketch.mouseY, player2X, player2Y);
		
            playerDistance2 = sketch.dist(sketch.mouseX, sketch.mouseY, player3X, player3Y);
            
            
            console.log(playerDistance2);
            //console.log('tests');
            //sketch.stroke(0);
            //sketch.strokeWeight(40);
            //if (sketch.mouseIsPressed);
            //sketch.line(sketch.mouseX, sketch.mouseY, //sketch.pmouseX, sketch.pmouseY);
            player1X = sketch.mouseX;
            player1Y = sketch.mouseY;
            
            
                    
            sketch.fill(255,0,0);	// red
	sketch.ellipse(player3X, player3Y, 25, 25);
            player3X += xmov; 
            player3Y += ymov;
            
            //RED  
                
                
        
            
            if(player3Y> sketch.height){
                player3Y = 0;
                 player3X = sketch.random(15,sketch.height-15);
            }
                
                if(player3X > sketch.windowWidth){
                player3X = sketch.random(sketch.height-15);
            }
                
                if(playerDistance2 < 20) {
			    red = true;
                player2X = -30;
                player2Y = -30;
                xmov = 0;
                ymov = 0;
                player3X = -30;
                player3Y = -30;
                
		}
                
            
            if(red){
                streams.forEach(function(stream){
        stream.render();
    })
                playerDistance1 = 10000000000000;
            }
            
            
            
            sketch.fill(0,0,255);	// blue for PLAYER 2
	sketch.ellipse(player2X, player2Y, 25, 25);
            player2X += xmov; 
            player2Y += ymov;
            
            if(player2Y> sketch.height){
                player2Y = 0;
                 player2X = sketch.random(15,sketch.height-15);
            }
            
            if(player2X > sketch.height){
                player2X = sketch.random(sketch.height-15);
            }
            
            if(playerDistance1 < 20) {
			blue = true;
                player2X = -30;
                player2Y = -30;
                xmov = 0;
                ymov = 0;
                player3X = -30;
                player3Y = -30;
                
		}
            if(blue){
                for(var i = particles.length - 1; i >= 0; i--){
    particles[i].update();
    particles[i].show();
                playerDistance2 = 10000000000000;
            }
                
                
                
                
              
            
            
            
            
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
            
           // for(var i = particles.length - 1; i >= 0; i--){
    //particles[i].update();
    //particles[i].show();
        /*if(particles[i].isFinished()){
            particles.splice(i,1);
        }*/
    }

        }
        
       
        
        
        
        /////////
        
        
         sketch.Symbol = function(x, y, speed, first){
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = sketch.round((sketch.random(2,20)));
    
    this.setToRandomSymbol = function(){
        if(sketch.frameCount % this.switchInterval == 0){
        this.value = String.fromCharCode(0x30A0 + sketch.round(sketch.random(0,96)));
        }
    }
    
   
    
    this.rain = function() {
        /*if(this.y >= height){
            this.y = 0;
        }else{
            this.y += this.speed;
        }*/
        this.y = (this.y >= sketch.height) ? 0 : this.y += this.speed;
    }
    
}
        ////////
        
 
        sketch.Stream = function() {
  this.symbols = [];
  this.totalSymbols = sketch.round(sketch.random(5, 35));
  this.speed = sketch.random(5, 8);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = sketch.round(sketch.random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new sketch.Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
}
  
    this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        sketch.fill(140, 255, 170, symbol.opacity);
      } else {
        sketch.fill(0, 255, 70, symbol.opacity);
      }
      sketch.text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
});
    }
}
        
        
        
        
    
        
        
        
        
        
        
       /////// 
        
        
        
        sketch.Particle = function (x,y){
            this.x = x;
    this.y = y;
    this.lifespan = 300;
    theta += 0.01;
    
    var val = theta;
    
    
   
    this.history = [];

    this.update = function () {
        this.y += 3;
        this.x += 3;
        this.lifespan--;
        
        if(this.y > sketch.height){
            this.y = 0;
        }

        if(this.x > sketch.windowWidth){
            this.x = 0;
        }
        //console.log(' var val = theta;', val);
        var v = sketch.createVector(this.x, this.y)
        this.history.push(v);
        
        if (this.history.length > sketch.random(25,75)){
            this.history.splice(0,1);
        }
    }
    
    this.show = function() {
        sketch.stroke(0);
        sketch.fill(0,150);
        //ellipse(this.x, this.y, 24, 24);
        
        sketch.noFill();
        sketch.stroke(10);
        sketch.beginShape();
        for (var i = 0; i <this.history.length; i++){
            var pos = this.history[i];
            //ellipse(pos.x, pos.y, i, i);
            sketch.vertex(pos.x,pos.y);
        }
        sketch.endShape();
    }
    
    this.isFinished = function() {
        if (this.y > sketch.height + 300) {
            return true;
        } else {
            return false;
        }
    }
        }
};

var myp5 = new p5(s);

