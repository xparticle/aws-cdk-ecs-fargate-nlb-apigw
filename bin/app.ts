import cdk = require('@aws-cdk/cdk');
import NLBStack from "../lib/nlb";
import ECSStack from "../lib/ecs";
import VPCStack from "../lib/vpc"
import ApigwStack from "../lib/apigw";

const app = new cdk.App();


const vpc = new VPCStack(app, 'VPC');

const nlb = new NLBStack(app, 'NLB', { vpcRefProps: vpc.vpcRefProps });

const ecs = new ECSStack(app, 'ECS', { vpcRefProps: vpc.vpcRefProps });

const apigw = new ApigwStack(app, 'APIGW', { nlbRefProps: nlb.nlbRefProps });

const target1 = nlb.listener1.addTargets('TARGET1', {
    port: 80,
    targets: [ecs.service1]
  });

const target2 = nlb.listener2.addTargets('TARGET2', {
    port: 80,
    targets: [ecs.service2]
  });

const target3 = nlb.listener3.addTargets('TARGET3', {
    port: 80,
    targets: [ecs.service3]
  });


app.run();