var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,back,backImage;
var bananaGroup, obstacleGroup;
var score=0;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,400);
   
  back = createSprite(600,200,900,10);
  back.addImage(backImage);
  back.velocityX = -4;
  back.x=back.width/2;
  back.scale=1;
  
  monkey = createSprite(80,390,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,390,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score=0
}

function draw() {
  
 background("white");
  
   drawSprites();
  
  if(gameState===PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(back.x<0){
      back.x = back.width/2
    }
    
    if(keyDown("space") && monkey.y >= 170) {
      monkey.velocityY = -12;
    }
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.1;
    }
    
    if(bananaGroup.isTouching(monkey)){
      score=score+2;
      bananaGroup.destroyEach();
      
    }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  ground.visible=false;
  spawnBanana();
  spawnObstacle();
    
  }
  
  if(gameState===END){
    
  ground.visible=false;
  ground.velocityX = 0;
  back.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
    
  fill("black");
  textSize(25);
  text("GAME OVER!",240,150);
  text("press 'r' to continue",210,200);
   
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime=0;
    
  if(keyDown("r")){
    back.velocityX=-4;
    score=0;
    gameState=PLAY;
  }
}
 
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score,500,50);

}

function spawnBanana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(600,315);
    switch(score){
      case 10: monkey.scale=0.14;
        break;
      case 20: monkey.scale=0.18;
        break;
      case 30: monkey.scale=0.22;
        break;
      case 40: monkey.scale=0.26;
        break;
      case 50: monkey.scale=0.28;
        break;
        default:break;
    }
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -6;
    banana.lifetime = 100;
    
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    bananaGroup.add(banana);
  }       
}

function spawnObstacle() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,350);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 105;
    obstacleGroup.add(obstacle);
    }       
  }