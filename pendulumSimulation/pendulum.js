// Constants
var g = 9.81;

// Parameters
var speedMultiplier = 0.5;
var granularity = 10;
var deltaT = 0.01; // Secs
var maxTime = 50;
var setTime = 30.0;
var maxThetaSpeed = 16.0 * granularity;
var maxPhiSpeed = 16.0 * granularity;

// Default initial conditions
var thetaDot1IC = 16 * granularity;
var phiDot1IC = 16 * granularity;
var thetaDot2IC = 4 * granularity;
var phiDot2IC = 4 * granularity;

// System parameters
var canvasWidth = window.innerWidth; // may want to set based on screen size
var canvasHeight = window.innerHeight;
var strokeColor = "rgb(168, 35, 48)";
var l1 = Math.min(window.innerHeight / 4 - 10, window.innerWidth / 4 - 10)
var l2 = Math.min(window.innerHeight / 4 - 10, window.innerWidth / 4 - 10)

var theta1 = [];
var phi1 = [];
var theta2 = [];
var phi2 = [];

var x = [];
var y = [];

// Constants found from IC
var A1;
var A2;

// Controls
var setTimeRange = document.getElementById("setTimeRange");
var setTimeValue = document.getElementById("setTimeValue");
var thetaDot1Range = document.getElementById("thetaDot1Range");
var phiDot1Range = document.getElementById("phiDot1Range");
var thetaDot2Range = document.getElementById("thetaDot2Range");
var phiDot2Range = document.getElementById("phiDot2Range");
var thetaDot1Value = document.getElementById("thetaDot1Value");
var phiDot1Value = document.getElementById("phiDot1Value");
var thetaDot2Value = document.getElementById("thetaDot2Value");
var phiDot2Value = document.getElementById("phiDot2Value");


function startSimulation() {
    setupSliders();
    refreshParameters();
    planeA.start();
}

var planeA = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        drawGraph();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
    }
}

// Grabs the new inital values, sets up model and computes the graph
function refreshParameters() {
    theta1 = [Math.PI/2];
    var thetaDot1 = thetaDot1IC / granularity;
    phi1 = [0];
    var phiDot1 = phiDot1IC / granularity;

    theta2 = [Math.PI/2];
    var thetaDot2 = thetaDot2IC / granularity;
    phi2 = [0];
    var phiDot2 = phiDot2IC / granularity;

    x = [];
    y = [];

    computePosition(); // Calculate initial location

    // BELOW HAS TO HAPPEN AFTER IC ARE SET
    A1 = Math.pow(Math.sin(theta1),2)*phiDot1;
    A2 = Math.pow(Math.sin(theta2),2)*phiDot2;

    var nextTheta1 = theta1[0] + deltaT*thetaDot1 + 1/2*Math.pow(deltaT, 2)*(Math.cos(theta1[0])/Math.pow(Math.sin(theta1[0]),3)*Math.pow(A1,2) - g/l1*Math.sin(theta1[0]));    
    var nextPhi1 = phi1[0] + deltaT*A1/Math.pow(Math.sin(theta1[0]),2);
    theta1.push(nextTheta1);
    phi1.push(nextPhi1);

    var nextTheta2 = theta2[0] + deltaT*thetaDot2 + 1/2*Math.pow(deltaT, 2)*(Math.cos(theta2[0])/Math.pow(Math.sin(theta2[0]),3)*Math.pow(A2,2) - g/l2*Math.sin(theta2[0]));    
    var nextPhi2 = phi2[0] + deltaT*A2/Math.pow(Math.sin(theta2[0]),2);
    theta2.push(nextTheta2);
    phi2.push(nextPhi2);

    computePosition() // Calculate 2nd position
    computeGraph();
}


// MARK: Computation
function drawGraph() {
    planeA.clear()    
    var topIndex = setTime/deltaT;  // Only want to plot up to the set time
    ctx = planeA.context;
    ctx.moveTo(x[0], y[0])
    for (var i = 1; i<topIndex; i++) {
        ctx.lineTo(x[i], y[i])
    }
    // const gradient = ctx.createRadialGradient(canvasHeight/2, canvasWidth/2, 0, canvasHeight/2, canvasWidth/2, canvasHeight/4);
    // gradient.addColorStop(0, strokeColor);
    // gradient.addColorStop(1, strokeColor);
    ctx.strokeStyle = strokeColor;
    ctx.stroke()
}

function computeGraph() {
    var i = theta1.length - 1
    while (i*deltaT < maxTime) {
        computeNextStep();
        i += 1;
    }
}

