require 'bunny'

puts "Starting the bunny machine"

# Cache move_events
move_events = []

b = Bunny.new
b.start
# define the queue
queue = b.queue('movements')
# create/get exchanges
exchange = b.exchange('move-events', :type => :fanout)
playbacks = b.exchange('playbacks', :type => :fanout)
# bind queues to exchanges
queue.bind(exchange)
# listen for messages
queue.subscribe do |msg|
  puts "move-event : #{msg[:payload]}"
  if msg[:payload] == 'replay'
    puts "replaying #{move_events.size} events"
    move_events.each { |e| playbacks.publish(e) }
    move_events = []
  else 
    move_events << msg[:payload]
    puts "#{move_events.size} move events in cache"
  end
end
