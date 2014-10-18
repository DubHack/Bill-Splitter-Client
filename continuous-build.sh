while :
do
  inotifywait .
  grunt build && phonegap run android
  sleep 1
done
