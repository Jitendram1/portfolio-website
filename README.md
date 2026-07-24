# DevOps Portfolio Website — CI/CD & Monitoring Project

An end-to-end DevOps project where a static portfolio website is containerized using Docker, built and deployed through a Jenkins CI/CD pipeline, pushed to Docker Hub, and hosted on AWS EC2.

The EC2 infrastructure and Docker containers are monitored using Prometheus, Node Exporter, cAdvisor, and Grafana.

---

## Project Overview

This project demonstrates a complete DevOps workflow:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Jenkins CI/CD
    │
    ├── Checkout Source Code
    ├── Build Docker Image
    ├── Push Image to Docker Hub
    └── Deploy Application
             │
             ▼
          AWS EC2
             │
             ▼
      Docker Container
             │
             ▼
       Portfolio Website
```

The infrastructure and Docker containers are monitored using:

```text
Node Exporter ─────► EC2 Host Metrics
                         │
                         ▼
cAdvisor ───────────► Docker Container Metrics
                         │
                         ▼
                    Prometheus
                         │
                         ▼
                      Grafana
```

---

# Architecture

## Application Deployment Architecture

```text
                         ┌──────────────────┐
                         │      GitHub      │
                         │                  │
                         │  Source Code     │
                         │  Dockerfile      │
                         │  Jenkinsfile     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     Jenkins      │
                         │                  │
                         │  1. Checkout     │
                         │  2. Build Image  │
                         │  3. Push Image   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Docker Hub    │
                         │                  │
                         │  Docker Image    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     AWS EC2      │
                         │                  │
                         │  Docker Engine   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Portfolio App    │
                         │                  │
                         │ Docker Container │
                         └──────────────────┘
```

---

# Monitoring Architecture

```text
                       ┌─────────────────────┐
                       │       Grafana        │
                       │                     │
                       │  Dashboards         │
                       │  Visualization      │
                       │  Alerts             │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │     Prometheus      │
                       │                     │
                       │  Scrapes Metrics    │
                       │  Stores Time Series │
                       │  PromQL Queries     │
                       └──────────┬──────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │   Node Exporter  │        │     cAdvisor     │
          │                  │        │                  │
          │ EC2 Host Metrics │        │ Docker Metrics   │
          └────────┬─────────┘        └────────┬─────────┘
                   │                           │
                   ▼                           ▼
              ┌─────────┐                ┌─────────┐
              │   EC2   │                │ Docker  │
              │  Host   │                │Containers│
              └─────────┘                └─────────┘
```

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Version Control

- Git
- GitHub

## CI/CD

- Jenkins

## Containerization

- Docker
- Docker Hub

## Cloud

- AWS EC2

## Monitoring

- Prometheus
- Node Exporter
- cAdvisor
- Grafana

---

# Project Structure

```text
portfolio-webiste/
│
├── app/
│   │
│   ├── assets/
│   │   ├── Jpeg/
│   │   └── png/
│   │
│   ├── css/
│   │   └── archive_style.css
|   |   └── style.css
│   │
│   ├── sass/
│   │   └── script.js
│   │
│   ├── index.html
│   ├── projects.html
│   └── ...
│
├── monitoring/
│   │
│   ├── prometheus/
│   │   └── prometheus.yml
│   │
│   └── grafana/
│       ├── ec2-dashboard.json
│       └── docker-dashboard.json
│
├── Dockerfile
├── Jenkinsfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

# CI/CD Pipeline

The Jenkins pipeline performs the following steps:

```text
Developer Pushes Code
        │
        ▼
      GitHub
        │
        ▼
     Jenkins
        │
        ▼
   Checkout Code
        │
        ▼
 Build Docker Image
        │
        ▼
 Push Image to Docker Hub
        │
        ▼
 Pull Latest Image on EC2
        │
        ▼
 Stop Existing Container
        │
        ▼
 Remove Existing Container
        │
        ▼
 Run New Container
        │
        ▼
 Application Deployed
```

---

# 🐳 Docker

The application is packaged as a Docker image.

## Dockerfile

Example:

```dockerfile
FROM nginx:alpine

COPY app/ /usr/share/nginx/html/

EXPOSE 80
```

The Docker container serves the static website using Nginx.

