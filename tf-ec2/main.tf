provider "aws" {
    region ="us-east-1"
    access_key = var.aws_access_key
    secret_key = var.aws_secret_key
  
}

resource "aws_instance" "telstra-unext-ec2" {
    ami="ami-04a81a99f5ec58529"
    instance_type = "t2.micro"

    vpc_security_group_ids = [aws_security_group.telstra_unext_sg.id]
    key_name = "telstra-key"

    tags = { #creates dictionary
        Name = "project-demo"     
    }
  
}

resource "aws_security_group" "telstra_unext_sg" {
    name        = "telstra-unext-sg"
    description = "Security group"

    ingress { #creates object
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"] 
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"] 
    }

    tags = {
        Name = "telstra-unext-sg"
    }
}

resource "aws_key_pair" "example_key" {
  key_name   = "telstra-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

output "getIP" {
    value = aws_instance.telstra-unext-ec2.public_ip
    description = "public ip"
}

# use jenkins to easily run all tf commands on 1 click