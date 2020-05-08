deltaT = 0.01;
endTime = 20;
timeMultiplier = 100;

l1 = 300;
l2 = 300;
l3 = 300; % This only scales things, so not really a parameter

g = 9.81;

harmonic = 10
harmonicDifference = 1  /10

% Initial Conditions
theta1S0 = pi/2;
thetaDot1S0 = harmonic;
phi1S0 = 0
phiDot1S0 = harmonic;

theta2S0 = -pi/2;
thetaDot2S0 = harmonic*harmonicDifference;
phi2S0 = 0;
phiDot2S0 = harmonic*harmonicDifference;


% Finding Constants from IC
A1 = sin(theta1S0)^2*phiDot1S0
A2 = sin(theta2S0)^2*phiDot2S0

% l1 = A2/A1
% l2 = 10

tVals = 0:deltaT:endTime;

theta1S1 = theta1S0 + deltaT*thetaDot1S0 + 1/2*deltaT^2*(cos(theta1S0)/sin(theta1S0)^3*A1^2-g/l1*sin(theta1S0));
theta1Vals = [theta1S0, theta1S1]

phi1S1 = phi1S0+deltaT*A1/sin(theta1S0)^2;
phi1Vals = [phi1S0, phi1S1]

theta2S1 = theta2S0 + deltaT*thetaDot2S0 + 1/2*deltaT^2*(cos(theta2S0)/sin(theta2S0)^3*A2^2-g/l2*sin(theta2S0));
theta2Vals = [theta2S0, theta2S1]

phi2S1 = phi2S0+deltaT*A2/sin(theta2S0)^2;
phi2Vals = [phi2S0, phi2S1]


for i=3:endTime/deltaT+1
    theta1Vals(i) = 2*theta1Vals(i-1)-theta1Vals(i-2)+(deltaT)^2*(cos(theta1Vals(i-1))/(sin(theta1Vals(i-1)))^3*A1^2 - g/l1*sin(theta1Vals(i-1)));
    phi1Vals(i) = phi1Vals(i-1) + deltaT*A1/sin(theta1Vals(i-1))^2;
    
    theta2Vals(i) = 2*theta2Vals(i-1)-theta2Vals(i-2)+(deltaT)^2*(cos(theta2Vals(i-1))/(sin(theta2Vals(i-1)))^3*A2^2 - g/l2*sin(theta2Vals(i-1)));
    phi2Vals(i) = phi2Vals(i-1) + deltaT*A2/sin(theta2Vals(i-1))^2;
end


x1Vals = l1*sin(theta1Vals).*cos(phi1Vals);
y1Vals = l1*sin(theta1Vals).*sin(phi1Vals);
z1Vals = -l1*cos(theta1Vals);

pxVals = -l3*sin(theta2Vals).*cos(phi2Vals);
pyVals = -l3*sin(theta2Vals).*sin(phi2Vals);
pzVals = l3*cos(theta2Vals);


xpVals = x1Vals+pxVals;
ypVals = y1Vals+pyVals;

xpVals(:)
ypVals(:)


% Plotting
subplot(4, 2, 1);
plot3(x1Vals, y1Vals, z1Vals);
xlabel('x') 
ylabel('y') 
zlabel('z')
title('m1 position in time')

subplot(4, 2, 2);
plot3(pxVals, pyVals, pzVals);
xlabel('x') 
ylabel('y') 
zlabel('z')
title('P position in time')

subplot(4, 2, 3);
plot(x1Vals, y1Vals);
xlabel('x') 
ylabel('y') 
zlabel('z')
title('Projection of position of m1 onto xy-plane')

subplot(4, 2, 4);
plot(pxVals, pyVals);
xlabel('x') 
ylabel('y') 
title('Projection of position of P onto xy-plane')

subplot(4, 2, [5 8]);
plot(xpVals, ypVals);
xlabel('x') 
ylabel('y') 
title('Position of ink dropping on plane A')


% plot(xpVals, ypVals);
% % xlabel('x') 
% % ylabel('y') 
% % title('Position of ink dropping on plane A')
% set(gca,'visible','off')





