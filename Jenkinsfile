pipeline {
    agent any  // Execute on any available Jenkins agent

    environment {
        // Define an environment variable 
        DOCKER_VERSION = ''
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/SupakornNetsuwan/dev-tool-ta-project']]])
        //     }
        // }
        stage('Check Docker') {
            steps {
                script {
                    // Try to get Docker version
                    def dockerCheck = sh(script: 'docker --version', returnStdout: true).trim()

                    sh 'echo dockerCheck = ' + dockerCheck

                    // Check if Docker is available and set environment variable accordingly
                    if (dockerCheck.contains('Docker version')) {
                        env.DOCKER_VERSION = dockerCheck
                    } else {
                        env.DOCKER_VERSION = 'No Docker'
                    }
                }
            }
        }

        stage('Testing') {
            steps {
                script {
                    // Check if the dev-tool-ta-project directory exists
                    if (fileExists('.')) {
                        echo 'Repository cloned successfully'
                    } else {
                        error 'Failed to clone repository'
                    }
                    // Check if Docker version was found and run hello-world image
                    if (env.DOCKER_VERSION != 'No Docker') {
                        echo "Ready"
                        dir('dev-tool-ta-project') {
                            // Commands executed within this block will be in the specified directory
                            sh "ls"
                            // Add more commands here if needed
                        }
                    } else {
                        echo 'No Docker available on this machine'
                    }
                }
            }
        }
    
        stage('Create .env.production file') {
            steps {
                script {
                    dir('dev-tool-ta-project') {
                        def envContent = '''
                            DATABASE_URL="mysql://root:secretpassword@mysql:3306/tawebsite"
                            NEXTAUTH_URL="http://34.126.159.92:3000"
                            NEXT_PUBLIC_URL="http://34.126.159.92:3000"
                            NEXTAUTH_SECRET="secretmessage"
                            MYSQL_ROOT_PASSWORD="secretpassword"
                            SOME_FLAG="ตอนนี้กำลังใช้ Production development (.env)"
                        '''
                        writeFile file: '.env.production', text: envContent.trim()
                        sh "ls -a"
                    }
                }
            }
        }
        
        
        stage('Run container') {
            steps {
                script {
                    dir('dev-tool-ta-project') {
                        sh 'docker compose -f ./docker-compose.production.yaml build'
                        sh 'docker compose -f ./docker-compose.production.yaml create'
                        sh 'docker compose -f ./docker-compose.production.yaml start'
                        sh 'docker ps -a'
                    }
                }
            }
        }
    }
}