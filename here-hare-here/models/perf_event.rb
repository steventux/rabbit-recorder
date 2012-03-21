class PerfEvent # < ActiveRecord::Base
  include Mongoid::Document  
  field :payload, :type => String  
end
