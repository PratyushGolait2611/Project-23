var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground;
var log1, log2, log3;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
    helicopterIMG = loadImage("helicopter.png")
    packageIMG = loadImage("package.png")
}

function setup() {
    createCanvas(800, 700);
    rectMode(CENTER);

    packageSprite = createSprite(width / 2, 80, 10, 10);
    packageSprite.addImage(packageIMG)
    packageSprite.scale = 0.2
    packageSprite.visible = false;

    helicopterSprite = createSprite(0, 200, 10, 10);
    helicopterSprite.velocityX = 4;
    helicopterSprite.addImage(helicopterIMG)
    helicopterSprite.scale = 0.6

    groundSprite = createSprite(width / 2, height - 35, width, 10);
    groundSprite.shapeColor = color(255)


    engine = Engine.create();
    world = engine.world;

    packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 3, isStatic: true });
    World.add(world, packageBody);

    log1 = new Box(400, 650, 200, 20);
    fill('red');

    log2 = new Box(290, 610, 20, 100)
    fill('red');

    log3 = new Box(510, 610, 20, 100)
    fill('red');


    // console.log(packageBody);
    // console.log(packageBody.type);


    //Create a Ground
    ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
    World.add(world, ground);


    Engine.run(engine);

}


function draw() {
    rectMode(CENTER);
    background(0);
    packageSprite.x = packageBody.position.x
    packageSprite.y = packageBody.position.y
    drawSprites();


    log1.display();
    log2.display();
    log3.display();

    if (helicopterSprite.position.x >= 400) {
        helicopterSprite.velocityX = 0;
        packageSprite.visible = true;
    }

}

function keyPressed() {
    if (keyCode === DOWN_ARROW && helicopterSprite.position.x == 400) {
        // Look at the hints in the document and understand how to make the package body fall only on
        Matter.Body.setStatic(packageBody, false);
        packageBody.restitution = 0;
    }
}