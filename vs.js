
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

var projectiles = [];

setInterval(onTimerTick, 33); 

setInterval(syncState, 200); 

function onTimerTick() {	
	kd.tick();
	drawWorld();
	updateWorld();
	detectWin();
}

function syncState() {	
	xmlhttp= new XMLHttpRequest();
	xmlhttp.open("POST","state",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var postParams = "x1=" + p1_x + "x2=" + p2_x + "y1=" + p1_y + "y2=" + p2_y
	xmlhttp.send(postParams);
}

function drawWorld() {
	clearCanvas();
	drawSprites();
	drawHealth();
}

function detectWin()
{
	var winnerDiv = document.getElementById("winner");
	var winnerString = "";
	if(p1_health <= 0)
	{
		winnerString = "P2 WINS!";	
		setTimeout(resetOnWin, 2000);
	}
	else if(p2_health <= 0)
	{
		winnerString = "P1 WINS!";
		setTimeout(resetOnWin, 2000);
	}
	
	winnerDiv.innerHTML = winnerString;
}

function resetOnWin()
{
	location.reload();
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
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(p2_x,p2_y,10,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
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
	var arrayLength = projectiles.length;
	for (var i = 0; i < arrayLength; i++) {
    ctx.beginPath();
	ctx.arc(projectiles[i].x,projectiles[i].y,2,0,2*Math.PI);
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
	
	var arrayLength = projectiles.length;
	for (var i = 0; i < arrayLength; i++) {
		projectiles[i].x = projectiles[i].x + projectiles[i].vx;
		projectiles[i].y = projectiles[i].y + projectiles[i].vy;
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
	
	var arrayLength = projectiles.length;
	for (var i = 0; i < arrayLength; i++) {
		
		var outsideBounds = projectiles[i].x < 0 || projectiles[i].x > WIDTH || projectiles[i].y < 0 || projectiles[i].y > HEIGHT;
		
		var hitP1 = Math.pow(projectiles[i].x-p1_x,2) + Math.pow(projectiles[i].y-p1_y,2) < 100;
		hitP1 = hitP1 && projectiles[i].owner==2;
		
		var hitP2 = Math.pow(projectiles[i].x-p2_x,2) + Math.pow(projectiles[i].y-p2_y,2) < 100;
		hitP2 = hitP2 && projectiles[i].owner==1;
		
		if(outsideBounds || hitP1 || hitP2)
		{
			projectiles.splice(i,1);
		}
		
		if(hitP1)
			p1_health--;
		
		if(hitP2)
			p2_health--;
	}
	
}

function p1TryShoot()
{
	if(projectiles.length<10)
	{
		var shot = { x:p1_x, y:p1_y, vx: p1_vx, vy:p1_vy, owner:1 };
		projectiles.push(shot);
	}
	
}

function p2TryShoot()
{
	if(projectiles.length<10)
	{
		var shot = { x:p2_x, y:p2_y, vx:p2_vx, vy:p2_vy, owner:2 };
		projectiles.push(shot);
	}
}

