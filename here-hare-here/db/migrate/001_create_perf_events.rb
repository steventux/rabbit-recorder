class CreatePerfEvents < ActiveRecord::Migration
  def self.up
    create_table :perf_events do |t|
      t.string :payload
      t.timestamps
    end
  end

  def self.down
    drop_table :perf_events
  end
end
