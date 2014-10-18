from fabric.api import local, env, cd, run

env.hosts = ['162.216.19.71']
env.user = 'mhalbe'

def deploy(initial='no'):
    project_name = 'ncap-share'
    dest = '~/' + project_name
    local("rsync -rv --delete --copy-links --exclude '.git' --exclude '.meteor/local/build' --exclude '*.DS_Store' --exclude '*.un~' ./ {}@{}:{}".format(env.user, env.hosts[0], dest))
    with cd(dest):
        run('meteor build bundle')
        run('tar -xvf bundle/' + project_name + '.tar.gz')
        with cd('bundle/programs/server'):
            run('npm install')
        with cd('bundle'):
            if initial == 'yes':
                run('MONGO_URL=mongodb://127.0.0.1:27017/ncap-share ROOT_URL=http://halbe.works/ncap-share PORT=3001 pm2 start main.js -n ' + project_name)
            else:
                run('pm2 restart ' + project_name)

