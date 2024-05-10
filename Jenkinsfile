pipeline {
  agent any
  stages {
    stage('SCM checkout') {
      steps {
        echo 'SCM checkout from github'
        git(url: 'https://github.com/Abdomuller11/Dockerize-ECommerce-web-app.git', branch: 'main')
        echo 'repo cloned success in /var/lib/jenkins/workspace/dockercompose'
      }
    }

    stage('make env') {
      steps {
        sh '''cd $WORKSPACE/ecommerce_react_node-main/backend ; echo "MONGO_URI=mongodb+srv://mohamedkhalefaofficial:o2Q4b5GtLxSduDDW@cluster0.mspvlpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=sdgkMKEVlm3v23kl_n423vGG3b_TVnm234xnv23
JWT_REFRESH_SECRET=rerv1jv15v1CVBnasd23jnv1j3123nvrqwr23" >  .env'''
      }
    }

    stage('Build') {
      steps {
        echo 'hi from Build'
        sh 'docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build'
      }
    }

    stage('Testing') {
      steps {
        echo 'hi from testing'
      }
    }

    stage('Remove containers') {
      steps {
        input(message: 'do you want me to stop containers now?', ok: 'yes')
        sh 'docker-compose -f docker-compose.yml -f docker-compose.prod.yml down'
      }
    }

  }
}
