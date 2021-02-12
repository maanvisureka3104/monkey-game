
var monkey , monkey_running
var banana ,bananas,bananaImage, obstacle, obstacleImage,monkeyImage;
var bananaGroup, obstacleGroup, obstacles;
var survivalTime=0;
var score=0
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyImage=loadAnimation("sprite_0.png")
}

function setup() {
  createCanvas(500,400);
  
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving",monkey_running);
   monkey.scale=0.1;
  
   ground=createSprite(250,350,1000,10);
 
  console.log(ground.x);
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
background("white");
  stroke("black");
  textSize(20);
  fill("black");
  text("SURVIVAL TIME:"+ survivalTime,300,50);
  textSize(20);
  fill("black");
  text("SCORE:"+ score,200,50);
  monkey.collide(ground);
    obstacleGroup.collide(ground);
  if(gameState===PLAY){
  ground.velocityX=-4;
    bananas();
    obstacles();
    survivalTime=Math.ceil(frameCount/60);
    if(ground.x<0){
    ground.x = ground.width/2;
    
  }
   
    if(keyDown("space") && monkey.y>300){
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    if(monkey.isTouching(bananaGroup)){
      score=score+1;
      bananaGroup.destroyEach();
      
    }
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
 if(gameState===END){
    ground.velocityX=0;
    monkey.velocityY=0;
    monkey.velocityX=0;
    obstacleGroup.setVelocityXEach=0;
    bananaGroup.setVelocityXEach=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("stop",monkeyImage)
    text("GAME OVER",250,250);
    
  }
  
  drawSprites();
}

function bananas() {
   if (frameCount % 80 === 0) {
     banana=createSprite(450,200,20,20);
     banana.addImage("b",bananaImage);
     banana.scale=0.1;
     banana.y = Math.round(random(180,300));
     banana.velocityX = -4;
     banana.lifetime = 125;
     bananaGroup.add(banana);
    }
}

function obstacles() {
   if (frameCount % 300 === 0) {
     obstacle=createSprite(450,450,20,20);
     obstacle.setCollider("circle",0,0,190)
     obstacle.y = Math.round(random(340,350));
     obstacle.addImage("o",obstacleImage);
     obstacle.scale=0.1;
     obstacle.velocityX = -4;
     obstacle.lifetime = 125;
     
     obstacleGroup.add(obstacle);
    }
}




