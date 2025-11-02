# ignc.dev

# network setup
* http:80      << CF rev proxy >>  |local rpi tcp:8080|
* https:443    << CF rev proxy >>  |local rpi tcp:8081|

# run
'''
sudo docker run -p 80:8080 -p 443:8081 -d igncdev/site:arm64
'''