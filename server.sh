pkill python3.7
pkill npm

cd /home/gabygo/mydevices3

python3.7 -m server.main > /var/log/mydevices_server.log &

sleep 5

python3.7 -m agent.main > /var/log/mydevices_client.log &

cd client
npm start &
