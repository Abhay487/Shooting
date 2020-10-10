var playerimg, enemyimg, player, enemy1, enemy2, enemy3, bulletimg, starsimg;
var enemyGroup1;
var enemyGroup2;
var enemyGroup3;
var bulletGroup;
var score = 0;
var life;
var lifeCount = 2;
var lifeGroup;
var  gameState =  "play";


enemy1.debug  = true;
enemy2.debug  = true;
enemy3.debug  = true;
player.debug  = true;

function preload(){
playerimg = loadImage("Player.png");
enemyimg = loadImage("Enemy.png");
bulletimg = loadImage("bullet.png");
starsimg = loadImage("Stars.png");
}



function setup() {
  createCanvas(1200,600);
  player = createSprite(100, 500, 50, 50);
  player.addImage(playerimg);
  player.scale = 0.2;
  enemyGroup1 = new Group();
  enemyGroup2 = new Group();
  enemyGroup3 = new Group();
  bulletGroup = new  Group();
  lifeGroup = new Group();

  

}

function draw() {
  background(starsimg);
  textSize(20);
  text("Score "+score, 1000, 100);
  textSize(20);
  fill("Green");
   text(" LIFE: "+ lifeCount, 200, 100);
  
if(gameState  ===  "play") {

  player.velocityX = 0;
  player.velocityY = 0; 


  textSize(20);
  fill(255);
  text(" TIP: Catch the yellow objects for extra life ", 500,  100);

  if(keyDown(UP_ARROW))  {
    player.velocityY = -4;
  }

  if(keyDown(DOWN_ARROW))  {
    player.velocityY = 4;
  }

  if(keyDown(LEFT_ARROW)){
    player.velocityX = -4;
  }

  if(keyDown(RIGHT_ARROW)) {
    player.velocityX = 4;
  }



if(keyDown("space")) {
Bullets();
}

Enemy1();
Enemy2();
Enemy3();
if(bulletGroup.isTouching(enemyGroup1)) {
  bulletGroup.destroyEach();
  enemyGroup1.destroyEach();
  score+=2;
}
if(bulletGroup.isTouching(enemyGroup2)) {
  bulletGroup.destroyEach();
  enemyGroup2.destroyEach();
  score+=2;
}

if(bulletGroup.isTouching(enemyGroup3)) {
  bulletGroup.destroyEach();
  enemyGroup3.destroyEach();
  score+=2;
}

if(enemyGroup1.isTouching(player)) {
  lifeCount -= 1;
  enemyGroup1.destroyEach();
}
  
if(enemyGroup2.isTouching(player)) {
  lifeCount -= 1;
  enemyGroup2.destroyEach();
}

if(enemyGroup3.isTouching(player)) {
  lifeCount -= 1;
  enemyGroup3.destroyEach();
}

if(frameCount % 200 === 0) {
 life = createSprite(random(600, 1200), random(100, 500), 20, 20);
 life.shapeColor = "Yellow";
  life.velocityX = -2;
  life.velocityY = 3;
  lifeGroup.add(life);

  
  }

  if(lifeGroup.isTouching(player)) {
    lifeCount =  lifeCount+1;
    lifeGroup.destroyEach();
}

if(lifeCount <= 0) {
  gameState  = "end";
}

}

else if(gameState === "end")  {
  player.visible = false;
  textSize(50);
  fill("Red");
  text("Game Over", 500, 300);
  fill("Blue");
  textSize(50);
  text(" Press R to restart ", 400, 400);
 enemyGroup1.destroyEach();
 enemyGroup2.destroyEach();
 enemyGroup3.destroyEach();
 bulletGroup.destroyEach();
 lifeGroup.destroyEach();

} 
if(keyDown("r")){
  score = 0;
  lifeCount = 2;
  gameState = "play";
  player.visible = true;
}

console.log(lifeCount);

drawSprites();
}

function Enemy1() {
  if(frameCount % 111 ===  0) {
    var enemy1 = createSprite(1200, random(50, 600), 50, 60);
    enemy1.addImage(enemyimg);
    enemy1.velocityX = -8;
    enemy1.scale = 0.2;
    enemy1.lifetime = 300;
    enemyGroup1.add(enemy1);


  }
}

function Enemy2() {
  if(frameCount % 301 ===  0) {
    var enemy2 = createSprite(1200, random(50, 600), 50, 60);
    enemy2.addImage(enemyimg);
    enemy2.velocityX = -8;
    enemy2.scale = 0.2;
    enemy2.lifetime = 300;
    enemyGroup2.add(enemy2);


  }
}

function Enemy3() {
  if(frameCount % 251 ===  0) {
    var enemy3 = createSprite(1200, random(50, 600), 50, 60);
    enemy3.addImage(enemyimg);
    enemy3.velocityX = -8;
    enemy3.scale = 0.2;
    enemy3.lifetime = 300;
    enemyGroup3.add(enemy3);


  }
}

function Bullets() {
  var bullet = createSprite(player.x, player.y, 30, 10);
  bullet.velocityX = 4;
  bulletGroup.add(bullet);
  bullet.addImage(bulletimg);
  bullet.scale = 0.05;
}
