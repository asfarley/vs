require 'sinatra'
require 'json'
require './state.rb'
require 'logger'

get '/hi' do
	"Hello world!"
end

post '/state1' do
  s_prev = State.new
  s_prev.load
  s = State.new
  s.x1 = params[:x1];
  s.y1 = params[:y1];
  s.vx1 = params[:vx1];
  s.vy1 = params[:vy1];
  s.x2 = s_prev.x2;
  s.y2 = s_prev.y2;
  s.vx2 = s_prev.vx2;
  s.vy2 = s_prev.vy2;
  s.h2 = params[:h2];
  s.h1 = s_prev.h1;
  state_hash =   { 'x1' => s.x1, 'x2' => s.x2, 'y1' => s.y1, 'y2' => s.y2, 'vx1' => s.vx1, 'vy1' => s.vy1, 'vx2' => s.vx2, 'vy2' => s.vy2, 'h1' => s.h1, 'h2' => s.h2}

  for i in 0..9
    x_symbol_string = "pj1" + i.to_s + "x"
    y_symbol_string = "pj1" + i.to_s + "y"
    vx_symbol_string = "pj1" + i.to_s + "vx"
    vy_symbol_string = "pj1" + i.to_s + "vy"
    if params.has_key?(x_symbol_string)
      s.projectiles1[i] = Projectile.new
      s.projectiles1[i].x = params[x_symbol_string.to_sym];
      s.projectiles1[i].y = params[y_symbol_string.to_sym];
      s.projectiles1[i].vx = params[vx_symbol_string.to_sym];
      s.projectiles1[i].vy = params[vy_symbol_string.to_sym];
      state_hash[x_symbol_string] = s.projectiles1[i].x
      state_hash[y_symbol_string] = s.projectiles1[i].y
      state_hash[vx_symbol_string] = s.projectiles1[i].vx
      state_hash[vy_symbol_string] = s.projectiles1[i].vy
    end
  end

  for i in 0..9
    x_symbol_string = "pj2" + i.to_s + "x"
    y_symbol_string = "pj2" + i.to_s + "y"
    vx_symbol_string = "pj2" + i.to_s + "vx"
    vy_symbol_string = "pj2" + i.to_s + "vy"
    unless s_prev.projectiles2.nil?
    if s_prev.projectiles2.length > i
      s.projectiles2[i] = Projectile.new
      s.projectiles2[i].x = s_prev.projectiles2[i].x;
      s.projectiles2[i].y =  s_prev.projectiles2[i].y;
      s.projectiles2[i].vx =  s_prev.projectiles2[i].vx;
      s.projectiles2[i].vy =  s_prev.projectiles2[i].vy;
      state_hash[x_symbol_string] = s.projectiles2[i].x
      state_hash[y_symbol_string] = s.projectiles2[i].y
      state_hash[vx_symbol_string] = s.projectiles2[i].vx
      state_hash[vy_symbol_string] = s.projectiles2[i].vy
    end
    end
  end

  s.save
  state_hash.to_json
end

