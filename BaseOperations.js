var obstaclesOnScreen = [];
var linearSpeed = 100;

// Collision
var getCollisions = function ( actor , objects ){
  var detectedCollisions = [];

  for ( var i=0 ; i<objects.length ; i++ ){
    if ( hasCollided ( actor , objects[i] ) )
      detectedCollisions.push ( objects[i] );
  }

  return detectedCollisions;
}

var hasCollided = function ( actor , object ){
   return (actor.x < object.x + object.width  &&
           actor.x + actor.width > object.x   &&
           actor.y < object.y + object.height &&
           actor.height + actor.y > object.y);
}

// Obstacle Class
var Obstacle = function ( x , y , width , height ){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};


// Helper
var getRandomNumber = function ( ){
  return Math.random() * 100;
}

var canAddObstacle = function ( curTime ){
  var canAdd = false;
  if ( !obstaclesOnScreen.length ) return true;
  var curY = ( linearSpeed * curTime ) / 1000;
  var prevObsY = ( obstaclesOnScreen[ obstaclesOnScreen.length - 1 ] );
  return (prevObsY - curY) > 50;
}

//
var timeId = setInterval ( function () {
  var curTime = (new Date()).getTime();
  if ( canAddObstacle( curTime ) && getRandomNumber( ) < 50 ) {

    var randomValue = getRandomNumber( );
    var curObstacle = new Obstacle( 0 , 0 , 100 , 5 );
    if ( randomValue > 33 ) curObstacle.x += 100;
    if ( randomValue > 66 ) curObstacle.x += 100;

    animate ( curObstacle , canvas , context , curTime );
  }
}, 1000/10);

var loader = function ( ){
  var rect1 = {x: 5, y: 5, width: 50, height: 50}
  var rect2 = [{x: 20, y: 10, width: 10, height: 10}];
  var res = getCollisions ( rect1 , rect2 );
  console.log ( res );
}

window.onload = loader;