## Build the Image

```bash
docker build -t portfolio-webiste:latest .
```

## Run the Container Locally

```bash
docker run -d \
  --name portfolio \
  -p 80:80 \
  portfolio-webiste:latest
```

The application can then be accessed at:

```text
http://localhost:80
```

---

# Jenkins Pipeline

The Jenkins pipeline performs:

### 1. Checkout

Jenkins pulls the latest code from GitHub.

### 2. Build

A Docker image is created.

```bash
docker build -t username/portfolio:latest .
```

### 3. Push

The Docker image is pushed to Docker Hub.

```bash
docker push username/portfolio:latest
```

### 4. Deploy

The latest image is pulled on the EC2 instance.

The existing container is stopped and replaced with the new container.

```bash
docker pull username/portfolio:latest

docker stop portfolio || true
docker rm portfolio || true

docker run -d \
  --name portfolio \
  -p 80:80 \
  username/portfolio-webiste:latest
```

> Replace `username/portfolio` with your actual Docker Hub image name.

---

# AWS EC2 Deployment

The application runs on an AWS EC2 instance.

The EC2 instance runs:

```text
Docker Engine
│
├── Portfolio Container
├── Prometheus
├── Grafana
├── Node Exporter
└── cAdvisor
```

The application is accessed through:

```text
http://EC2_PUBLIC_IP
```

---

# 📈 Monitoring Setup

## Prometheus

Prometheus is responsible for:

- Scraping metrics
- Storing time-series data
- Querying metrics using PromQL
- Evaluating alert rules

Prometheus scrapes the following targets:

```text
Prometheus
Node Exporter
cAdvisor
```

Example `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:

  - job_name: "prometheus"
    static_configs:
      - targets:
          - "prometheus:9090"

  - job_name: "node-exporter"
    static_configs:
      - targets:
          - "node-exporter:9100"

  - job_name: "cadvisor"
    static_configs:
      - targets:
          - "cadvisor:8080"
```

---

# 🖥️ Node Exporter

Node Exporter exposes Linux/EC2 host metrics.

The metrics include:

- CPU usage
- Memory usage
- Disk usage
- Filesystem usage
- Network traffic
- Load average
- System uptime

The data flow is:

```text
EC2
  │
  ▼
Node Exporter
  │
  ▼
Prometheus
  │
  ▼
Grafana
```

---

# cAdvisor

cAdvisor collects Docker container metrics.

It provides:

- Container CPU usage
- Container memory usage
- Container network traffic
- Container filesystem usage
- Container resource usage

The data flow is:

```text
Docker Containers
        │
        ▼
     cAdvisor
        │
        ▼
    Prometheus
        │
        ▼
     Grafana
```

---

# Grafana Dashboards

## Dashboard 1 — EC2 Infrastructure Monitoring

This dashboard monitors the EC2 host.

Metrics include:

- CPU Usage
- Memory Usage
- Disk Usage
- Network Received
- Network Transmitted
- Load Average
- System Uptime

### Grafana Dashboard Template

This project uses the popular Node Exporter dashboard:

```text
Dashboard ID: 1860
```

To import:

```text
Grafana
    ↓
Dashboards
    ↓
New
    ↓
Import
    ↓
Enter Dashboard ID: 1860
    ↓
Select Prometheus Data Source
    ↓
Import
```

The dashboard is powered by Node Exporter metrics collected by Prometheus.

---

## Dashboard 2 — Docker Container Monitoring

This dashboard monitors Docker containers using cAdvisor.

Metrics include:

- Running Containers
- Container CPU Usage
- Container Memory Usage
- Network Received
- Network Transmitted
- Container Resource Consumption

Example metrics:

```promql
container_cpu_usage_seconds_total
```

```promql
container_memory_usage_bytes
```

```promql
container_network_receive_bytes_total
```

```promql
container_network_transmit_bytes_total
```

---

# 🔍 Example PromQL Queries

## EC2 CPU Usage

```promql
100 - (
  avg by (instance) (
    rate(node_cpu_seconds_total{mode="idle"}[5m])
  ) * 100
)
```

---

## EC2 Memory Usage

