const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");

const head = {x: snake[0].x + dx, y: snake[0].y + dy};

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

function drawSnakePart(snakePart) 
{  
  snakeboard_ctx.fillStyle = 'lightblue';  
  snakeboard_ctx.strokestyle = 'darkblue';
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
 
/*Function that prints the parts*/
function drawSnake() 
{  
  snake.forEach(drawSnakePart);
}

function move_snake() 
{  
  const head = {x: snake[0].x + dx, y: snake[0].y};
  snake.unshift(head);
  snake.pop();
}

setTimeout(function onTick() {  clearCanvas();  move_Snake();  drawSnake();}, 100);
setTimeout(function onTick() {  clearCanvas();  move_Snake();  drawSnake();}, 100);
drawSnake();

function main() 
{  
   setTimeout(function onTick() 
   {    
     clearCanvas();    
     advanceSnake();  
     drawSnake();
     // Call main again
     main();
   }, 100)
}

function change_direction(event) 
{  
   const LEFT_KEY = 37;
   const RIGHT_KEY = 39;
   const UP_KEY = 38;
   const DOWN_KEY = 40;
 
   const keyPressed = event.keyCode;
   const goingUp = dy === -10;
   const goingDown = dy === 10;
   const goingRight = dx === 10;  
   const goingLeft = dx === -10;
 
     if (keyPressed === LEFT_KEY && !goingRight)
     {    
          dx = -10;
          dy = 0;  
     }
 
     if (keyPressed === UP_KEY && !goingDown)
     {    
          dx = 0;
          dy = -10;
     }
 
     if (keyPressed === RIGHT_KEY && !goingLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (keyPressed === DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 10;
     }
}

document.addEventListener("keydown", change_direction)

function has_game_ended()
{  
  for (let i = 4; i < snake.length; i++)
  {    
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (has_collided) 
      return true
  }
  const hitLeftWall = snake[0].x < 0;  
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y &lt; 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
 
  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max)
{  
   return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
 
function gen_food() 
{  
   food_x = random_food(0, snakeboard.width - 10);
   food_y = random_food(0, snakeboard.height - 10);
   snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
      });
}

function drawFood()
{
      snakeboard_ctx.fillStyle = 'lightgreen';
      snakeboard_ctx.strokestyle = 'darkgreen';
      snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
      snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function move_snake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
      // Generate new food location
      gen_food();
    } else {
      // Remove the last part of snake body
      snake.pop();
    }
  }

