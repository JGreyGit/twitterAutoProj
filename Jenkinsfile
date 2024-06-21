pipeline {
    agent any

    environment {
        // Define environment variables if needed
        WORKSPACE = pwd() // Set WORKSPACE to current directory
        CYPRESS_CACHE_FOLDER = "${HOME}/.cache/Cypress"
        CYPRESS_BINARY_FOLDER = "${HOME}/bin/Cypress"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js and Cypress dependencies
                script {
                    def NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${NODEJS_HOME}/bin:${env.PATH}"
                    echo "PATH: ${env.PATH}"
                    sh 'npm --version'
                    sh 'npm install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests and generate JUnit XML and mochawesome JSON reports
                sh 'npx cypress run --headed --browser chrome --spec "cypress/e2e/twitter/tweetMessage.cy.js" --reporter mocha-junit-reporter --reporter-options mochaFile=cypress/results/junit/results.xml,toConsole=true,reportDir=cypress/reports/mochawesome,overwrite=false,html=false,json=true --config-file cypress.config.js'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive Cypress reports and other artifac
