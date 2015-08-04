require 'yaml'

class State

attr_accessor :x1, :x2, :y1, :y2, :h1, :h2, :vx1, :vx2, :vy1, :vy2, :projectiles1, :projectiles2

def initialize
  @x1 = 0
  @x2 = 0
  @y1 = 0
  @y2 = 0
  @h1 = 10
  @h2 = 10
  @vx1 = 0
  @vx2 = 0
  @vy1 = 0
  @vy2 = 0
  @projectiles1 = Array.new()
  @projectiles2 = Array.new()
end

def save
  serialized = YAML::dump(self)
  File.open("/srv/vs/public/state.txt", 'w') { |file| file.write(serialized) }
end

def load
  File.open("/srv/vs/public/state.txt", 'r') { |file| 
  s_loaded = YAML::load(file.read) 
  @x1 = s_loaded.x1
  @x2 = s_loaded.x2
  @y1 = s_loaded.y1
  @y2 = s_loaded.y2
  @h1 = s_loaded.h1
  @h2 = s_loaded.h2
  @vx1 = s_loaded.vx1
  @vx2 = s_loaded.vx2
  @vy1 = s_loaded.vy1
  @vy2 = s_loaded.vy2
  @projectiles1 = s_loaded.projectiles1
  @projectiles2 = s_loaded.projectiles2
  }
end

end

class Projectile

  attr_accessor :x, :y, :vx, :vy

  def initialize
  @x = 0
  @y = 0
  @vx = 0
  @vy = 0
  end

end
