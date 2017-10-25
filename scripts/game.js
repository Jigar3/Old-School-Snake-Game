var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var button = document.getElementById('btn');

function menu(){
	snake();
}

menu();

function snake(){

	var score = 0;				//for score 
	var sw = 10;				//width of one element in snake
	var move = "right";			//initial movement of snake
	var food = {xx:0, yy:0};	//variables for storing location of food
	var snakearr ;
	var zx = 0;
	var zy = 0;

	

	function init()
		{   
			score = 0;
			d = "right";
			create();	//line 35
			cookfood();	//line 45
			if(typeof game_loop != "undefined") clearInterval(game_loop);
			game_loop = setInterval(draw, 70);	//calling draw function every 0.07s 
		}

	init();

	function create()
		{
			var length = 8;	//initial length of snake
			snakearr = [];	//2-d array for snake
			for(var i=length-1; i>=0; i--)
			{
				snakearr.push({x:i,y:20});	//adds new element at end of snake array
			}
		}

	function cookfood()
		{   
			food.xx= Math.round(Math.random()*(800-10)/10);	//x-coordinate of food
			food.yy=Math.round(Math.random()*(400-10)/10);	//y-coordinate of food				
		}

	function draw()
		{
			ctx.fillStyle = "#4d4f53";
			ctx.fillRect(0, 0, 800, 400);
			ctx.strokeStyle = "black";
			ctx.strokeRect(0, 0, 800, 400);

			var nx = snakearr[0].x;	//x-head of snake
			var ny = snakearr[0].y;	//y-head of snake

		    if(move == "right") nx++;
			else if(move == "left") nx--;
			else if(move == "up") ny--;
			else if(move == "down") ny++;

			if(nx>80)nx=0;
			if(nx<0)nx=80;
			if(ny>40)ny=0;
			if(ny<0)ny=40;

			if( coll(nx,ny,snakearr) )	//line 122
			{
				alert("Game Over");
				init();
			}

			if( nx == food.xx && ny == food.yy )
			{
				var tail = {x:nx,y:ny};
				cookfood();
				score++;
			}
			else
			{
				var tail = snakearr.pop();
				tail.x = nx;
				tail.y = ny;
			}

			snakearr.unshift(tail);
			paintFood(food.xx,food.yy);

			for(var i = 0; i < snakearr.length; i++)
			{
				var c = snakearr[i];                                                     
			    paint(c.x,c.y);
			}

			var text = "Score: " + score;
			ctx.font = '12px';
			ctx.fillText(text,720,20);

		}

	function paint(x,y)
		{
			ctx.fillStyle = "white";
			ctx.fillRect(x*sw, y*sw, sw, sw);
			ctx.strokeStyle = "black";
			ctx.strokeRect(x*sw, y*sw, sw, sw);
		}

	function paintFood(x,y)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(x*sw, y*sw, sw, sw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(x*sw, y*sw, sw, sw);
		}
					
			
	function coll(zx,zy,arr)
		{	
			for(var i = 0; i < arr.length; i++)
			{
				if(arr[i].x == zx && arr[i].y == zy)
					 return true;
			}
				return false;
		}
			
			
	document.onkeydown=function(e)
		{
			var key = e.which;

		    if(key == "37" && move != "right") move = "left";
			else if(key == "38" && move != "down") move = "up";
			else if(key == "39" && move != "left") move = "right";
			else if(key == "40" && move != "up") move = "down";
		}  

}

