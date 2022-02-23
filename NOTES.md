# Notes

## Docker

### Shell into image

```bash
docker run --rm -it --entrypoint sh IMAGE_ID
```

## AWS

### Connect to EC2 instance

```bash
ssh -i ./ec2.pem ec2-user@ec2-54-166-166-145.compute-1.amazonaws.com
```

### Push image to ECR

Taken from https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html

```bash
aws ecr get-login-password --region region | docker login --username AWS --password-stdin 269967932279.dkr.ecr.us-east-1.amazonaws.com
docker tag IMAGE_ID 269967932279.dkr.ecr.us-east-1.amazonaws.com/quebecois-urbain:latest
docker push 269967932279.dkr.ecr.us-east-1.amazonaws.com/quebecois-urbain:latest
```
