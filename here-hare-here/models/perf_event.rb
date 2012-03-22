class PerfEvent # < ActiveRecord::Base
  # Why don't we give him to mongo!
  include Mongoid::Document  
  field :payload, :type => String  
end
