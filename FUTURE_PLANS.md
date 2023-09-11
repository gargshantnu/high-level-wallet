# Project Pending Items

This README.md file outlines the pending items and tasks for our project. Each item is described in detail below.

## 1. Add Webpack/Build Support

### Description
We need to integrate Webpack and build support into our project. This will help us bundle and optimize JavaScript code, making our application more efficient and easier to manage.

### Steps
- Install Webpack and necessary plugins.
- Configure Webpack to bundle our front-end assets.
- Create build scripts for development and production environments.

## 2. Add Idempotent Key Support

### Description
Idempotent key support is essential for ensuring that transactions can be retried without unintended side effects. We should implement a mechanism that generates and manages idempotent keys for such operations.

### Steps
- Design a system for generating idempotent keys.
- Implement logic to check and enforce idempotency in relevant operations.

## 3. Deploy Using PM2

### Description
To fully utilize the multiple cores of our server nodes, we should deploy our application using PM2. PM2 is a process manager for Node.js applications that allows us to run multiple instances of our application, taking advantage of available CPU cores.

### Steps
- Install and configure PM2 for our project.
- Create PM2 configuration files for different environments (e.g. development, production).
- Set up deployment scripts or automation for deploying with PM2.

## 4. Support to Run on EBS/Docker

### Description
We should ensure that our application can run seamlessly on Elastic Beanstalk (EBS) or Docker, providing flexibility in deployment options. This will make it easier to scale and manage our application in various environments.

### Steps
- Create Dockerfiles and Docker Compose configurations for our application.
- Ensure compatibility with Elastic Beanstalk and create necessary configuration files.
- Test the application's deployment on both EBS and Docker environments.

## 5. Winston or Other Logging Library

### Description
Implementing a logging library like Winston will help us manage and analyze logs effectively. Proper logging is crucial for monitoring and troubleshooting issues in our application.

### Steps
- Choose a logging library (e.g., Winston) and install it.
- Integrate the logging library into our application code.
- Define logging levels and configure log outputs (e.g., console, files).

## 6. Create 1 More Service - `TransactionService`?

### Description
Consider creating an additional service, TransactionService, currently `walletService` interacts with both `wallet` and `transactions` documents. This service can help segregate responsibilities and maintain a more modular architecture.

### Steps
- Define the purpose and responsibilities of the `TransactionService`.
- Create a new service directory with relevant code and configurations.
- Ensure communication and integration between the `TransactionService` and other parts of the application.


## 7. Implement Node Exporter, Datadog, or Grafana Agent for Monitoring

### Description
To monitor the health and performance of our application, we should implement a monitoring solution such as Node Exporter, Datadog, or Grafana Agent. This will allow us to collect metrics and visualize the data to ensure our application is running smoothly.

### Steps
- Choose a monitoring tool (Node Exporter, Datadog, or Grafana Agent) that suits our requirements.
- Install and configure the monitoring tool on our servers.
- Set up dashboards and alerts to monitor key metrics and performance indicators.

---

These pending items are essential for enhancing our project's functionality, performance, and maintainability. Each item should be addressed and completed to ensure the successful development and deployment of our application.
