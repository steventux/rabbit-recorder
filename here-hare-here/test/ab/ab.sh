# Apache Bench POST message with concurrency of 5

ab -c 5 -n 1000 -p post_data -T 'application/x-www-form-urlencoded' http://perf-test.local/message