// Computes the next angles and positions using the finite differnece calculation
function computeNextStep() {
    // Update Angles
    var i = theta1.length; // Since i is the one we are adding!
    var nextTheta1 = 2*theta1[i-1]-theta1[i-2]+Math.pow(deltaT,2)*(Math.cos(theta1[i-1])/Math.pow(Math.sin(theta1[i-1]),3)*Math.pow(A1,2) - g/l1*Math.sin(theta1[i-1]))
    var nextPhi1 = phi1[i-1] + deltaT*A1/Math.pow(Math.sin(theta1[i-1]),2);
    theta1.push(nextTheta1);
    phi1.push(nextPhi1);

    var nextTheta2 = 2*theta2[i-1]-theta2[i-2]+Math.pow(deltaT,2)*(Math.cos(theta2[i-1])/Math.pow(Math.sin(theta2[i-1]),3)*Math.pow(A2,2) - g/l2*Math.sin(theta2[i-1]))
    var nextPhi2 = phi2[i-1] + deltaT*A2/Math.pow(Math.sin(theta2[i-1]),2);
    theta2.push(nextTheta2);
    phi2.push(nextPhi2);

    computePosition();
}


// MARK: Harmonics Animation
var shouldAnimateHarmonics;
async function toggleAnimateHarmonics() {
    var checkBox = document.getElementById("animateHarmonicsCheckBox");
    if (checkBox.checked == true) {
        shouldAnimateHarmonics = true
        setFirstHarmonic(); // Get to the initial location
        requestAnimationFrame(animateHarmonics);
    } else {
        shouldAnimateHarmonics = false
    }
}

function setFirstHarmonic() {
    thetaDot1IC = harmonicNumber*harmonicDifferenceNumerator/harmonicDifferenceDenomerator;
    phiDot1IC = harmonicNumber*harmonicDifferenceNumerator/harmonicDifferenceDenomerator;
    thetaDot2IC = harmonicNumber;
    phiDot2IC = harmonicNumber;
    updateSliderValues();
    updateSliderPositions();
    refreshParameters();
    drawGraph();
}

// Starts at 1/10 and goes to 16/10
var harmonicNumber = 10*granularity;
var harmonicDifferenceNumerator = 16;
var harmonicDifferenceDenomerator = 10;
var numeratorAddition = -1;
async function animateHarmonics() {
    if (shouldAnimateHarmonics) {
        harmonicDifferenceNumerator += numeratorAddition;
        if (harmonicDifferenceNumerator == numeratorAddition) { // Skip the case when they are the same
            harmonicDifferenceNumerator += numeratorAddition;
        }

        if (harmonicDifferenceNumerator == 16) {
            numeratorAddition = -1;
        }

        if (harmonicDifferenceNumerator == 1) {
            numeratorAddition = 1;
        }

        var newThetaDot1IC = harmonicNumber*harmonicDifferenceNumerator/harmonicDifferenceDenomerator;
        var newPhiDot1IC = harmonicNumber*harmonicDifferenceNumerator/harmonicDifferenceDenomerator;
        
        // Animate quickly to below, and slowly animate across the harmonic point
        var newThetaDot1ICBelow = newThetaDot1IC - 0.5 * numeratorAddition;
        var newPhiDot1ICBelow = newPhiDot1IC - 0.5 * numeratorAddition;
        var newThetaDot1ICAbove = newThetaDot1IC + 0.5 *numeratorAddition;
        var newPhiDot1ICAbove = newPhiDot1IC + 0.5 * numeratorAddition;
        await animateTo(newThetaDot1ICBelow, newPhiDot1ICBelow, thetaDot2IC, phiDot2IC, 3);
        await animateTo(newThetaDot1ICAbove, newPhiDot1ICAbove, thetaDot2IC, phiDot2IC, 0.5);

        setTimeout(animateHarmonics, 1)
    }
}

async function animateTo(newThetaDot1IC, newPhiDot1IC, newThetaDot2IC, newPhiDot2IC, speed) {
    return new Promise(async (resolve, reject) => {
        var deltaThetaDot1IC = (newThetaDot1IC - thetaDot1IC);
        var deltaPhiDot1IC = (newPhiDot1IC - phiDot1IC);
        var deltaThetaDot2IC = (newThetaDot2IC - thetaDot2IC);
        var deltaPhiDot2IC = (newPhiDot2IC - phiDot2IC);

        var maxDistnace = Math.max(Math.abs(deltaThetaDot1IC), Math.abs(deltaPhiDot1IC), Math.abs(deltaThetaDot2IC), Math.abs(deltaPhiDot2IC))
        var refreshes = (maxDistnace/speed)*100; 

        for (var i = 1; i <= refreshes; i++) {
            thetaDot1IC += deltaThetaDot1IC / refreshes;
            phiDot1IC += deltaPhiDot1IC / refreshes;
            thetaDot2IC += deltaThetaDot2IC / refreshes;
            phiDot2IC += deltaPhiDot2IC / refreshes;
    
            updateSliderValues();
            updateSliderPositions();
            refreshParameters();
            drawGraph();
            await sleep(10); 
            if (shouldAnimateHarmonics == false) {
                break;
            }
        }
        resolve();
    })
}


