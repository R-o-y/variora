source env/bin/activate

pip install -r prod_reqs

python variora/manage.py makemigrations
python variora/manage.py migrate
sudo env/bin/python variora/manage.py collectstatic --noinput
sudo env/bin/python variora/manage.py installtasks

sudo service memcached restart
sudo service apache2 restart
