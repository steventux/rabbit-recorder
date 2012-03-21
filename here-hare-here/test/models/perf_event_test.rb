require File.expand_path(File.dirname(__FILE__) + '/../test_config.rb')

describe "PerfEvent Model" do
  it 'can construct a new instance' do
    @perf_event = PerfEvent.new
    refute_nil @perf_event
  end
end
