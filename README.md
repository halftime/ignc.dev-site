# ignc.dev

# network setup
```
http----|CF rev proxy|---tcp:80----|local rpi tcp:8080|
https---|CF rev proxy|---tcp:443---|local rpi tcp:8081|
```

# run
```
sudo docker run -v /home/admin/certs:app/certs -p 443:8081 -d igncdev/site:arm64
```
