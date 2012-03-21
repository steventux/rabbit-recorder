# Defines our constants
PADRINO_ENV  = ENV["PADRINO_ENV"] ||= ENV["RACK_ENV"] ||= "development"  unless defined?(PADRINO_ENV)
PADRINO_ROOT = File.expand_path('../..', __FILE__) unless defined?(PADRINO_ROOT)

# Load our dependencies
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
Bundler.require(:default, PADRINO_ENV)

##
# Enable devel logging
#
# Padrino::Logger::Config[:development] = { :log_level => :devel, :stream => :stdout }
# Padrino::Logger.log_static = true
#

##
# Add your before load hooks here
#
Padrino.before_load do
end

##
# Add your after load hooks here
#
Padrino.after_load do

  EventMachine.next_tick {

    puts "Connecting to AMQP Server"
    channel = AMQP::Channel.new(AMQP.connect)
    queue = channel.queue("performance-test-queue", :auto_delete => true)
    exchange = channel.fanout("perf-events")
    queue.bind(exchange).subscribe do |headers, payload|
      puts payload
      PerfEvent.create :payload => payload.to_s
    end
  }
  
  Mongoid.load!("#{Padrino.root}/config/mongoid.yml")
  
end

Padrino.load!
