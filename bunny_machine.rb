require 'bunny'

puts "Starting the bunny machine"

# Cache move_events
move_events = []

# Pull a rabbit out of the hat
b = Bunny.new
b.start

# define the movements queue which will consume move events
queue = b.queue('movements')

# create/get exchanges for move events and playbacks
exchange = b.exchange('move-events', :type => :fanout)
playbacks = b.exchange('playbacks', :type => :fanout)

# bind movements queue to the correct exchange
queue.bind(exchange)

# listen for messages
puts "Listening for movements..."
queue.subscribe do |msg|
  puts "bunny_machine received : #{msg[:payload]}"
  # TODO: Better than this
  if msg[:payload] == 'replay'
    puts "replaying #{move_events.size} events"
    move_events.each { |e| playbacks.publish(e) }
    move_events = []
  else 
    move_events << msg[:payload]
    puts "Cache size : #{move_events.size}"
  end
end