```promql
100 * (
  1 -
  node_memory_MemAvailable_bytes
  /
  node_memory_MemTotal_bytes
)
```

---

## EC2 Disk Usage

```promql
100 * (
  1 -
  node_filesystem_avail_bytes
  /
  node_filesystem_size_bytes
)
```

---

## Container CPU Usage

```promql
sum by (name) (
  rate(container_cpu_usage_seconds_total{name!=""}[5m])
) * 100
```

---

## Container Memory Usage

```promql
container_memory_usage_bytes{name!=""}
```

---

## Target Health

```promql
up
```

A value of:

```text
1 = Target is UP
0 = Target is DOWN
```

---

# 🚨 Alerting

Grafana alerts can be configured for important infrastructure conditions.

Example alerts:

| Alert | Condition | Severity |
|---|---|---|
| High CPU | CPU > 80% for 5 minutes | Warning |
| High Memory | Memory > 80% for 5 minutes | Warning |
| High Disk Usage | Disk > 85% | Warning |
| Critical Disk Usage | Disk > 95% | Critical |
| Node Exporter Down | Target = 0 | Critical |
| cAdvisor Down | Target = 0 | Critical |

Example Node Exporter availability alert:

```promql
up{job="node-exporter"} == 0
```

This detects when Prometheus can no longer scrape Node Exporter.

---

# Security Considerations

The following should not be committed to GitHub:

```text
Passwords
API Keys
AWS Access Keys
Jenkins Secrets
Docker Hub Passwords
Private SSH Keys
```

Credentials should be stored securely using:

- Jenkins Credentials
- AWS IAM
- Environment Variables
- AWS Secrets Manager

Example:

```text
Jenkins
    ↓
Credentials Store
    ↓
Docker Hub Login
```

Credentials are not hardcoded in the `Jenkinsfile`.

---

# Troubleshooting

## Check Running Containers

```bash
docker ps
```

## Check All Containers

```bash
docker ps -a
```

## Check Prometheus Logs

```bash
docker logs prometheus
```

## Check Grafana Logs

```bash
docker logs grafana
```

## Check cAdvisor Logs

```bash
docker logs cadvisor
```

## Check Node Exporter Logs

```bash
docker logs node-exporter
```

## Test Node Exporter Metrics

```bash
curl http://localhost:9100/metrics
```

## Check Prometheus Targets

Open:

```text
http://EC2_PUBLIC_IP:9090/targets
```

Expected:

```text
prometheus       UP
node-exporter    UP
cadvisor         UP
```

---

# DevOps Concepts Demonstrated

This project demonstrates practical experience with:

- Git version control
- GitHub repositories
- Jenkins CI/CD pipelines
- Docker image creation
- Docker container deployment
- Docker Hub image registry
- AWS EC2 deployment
- Infrastructure monitoring
- Prometheus metrics collection
- Node Exporter
- cAdvisor
- PromQL
- Grafana dashboards
- Infrastructure alerting
- Container monitoring
- Linux troubleshooting
- Docker networking

---

# Future Improvements

Planned improvements include:

- Add HTTPS using Nginx and Let's Encrypt
- Add a custom domain name
- Add automated health checks
- Add deployment rollback
- Add Docker image vulnerability scanning
- Add Alertmanager
- Add email or Slack notifications
- Add application-level metrics
- Add automated testing
- Add blue-green deployment
- Add infrastructure as code using Terraform
- Move monitoring components to a separate EC2 instance
- Add centralized logging using Loki

---

# Key Learning

The monitoring flow used in this project is:

```text
Metric Source
      │
      ▼
Exporter / Collector
      │
      ▼
/metrics Endpoint
      │
      ▼
Prometheus Scraping
      │
      ▼
Time-Series Storage
      │
      ▼
PromQL Query
      │
      ▼
Grafana Visualization
      │
      ▼
Dashboard / Alert
```

For EC2:

```text
EC2
 ↓
Node Exporter
 ↓
Prometheus
 ↓
Grafana
```

For Docker:

```text
Docker Containers
 ↓
cAdvisor
 ↓
Prometheus
 ↓
Grafana
```

---

# Author

Built as a hands-on DevOps learning project demonstrating an end-to-end CI/CD, containerization, cloud deployment, and monitoring workflow.
