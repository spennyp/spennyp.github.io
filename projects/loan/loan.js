// Default values
var loanValue = 12000
var loanTerm = 1.5 * 12 // months
var interestRate = 3.5 / 100

// Input bounds
var loanValueMin = 1
var loanValueMax = 999999999
var loanTermMin = 0
var loanTermMax = 30
var interestRateMin = 0
var interestRateMax = 100

// Plot settings
var displayYearsAfter = 3 // If the term is more than this number of years, the x axis will contain years, else months
var numberOfYSteps = 5

// Chart point selection
var pointColors = ["transparent"] 
var indexOfSelectedPoint = 0

// Loan computation veriables
var interest
var principal
var balance
var monthlyPayment
var monthLabel
var plotData

var chart // the chart object


// Set up page
$(document).ready(function(){
    createChart()
    $($(this).find("#loanValue > .loanDetail")).text(getLoanValueText(loanValue))
    $($(this).find("#loanTerm > .loanDetail")).text((loanTerm / 12).toString())
    $($(this).find("#interestRate > .loanDetail")).text(((interestRate * 100).toFixed(1)).toString() + "%")

    computeLoan()
});

// Handling loan detail inputs
$(document).ready(function(){
    $('body').on('click', '[data-editable]', function(){
        var $org = $(this);
        var orgVal = $org.text();
        var $parent = $($(this).parent()[0])
        var id = $parent.attr("id")
        var $errorMsg = $($parent.find(".detailErrorMessage"))

        $errorMsg.css("opacity", 0) // Remove if it was set

        // Parse for $ input
        if (id == "loanValue") {
            orgVal = getLoanValueNumber(orgVal)
        } else if (id == "interestRate") { // Parse for interest rate input
            orgVal = getInterestRateNumber(orgVal)
        } else { // Parse for loan term
            orgVal = getLoanTermNumber(orgVal)
        }

        var $input = $('<input type="number" class="loanDetailInput" />').val(orgVal);        
        $org.replaceWith($input);
        
        var save = function() {
            var outputVal = parseFloat($input.val())
            if (isNaN(outputVal)) {
                $errorMsg.css("opacity", 1)
                outputVal = orgVal
            } else {
                if (id == "loanValue") {
                    if (outputVal > loanValueMax || outputVal < loanValueMin) { // Check bounds
                        $errorMsg.css("opacity", 1)
                        outputVal = getLoanValueText(orgVal)
                    } else {
                        loanValue = outputVal
                        outputVal = getLoanValueText(outputVal)
                    }
                }

                if (id == "loanTerm") {
                    if (outputVal > loanTermMax || outputVal <= loanTermMin) {
                        $errorMsg.css("opacity", 1)
                        outputVal = orgVal
                    }

                    loanTerm = outputVal * 12
                    outputVal = getLoanTermText(outputVal)
                }

                if (id == "interestRate") {
                    if (outputVal < interestRateMin || outputVal > interestRateMax) {
                        $errorMsg.css("opacity", 1)
                        outputVal = orgVal
                    }

                    interestRate = outputVal / 100
                    outputVal = getInterestRateText(outputVal)
                }
            }

            var $new = $('<div class="loanDetail" data-editable />').text(outputVal);
            $input.replaceWith($new);
            computeLoan()
        };

        $input.one('blur', save).focus();
    });
});


function getLoanValueText(number) {
    text = number.toFixed(2).toString()
    if (number / 1000000 > 1) {
        text = ((number / 1000000).toFixed(1)).toString() + "M"
    } else if (number / 1000 > 1) {
        text = ((number / 1000).toFixed(1)).toString() + "k"
    } 
    return "$" + text.replace(".00", "").replace(".0", "")
}

function getLoanValueNumber(text) {
    var last = text.charAt(text.length-1);
    var number = parseFloat(text.substr(1, text.length-1))
    if (last == "k") {
        number = parseFloat(text.substr(1, text.length-2)) * 1000
    } else if (last =="M") {
        number = parseFloat(text.substr(1, text.length-2)) * 1000000
    } 

    return number
}

function getInterestRateText(number) {
    return number.toFixed(1).toString() + "%"
}

function getInterestRateNumber(text) {
    return parseFloat(text.substr(0, text.length-1))
}

function getLoanTermText(number) {
    return number.toFixed(1).toString()
}

function getLoanTermNumber(text) {
    return parseFloat(text)
}

// When next is clicked, hide and scroll down
$(document).ready(function(){
    $("#nextButton").click(function(){
        $("#nextButtonArea").css("display", "none")
        var topPosition = $("#mainInputs").offset()["top"]
        $([document.documentElement, document.body]).animate({scrollTop: topPosition}, 500);
        $(document.body).css("overflow-y", "scroll")
    });
});


