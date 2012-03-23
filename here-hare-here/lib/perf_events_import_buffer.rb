class PerfEventsImportBuffer
  include Singleton
  
  cattr_accessor :buffer
  
  def self.buffer payload
    
    @@buffer = [] if @@buffer.nil?
    
    if @@buffer.size <= 100
      @@buffer << "('#{payload}')"
    else 
      ActiveRecord::Base.connection.execute(
        "INSERT INTO perf_events (payload) VALUES #{@@buffer.join(',')}"
      )
      @@buffer = []
    end
    
  end
  
end