post '/state2' do
  s_prev = State.new
  s_prev.load
  s = State.new
  s.x1 = s_prev.x1; 
  s.y1 = s_prev.y1;
  s.vx1 = s_prev.vx1;
  s.vy1 = s_prev.vy1;
  s.x2 = params[:x2];
  s.y2 = params[:y2];
  s.vx2 = params[:vx2];
  s.vy2 = params[:vy2];
  s.h2 = s_prev.h2;
  s.h1 = params[:h1];
  state_hash =   { 'x1' => s.x1, 'x2' => s.x2, 'y1' => s.y1, 'y2' => s.y2, 'vx1' => s.vx1, 'vy1' => s.vy1, 'vx2' => s.vx2, 'vy2' => s.vy2, 'h1' => s.h1, 'h2' => s.h2}

  for i in 0..9
    x_symbol_string = "pj2" + i.to_s + "x"
    y_symbol_string = "pj2" + i.to_s + "y"
    vx_symbol_string = "pj2" + i.to_s + "vx"
    vy_symbol_string = "pj2" + i.to_s + "vy"
    if params.has_key?(x_symbol_string)
      s.projectiles2[i] = Projectile.new
      s.projectiles2[i].x = params[x_symbol_string.to_sym];
      s.projectiles2[i].y = params[y_symbol_string.to_sym];
      s.projectiles2[i].vx = params[vx_symbol_string.to_sym];
      s.projectiles2[i].vy = params[vy_symbol_string.to_sym];
      state_hash[x_symbol_string] = s.projectiles2[i].x
      state_hash[y_symbol_string] = s.projectiles2[i].y
      state_hash[vx_symbol_string] = s.projectiles2[i].vx
      state_hash[vy_symbol_string] = s.projectiles2[i].vy
    end
  end

  for i in 0..9
    x_symbol_string = "pj1" + i.to_s + "x"
    y_symbol_string = "pj1" + i.to_s + "y"
    vx_symbol_string = "pj1" + i.to_s + "vx"
    vy_symbol_string = "pj1" + i.to_s + "vy"
    owner_symbol_string = "pj1" + i.to_s + "owner"
    unless s_prev.projectiles1.nil?
    if s_prev.projectiles1.length > i
      s.projectiles1[i] = Projectile.new
      s.projectiles1[i].x = s_prev.projectiles1[i].x;
      s.projectiles1[i].y =  s_prev.projectiles1[i].y;
      s.projectiles1[i].vx =  s_prev.projectiles1[i].vx;
      s.projectiles1[i].vy =  s_prev.projectiles1[i].vy;
      state_hash[x_symbol_string] = s.projectiles1[i].x
      state_hash[y_symbol_string] = s.projectiles1[i].y
      state_hash[vx_symbol_string] = s.projectiles1[i].vx
      state_hash[vy_symbol_string] = s.projectiles1[i].vy
    end
    end
  end
  
  s.save
  state_hash.to_json
end

get '/reset' do
	s = State.new
	s.save
end

get '/state' do
  s_prev = State.new
  s_prev.load
  s = State.new
  s.x1 = s_prev.x1; 
  s.y1 = s_prev.y1;
  s.vx1 = s_prev.vx1;
  s.vy1 = s_prev.vy1;
  s.h1 = s_prev.h1;
  s.h2 = s_prev.h2;
  
  state_hash =   { 'x1' => s.x1, 'x2' => s.x2, 'y1' => s.y1, 'y2' => s.y2, 'vx1' => s.vx1, 'vy1' => s.vy1, 'vx2' => s.vx2, 'vy2' => s.vy2, 'h1' => s.h1, 'h2' => s.h2}

  for i in 0..9
    x_symbol_string = "pj2" + i.to_s + "x"
    y_symbol_string = "pj2" + i.to_s + "y"
    vx_symbol_string = "pj2" + i.to_s + "vx"
    vy_symbol_string = "pj2" + i.to_s + "vy"
    unless s_prev.projectiles2.nil?
      s.projectiles2[i] = Projectile.new
      s.projectiles2[i].x = params[x_symbol_string.to_sym];
      s.projectiles2[i].y = params[y_symbol_string.to_sym];
      s.projectiles2[i].vx = params[vx_symbol_string.to_sym];
      s.projectiles2[i].vy = params[vy_symbol_string.to_sym];
      state_hash[x_symbol_string] = s.projectiles2[i].x
      state_hash[y_symbol_string] = s.projectiles2[i].y
      state_hash[vx_symbol_string] = s.projectiles2[i].vx
      state_hash[vy_symbol_string] = s.projectiles2[i].vy
    end
  end

  for i in 0..9
    x_symbol_string = "pj1" + i.to_s + "x"
    y_symbol_string = "pj1" + i.to_s + "y"
    vx_symbol_string = "pj1" + i.to_s + "vx"
    vy_symbol_string = "pj1" + i.to_s + "vy"
    unless s_prev.projectiles1.nil?
    if s_prev.projectiles1.length > i
      s.projectiles1[i] = Projectile.new
      s.projectiles1[i].x = s_prev.projectiles1[i].x;
      s.projectiles1[i].y =  s_prev.projectiles1[i].y;
      s.projectiles1[i].vx =  s_prev.projectiles1[i].vx;
      s.projectiles1[i].vy =  s_prev.projectiles1[i].vy;
      state_hash[x_symbol_string] = s.projectiles1[i].x
      state_hash[y_symbol_string] = s.projectiles1[i].y
      state_hash[vx_symbol_string] = s.projectiles1[i].vx
      state_hash[vy_symbol_string] = s.projectiles1[i].vy
    end
    end
  end
  
  state_hash.to_json
end


get '/' do
  File.read(File.join('static', 'vs.html'))
end