function pmt(interestPerPeriod, numPayments, presentValue) {
    var q = Math.pow(1 + interestPerPeriod, numPayments);
    return (interestPerPeriod * q * presentValue) / (1 - q);
}

function computeLoan() {
    interest = [0]
    principal = [0]
    balance = [loanValue]
    monthLabel = [0]
    monthlyInterestRate = interestRate / 12
    monthlyPayment = - pmt(monthlyInterestRate, loanTerm, loanValue)

    for (var i = 1; i <= loanTerm; i++) {
        // The order these are computed is important!
        interest.push(balance[i-1] * monthlyInterestRate)
        principal.push(monthlyPayment - interest[i])
        balance.push(balance[i-1] + interest[i] - monthlyPayment)
        monthLabel.push(i)
        pointColors.push("transparent")
    }

    updateChartData()
    updateAnalysisData()
}


function createChart() {
    var ctx = document.getElementById('loanChart').getContext('2d');
    document.getElementById('loanChart').height = 450

    chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: monthLabel,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(113, 233, 193)',
                borderColor: 'rgb(0, 211, 149)',
                data: plotData,
                borderWidth: 5,
                pointBorderColor: "transparent",
                pointBackgroundColor: pointColors,
                pointBorderWidth: 0,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: "transparent",
                pointHoverBorderWidth: 0,
                pointRadius: 10,
                pointHitRadius: 10,

            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: "linear",
                    ticks: {
                        stepSize: 1                
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    type: "linear",
                    ticks: {
                        min: 0,
                        callback: function(value, index, values) {
                            return getLoanValueText(value);
                        }                   
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: false
                    }
                }]
            },
            onClick: function(evt, activeElements) {
                console.log("over")
                activeElements.pointRadius = 10
                var pointIndex = activeElements[0]._index;
                this.config.data.datasets[0]['pointBackgroundColor'][indexOfSelectedPoint] = 'transparent'; // deselect old 
                this.config.data.datasets[0]['pointBackgroundColor'][pointIndex] = 'white'; // select new
                indexOfSelectedPoint = pointIndex
                this.update();
              }
        }
    });
}


function updateChartData() {
    if (loanTerm > displayYearsAfter * 12) { // If it should display years on X axis
        yearLabel = [0]
        yearBalance = [loanValue]

        for (var i = 1; i <= loanTerm / 12; i++) {
            var month = i * 12
            yearLabel.push(i)
            yearBalance.push(balance[month])
        }

        if (loanTerm % 12 != 0) {
            yearLabel.push(loanTerm / 12)
            yearBalance.push(balance[balance.length - 1])
        }

        formatChartData(yearLabel, yearBalance)

        chart.data.labels = yearLabel
        chart.data.datasets[0].data = yearBalance
        chart.options.scales.xAxes[0].scaleLabel.labelString = "Year"
        // chart.options.scales.xAxes[0].ticks.max = Math.ceil(loanTerm / 12)
    } else { // Displaying in months
        formatChartData(monthLabel, balance)

        chart.options.scales.xAxes[0].scaleLabel.labelString = "Month"
        // chart.options.scales.xAxes[0].ticks.max = loanTerm
    }

    chart.data.datasets[0].data = plotData
    chart.options.scales.yAxes[0].ticks.max = loanValue
    chart.options.scales.yAxes[0].ticks.stepSize = loanValue / numberOfYSteps
    console.log("here")
    chart.update();
}


function formatChartData(xVals, yVals) {
    plotData = [];

    for (var i = 0; i < xVals.length; i++) {
        var point = {}
        point["x"] = xVals[i].toFixed(2)
        point["y"] = yVals[i].toFixed(2)
        plotData.push(point)
    }
}

function updateAnalysisData() {
    console.log("hersade")
    document.getElementById("totalValue").innerText = "$" + loanValue.toFixed(2).toString()
    document.getElementById("loanTermValue").innerText = (loanTerm / 12).toFixed(1)
    document.getElementById("interestRateValue").innerText = (interestRate * 100).toFixed(1).toString() + "%"

    document.getElementById("loanPrincipalValue").innerText = "$" + loanValue.toFixed(2).toString()

    var costOfIntrest = interest.reduce((a, b) => a + b, 0)
    document.getElementById("costOfIntrestValue").innerText = "$" + costOfIntrest.toFixed(2).toString()
    document.getElementById("extraPaymentSaving").innerText = "$X.XX"
    document.getElementById("totalCost").innerText = "$" + (costOfIntrest + loanValue).toFixed(2).toString()
}


 