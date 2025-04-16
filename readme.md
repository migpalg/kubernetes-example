# Micro

A simple micro-service application to be deployed with Kubernetes.

## Development

To build an image, you'll need to specify the target:

```bash
docker build . --target todo-service -t migpalg/todo-service:v0.1.0
```

If you're using `minikube` make sure to load the images into your root node:

```bash
minikube image load <image-tag>
```
