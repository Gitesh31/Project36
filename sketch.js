//Creating some  variables
var dog,Happydog,database,foodS,foodStock,dogImg,milkImg;
var canvas,bgImg;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //loading some images
  dogImg = loadImage("images/dogImg.png");
  Happydog = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");

}

function setup() {
  canvas = createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  foodObj = new Food();

  feedPet = createButton("Feed the Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Button");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data)){
    lastFed = data.val();
  }
}


function draw() {  
  bgImg = background(46, 139, 87);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(Happydog);
  }*/

  drawSprites();

  display();

  textSize(20);
  stroke("red");
  text("Food Stock = " + foodStock);

  fill(225,225,254);
  textSize(15);
  
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM",350,30)
  }
  else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : " + lastFed + " AM",350,30);
}

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    Food:x
  }
  )
}

function addFoods(){
  if(mouseIsPressed(addFood)){
    foodStock += 1;
  }
}