// MARK: Time animation
var shouldAnimateInTime;
function toggleAnimateInTime() {
    var checkBox = document.getElementById("animateInTimeCheckBox");
    if (checkBox.checked == true) {
        shouldAnimateInTime = true
        requestAnimationFrame(animateInTime);
    } else {
        shouldAnimateInTime = false
    }
}

function animateInTime() {
    if (setTime <= maxTime && shouldAnimateInTime) {
        setTime = parseFloat(setTime) + deltaT * speedMultiplier;
        setTimeValue.innerHTML = Math.round(setTime);
        setTimeRange.value = Math.round(setTime);
        drawGraph(); 
        requestAnimationFrame(animateInTime);
    }
}


// MARK: Helpers
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function computePosition() {
    var i = theta1.length - 1; // Since i is the one we are adding!
    var nextX = l1*Math.sin(theta1[i])*Math.cos(phi1[i])-l2*Math.sin(theta2[i])*Math.cos(phi2[i]) + canvasWidth / 2;
    x.push(nextX)
    var nextY = l1*Math.sin(theta1[i])*Math.sin(phi1[i])-l2*Math.sin(theta2[i])*Math.sin(phi2[i]) + canvasHeight / 2;
    y.push(nextY)
}

function interuptHarmonicAnimation() {
    shouldAnimateHarmonics = false;
    var checkBox = document.getElementById("animateHarmonicsCheckBox");
    checkBox.checked = false;
}

function setupSliders() {
    // Set max vals
    setTimeRange.max = maxTime;
    thetaDot1Range.max = maxThetaSpeed;
    phiDot1Range.max = maxPhiSpeed;
    thetaDot2Range.max = maxThetaSpeed;
    phiDot2Range.max = maxPhiSpeed;

    // Set default values
    setTimeRange.value = setTime;
    setTimeValue.innerHTML = setTime; 
    thetaDot1Value.innerHTML = thetaDot1IC; 
    thetaDot1Range.value = thetaDot1IC;
    phiDot1Value.innerHTML = phiDot1IC ; 
    phiDot1Range.value = phiDot1IC;
    thetaDot2Value.innerHTML = thetaDot2IC; 
    thetaDot2Range.value = thetaDot2IC;
    phiDot2Value.innerHTML = phiDot2IC; 
    phiDot2Range.value = phiDot2IC;

    // Update the current slider value (each time you drag the slider handle)
    setTimeRange.oninput = function() {
        setTimeValue.innerHTML = this.value;
        setTime = this.value;
        drawGraph();
    }
    thetaDot1Range.oninput = function() {
        thetaDot1Value.innerHTML = this.value;
        thetaDot1IC = this.value;
        interuptHarmonicAnimation();
        refreshParameters();
        drawGraph();
    }
    phiDot1Range.oninput = function() {
        phiDot1Value.innerHTML = this.value;
        phiDot1IC = this.value;
        interuptHarmonicAnimation();
        refreshParameters();
        drawGraph();
    }
    thetaDot2Range.oninput = function() {
        thetaDot2Value.innerHTML = this.value;
        thetaDot2IC = this.value
        interuptHarmonicAnimation();
        refreshParameters();
        drawGraph();
    }
    phiDot2Range.oninput = function() {
        phiDot2Value.innerHTML = this.value;
        phiDot2IC = this.value;
        interuptHarmonicAnimation();
        refreshParameters();
        drawGraph();
    }
}

function updateSliderValues() {
    thetaDot1Value.innerHTML = Math.round(thetaDot1IC);
    phiDot1Value.innerHTML = Math.round(phiDot1IC);
    thetaDot2Value.innerHTML = Math.round(thetaDot2IC);
    phiDot2Value.innerHTML = Math.round(phiDot2IC);
}

function updateSliderPositions() {
    thetaDot1Range.value = Math.round(thetaDot1IC);
    phiDot1Range.value = Math.round(phiDot1IC);
    thetaDot2Range.value = Math.round(thetaDot2IC);
    phiDot2Range.value = Math.round(phiDot2IC);
}

function handlePopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}


