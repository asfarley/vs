
var WIDTH=640;
var HEIGHT=480;

var OFFSET_POS = 20;

var FRAME_DELAY = 33;

var P1_INIT_X = OFFSET_POS;
var P1_INIT_Y = 420;

var P2_INIT_X = WIDTH-OFFSET_POS;
var P2_INIT_Y = 420;

var LAND_HEIGHT = 30;

var p1_x = P1_INIT_X;
var p1_y = P1_INIT_Y; 
var p1_vx = 0;
var p1_vy = 0;
var p1_health = 10;
var p2_health = 10;

var p1_state = "idle";
var p2_state = "idle";

var p2_x = P2_INIT_X;
var p2_y = P2_INIT_Y; 
var p2_vx = 0;
var p2_vy = 0;

var FRICTION_CONST = 0.99;

var projectiles1 = [];
var projectiles2 = [];

var background = new Image();
background.src = "http://198.143.136.212/background.png";

setInterval(onTimerTick, 33); 

setInterval(sendState, 100); 

var gameOver = false;

function onTimerTick() {	
	kd.tick();
	drawWorld();
	updateWorld();
	detectWin();
}

function sendState() {	
if(gameOver==false)
{
	var p1checkbox = document.getElementById("P1");	
	var p2checkbox = document.getElementById("P2");
	var isp1 = p1checkbox.checked;
	var isp2 = p2checkbox.checked;

	var projectilesString = "";

	if(isp1)
{
	for(i=0; i < projectiles1.length; i++)
	{
		projectilesString += "pj1" + i.toString() + "x="+projectiles1[i].x.toString();
		projectilesString += "&";
		projectilesString += "pj1" + i.toString() + "y="+projectiles1[i].y.toString();
		projectilesString += "&";
		projectilesString += "pj1" + i.toString() + "vx="+projectiles1[i].vx.toString();
		projectilesString += "&";
		projectilesString += "pj1" + i.toString() + "vy="+projectiles1[i].vy.toString();
		projectilesString += "&";
	}

	xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener('load', recieveState);
	xmlhttp.open("POST","state1",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var postParams = "x1=" + p1_x + "&y1=" + p1_y + "&vx1=" + p1_vx + "&vy1=" + p1_vy + "&h2=" + p2_health + "&" + projectilesString;
	xmlhttp.send(postParams);
}

if(isp2)
{
	for(i=0; i < projectiles2.length; i++)
	{
		projectilesString += "pj2" + i.toString() + "x="+projectiles2[i].x.toString();
		projectilesString += "&";
		projectilesString += "pj2" + i.toString() + "y="+projectiles2[i].y.toString();
		projectilesString += "&";
		projectilesString += "pj2" + i.toString() + "vx="+projectiles2[i].vx.toString();
		projectilesString += "&";
		projectilesString += "pj2" + i.toString() + "vy="+projectiles2[i].vy.toString();
		projectilesString += "&";
	}

	xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener('load', recieveState);
	xmlhttp.open("POST","state2",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var postParams = "x2=" + p2_x + "&y2=" + p2_y + "&vx2=" + p2_vx + "&vy2=" + p2_vy + "&h1=" + p1_health + "&" + projectilesString;
	xmlhttp.send(postParams);
}

if(!isp1 && !isp2)
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener('load', recieveState);
	xmlhttp.open("GET","state",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}
}	
}

function recieveState() {
if(gameOver==false)
{
//	console.log(this.responseText);
	var recieved_state = JSON.parse(this.responseText);

	var p1checkbox = document.getElementById("P1");	
	var p2checkbox = document.getElementById("P2");
	var isp1a = p1checkbox.checked;
	var isp2a = p2checkbox.checked;
	
	if(isp1a==false)
	{
	p1_x = (3*p1_x + Number(recieved_state.x1))/4;
	p1_y = (3*p1_y + Number(recieved_state.y1))/4;
	p1_vx = Number(recieved_state.vx1);
	p1_vy = Number(recieved_state.vy1);
	if (recieved_state.pj10x != undefined)	
	projectiles1[0] = { x: Number(recieved_state.pj10x), y: Number(recieved_state.pj10y), vx: Number(recieved_state.pj10vx), vy: Number(recieved_state.pj10vy) };
	if (recieved_state.pj11x != undefined)	
	projectiles1[1] = { x: Number(recieved_state.pj11x), y: Number(recieved_state.pj11y), vx: Number(recieved_state.pj11vx), vy: Number(recieved_state.pj11vy) };
	if (recieved_state.pj12x != undefined)	
	projectiles1[2] = { x: Number(recieved_state.pj12x), y: Number(recieved_state.pj12y), vx: Number(recieved_state.pj12vx), vy: Number(recieved_state.pj12vy) };
	if (recieved_state.pj13x != undefined)	
	projectiles1[3] = { x: Number(recieved_state.pj13x), y: Number(recieved_state.pj13y), vx: Number(recieved_state.pj13vx), vy: Number(recieved_state.pj13vy) };
	if (recieved_state.pj14x != undefined)	
	projectiles1[4] = { x: Number(recieved_state.pj14x), y: Number(recieved_state.pj14y), vx: Number(recieved_state.pj14vx), vy: Number(recieved_state.pj14vy) };
	if (recieved_state.pj15x != undefined)	
	projectiles1[5] = { x: Number(recieved_state.pj15x), y: Number(recieved_state.pj15y), vx: Number(recieved_state.pj15vx), vy: Number(recieved_state.pj15vy) };
	if (recieved_state.pj16x != undefined)	
	projectiles1[6] = { x: Number(recieved_state.pj16x), y: Number(recieved_state.pj16y), vx: Number(recieved_state.pj16vx), vy: Number(recieved_state.pj16vy) };
	if (recieved_state.pj17x != undefined)	
	projectiles1[7] = { x: Number(recieved_state.pj17x), y: Number(recieved_state.pj17y), vx: Number(recieved_state.pj17vx), vy: Number(recieved_state.pj17vy) };
	if (recieved_state.pj18x != undefined)	
	projectiles1[8] = { x: Number(recieved_state.pj18x), y: Number(recieved_state.pj18y), vx: Number(recieved_state.pj18vx), vy: Number(recieved_state.pj18vy) };
	if (recieved_state.pj19x != undefined)	
	projectiles1[9] = { x: Number(recieved_state.pj19x), y: Number(recieved_state.pj19y), vx: Number(recieved_state.pj19vx), vy: Number(recieved_state.pj19vy) };

		p2_health = Number(recieved_state.h2);
	}

	if(isp2a==false)
	{
	p2_x = (3*p2_x + Number(recieved_state.x2))/4;
	p2_y = (3*p2_y + Number(recieved_state.y2))/4;
	p2_vx = Number(recieved_state.vx2);
	p2_vy = Number(recieved_state.vy2);
	if (recieved_state.pj21x != undefined)	
	projectiles2[0] = { x: Number(recieved_state.pj20x), y: Number(recieved_state.pj20y), vx: Number(recieved_state.pj20vx), vy: Number(recieved_state.pj20vy) };
	if (recieved_state.pj21x != undefined)	
	projectiles2[1] = { x: Number(recieved_state.pj21x), y: Number(recieved_state.pj21y), vx: Number(recieved_state.pj21vx), vy: Number(recieved_state.pj21vy) };
	if (recieved_state.pj22x != undefined)	
	projectiles2[2] = { x: Number(recieved_state.pj22x), y: Number(recieved_state.pj22y), vx: Number(recieved_state.pj22vx), vy: Number(recieved_state.pj22vy) };
	if (recieved_state.pj23x != undefined)	
	projectiles2[3] = { x: Number(recieved_state.pj23x), y: Number(recieved_state.pj23y), vx: Number(recieved_state.pj23vx), vy: Number(recieved_state.pj23vy) };
	if (recieved_state.pj24x != undefined)	
	projectiles2[4] = { x: Number(recieved_state.pj24x), y: Number(recieved_state.pj24y), vx: Number(recieved_state.pj24vx), vy: Number(recieved_state.pj24vy) };
	if (recieved_state.pj25x != undefined)	
	projectiles2[5] = { x: Number(recieved_state.pj25x), y: Number(recieved_state.pj25y), vx: Number(recieved_state.pj25vx), vy: Number(recieved_state.pj25vy) };
	if (recieved_state.pj26x != undefined)	
	projectiles2[6] = { x: Number(recieved_state.pj26x), y: Number(recieved_state.pj26y), vx: Number(recieved_state.pj26vx), vy: Number(recieved_state.pj26vy) };
	if (recieved_state.pj27x != undefined)	
	projectiles2[7] = { x: Number(recieved_state.pj27x), y: Number(recieved_state.pj27y), vx: Number(recieved_state.pj27vx), vy: Number(recieved_state.pj27vy) };
	if (recieved_state.pj28x != undefined)	
	projectiles2[8] = { x: Number(recieved_state.pj28x), y: Number(recieved_state.pj28y), vx: Number(recieved_state.pj28vx), vy: Number(recieved_state.pj28vy) };
	if (recieved_state.pj29x != undefined)	
	projectiles2[9] = { x: Number(recieved_state.pj29x), y: Number(recieved_state.pj29y), vx: Number(recieved_state.pj29vx), vy: Number(recieved_state.pj29vy) };

		p1_health = Number(recieved_state.h1);
	}
}
}

function drawWorld() {
	clearCanvas();
	drawBackground();
	drawSprites();
	drawHealth();
}

function detectWin()
{
if(gameOver==false)
{
	var winnerDiv = document.getElementById("winner");
	var winnerString = "";
	if(p1_health <= 0)
	{
		sendState();
		gameOver = true;
		winnerString = "P2 WINS!";	
	}
	else if(p2_health <= 0)
	{
		sendState();
		gameOver = true;
		winnerString = "P1 WINS!";
	}
	winnerDiv.innerHTML = winnerString;
}
}

function resetOnWin()
{
//	window.location.reload(true);
	gameOver = false;
	p1_health = 10;
	p2_health = 10;
	xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","reset",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send();

}

function clearCanvas() {
	var x = document.getElementById("myCanvas");
	var ctx = x.getContext("2d");
	ctx.clearRect(0,0,x.width,x.height);
}

function drawSprites() {
	drawPlayers();
	drawProjectiles();
}

function drawPlayers() {
	var x = document.getElementById("myCanvas");
	var ctx = x.getContext("2d");
	ctx.beginPath();
	ctx.arc(p1_x,p1_y,10,0,2*Math.PI);
	ctx.closePath();
	ctx.fillStyle="white";
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(p2_x,p2_y,10,0,2*Math.PI);
	ctx.closePath();
	ctx.fillStyle="white";
	ctx.fill();
	ctx.stroke();
}

function drawBackground() {
	var x = document.getElementById("myCanvas");
	var ctx = x.getContext("2d");
	ctx.drawImage(background,0,0);
}

function drawHealth() {
	var p1healthbox = document.getElementById("p1health");
	var p2healthbox = document.getElementById("p2health");
	p1healthbox.innerHTML = p1_health;
	p2healthbox.innerHTML = p2_health;
}

function drawProjectiles() {
	var x = document.getElementById("myCanvas");
	var ctx = x.getContext("2d");
	var arrayLength = projectiles1.length;
	for (var i = 0; i < arrayLength; i++) {
    ctx.beginPath();
	ctx.arc(projectiles1[i].x,projectiles1[i].y,2,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	}
	
	arrayLength = projectiles2.length;
	for (var i = 0; i < arrayLength; i++) {
    ctx.beginPath();
	ctx.arc(projectiles2[i].x,projectiles2[i].y,2,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	}

}

function updateWorld()
{	
	move();
	detectCollisions();
	fallFromGravity();
	getInputs();
	applyFriction();
}

function fallFromGravity()
{
	var p1_on_ground = isP1OnGround();
	if(~p1_on_ground)
		p1_vy += 1;
	else
		p1_vy = 0;
	
	var p2_on_ground = isP2OnGround();
	if(~p2_on_ground)
		p2_vy += 1;
	else
		p2_vy = 0;
}

function getInputs()
{
	var p1checkbox = document.getElementById("P1");
	var p2checkbox = document.getElementById("P2");
	var isp1 = p1checkbox.checked;
	var isp2 = p2checkbox.checked;
	
	kd.UP.down(function () {
	if(isp1)
		p1TryJump();
	
	if(isp2)
		p2TryJump();
	});
	
	kd.DOWN.down(function () {
		//p1_vy += 1; // Do nothing if DOWN is pressed
	});
	
	kd.LEFT.down(function () {
		if(isp1)
			p1_vx -= 1;
		
		if(isp2)
			p2_vx -= 1;
	});
	
	kd.RIGHT.down(function () {
		if(isp1)
		p1_vx += 1;
	
		if(isp2)
		p2_vx += 1;	
	});
	
	kd.RIGHT.down(function () {
		if(isp1)
		p1_vx += 1;
	
		if(isp2)
		p2_vx += 1;	
	});

	if(p1_vx > 50)
		p1_vx = 50;
	if(p1_vx < -50)
		p1_vx = -50;

	if(p1_vy > 50)
		p1_vy = 50;
	if(p1_vy < -50)
		p1_vy = -50;

	if(p2_vx > 50)
		p2_vx = 50;
	if(p2_vx < -50)
		p2_vx = -50;

	if(p2_vy > 50)
		p2_vy = 50;
	if(p2_vy < -50)
		p2_vy = -50;

	
	kd.SPACE.down(function () {
		if(isp1)
		p1TryShoot();
	
		if(isp2)
		p2TryShoot();
	});
	
}

function p1TryJump()
{
	var on_ground = isP1OnGround();
	if(on_ground)
		p1_vy -= 10;
}

function p2TryJump()
{
	var on_ground = isP2OnGround();
	if(on_ground)
		p2_vy -= 10;
}

function move()
{
	p1_y += p1_vy;
	p1_x += p1_vx;
	
	p2_y += p2_vy;
	p2_x += p2_vx;
	
	var arrayLength = projectiles1.length;
	for (var i = 0; i < arrayLength; i++) {
		projectiles1[i].x = projectiles1[i].x + projectiles1[i].vx;
		projectiles1[i].y = projectiles1[i].y + projectiles1[i].vy;
	}

	arrayLength = projectiles2.length;
	for (var i = 0; i < arrayLength; i++) {
		projectiles2[i].x = projectiles2[i].x + projectiles2[i].vx;
		projectiles2[i].y = projectiles2[i].y + projectiles2[i].vy;
	}

}

function isP1OnGround()
{
	if(p1_y < HEIGHT-LAND_HEIGHT)
		return false;
	else
		return true;
}

function isP2OnGround()
{
	if(p2_y < HEIGHT-LAND_HEIGHT)
		return false;
	else
		return true;
}

function applyFriction()
{
	p1_vx = p1_vx * FRICTION_CONST;
	p1_vy = p1_vy * FRICTION_CONST;
	
	p2_vx = p2_vx * FRICTION_CONST;
	p2_vy = p2_vy * FRICTION_CONST;
}

function detectCollisions()
{
	//Screen boundary collision detection
	// P1
	if(p1_y>HEIGHT-LAND_HEIGHT)
	{
		p1_y = HEIGHT-LAND_HEIGHT;
		p1_vy = -p1_vy;
	}
	if(p1_y<0)
	{
		p1_y = 0;
		p1_vy = -p1_vy;
	}
	
	if(p1_x>WIDTH)
	{
		p1_x = WIDTH;
		p1_vx = -p1_vx;
	}
		
	if(p1_x<0)
	{
		p1_x = 0;
		p1_vx = -p1_vx;
	}	
	
	// P2
	if(p2_y>HEIGHT-LAND_HEIGHT)
	{
		p2_y = HEIGHT-LAND_HEIGHT;
		p2_vy = -p2_vy;
	}
	if(p2_y<0)
	{
		p2_y = 0;
		p2_vy = -p2_vy;
	}
	
	if(p2_x>WIDTH)
	{
		p2_x = WIDTH;
		p2_vx = -p2_vx;
	}
		
	if(p2_x<0)
	{
		p2_x = 0;
		p2_vx = -p2_vx;
	}	
	

	var arrayLength = projectiles1.length;
	for (var i = 0; i < arrayLength; i++) {
		
		var outsideBounds = projectiles1[i].x < 0 || projectiles1[i].x > WIDTH || projectiles1[i].y < 0 || projectiles1[i].y > HEIGHT;
		var hitP2 = Math.pow(projectiles1[i].x-p2_x-5,2) + Math.pow(projectiles1[i].y-p2_y-5,2) < 100;
		
		if(outsideBounds || hitP2)
		{
			projectiles1.splice(i,1);
			arrayLength--;
		}
		
		if(hitP2 && p2_health > 0)
			p2_health--;
	}

	arrayLength = projectiles2.length;
	for (var i = 0; i < arrayLength; i++) {
		
		var outsideBounds = projectiles2[i].x < 0 || projectiles2[i].x > WIDTH || projectiles2[i].y < 0 || projectiles2[i].y > HEIGHT;
		var hitP1 = Math.pow(projectiles2[i].x-p1_x-5,2) + Math.pow(projectiles2[i].y-p1_y-5,2) < 100;
		
		if(outsideBounds || hitP1)
		{
			projectiles2.splice(i,1);
			arrayLength--;
		}
		
		if(hitP1 && p1_health > 0)
			p1_health--;
	}
	
}

function p1TryShoot()
{
	if(projectiles1.length<10)
	{
		var shot = { x:p1_x, y:p1_y, vx: p1_vx, vy:p1_vy};
		projectiles1.push(shot);
	}
	
}

function p2TryShoot()
{
	if(projectiles2.length<10)
	{
		var shot = { x:p2_x, y:p2_y, vx:p2_vx, vy:p2_vy};
		projectiles2.push(shot);
	}
}

