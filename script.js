var lastProjectNum = 0;

// About section
function openAbout() {
    // document.getElementById("mainPage").style.filter = "blur(5px)"
    // Animate blue
    var filterVal = 'blur(5px)';
    $("#mainPage").css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter':filterVal,
        'transition':'all 0.5s ease-out',
        '-webkit-transition':'all 0.5s ease-out',
        '-moz-transition':'all 0.5s ease-out',
        '-o-transition':'all 0.5s ease-out'
    });

    document.getElementById("aboutPage").style.zIndex = "1"
    $('#aboutPage').animate({'opacity': '1'}, 500);
}

function closeAbout() {
    document.getElementById("mainPage").style.filter = "blur(0)"
    document.getElementById("aboutPage").style.zIndex = "-1"
    document.getElementById("aboutPage").style.opacity = 0
}

$(document).ready(function(){
    $("#experienceList li").click(function() {
        // Set highlight
        $("#experienceList li").removeClass("selectedJob")
        $(this).addClass("selectedJob")

        // Show info for selected
        $("#experienceDetails > li").addClass("hidden")
        var index = $(this).prevAll().length
        $($("#experienceDetails > li")[index]).removeClass("hidden")
    });
});

// Job on mobile arrow animation
$(document).ready(function(){
    $(".mobileExpand").click(function(){
        var jobDetails = $($(this).parent()[0]).find(".jobTasks")
        var jobTeam = $($(this).parent()[0]).find(".jobTeam")
        if (jobDetails.css("display") == "none") {
            $(jobDetails).slideDown()
            $(jobTeam).slideDown()
            $(this).addClass("rotated")
        } else {
            $(jobDetails).slideUp()
            $(jobTeam).slideUp()
            $(this).removeClass("rotated")
        }
    });
});




// Project list Animations
function updateProjectSelection() {
    var projectNum = Math.round(document.getElementById("rightColumn").scrollTop / window.innerHeight)
    if (projectNum != lastProjectNum && !$("#rightColumn").is(":animated")) {
        document.getElementById('projectList').children[lastProjectNum].classList.remove("selectedProject")
        document.getElementById('projectList').children[projectNum].classList.add("selectedProject")

        // Update the scroll of the project list if necessairy
        var listItemHeight = document.getElementById('projectList').children[0].clientHeight 
        var listScrollPosition = projectNum * listItemHeight
        if (projectNum * listItemHeight > document.getElementById('projectList').scrollTop + document.getElementById('projectList').clientHeight) {
            $("#projectList").animate({scrollTop: listScrollPosition});
        } else if (projectNum * listItemHeight < document.getElementById('projectList').scrollTop) {
            $("#projectList").animate({scrollTop: Math.max(listScrollPosition - document.getElementById('projectList').clientHeight, 0)});
        }
        lastProjectNum = projectNum
    }
}

// Make the project image matched the selected project, updateProjectSelection will update the selection
$(document).ready(function(){
    $("#projectList li").click(function() {
        var index = $(this).prevAll().length
        $("#projectList li").removeClass("selectedProject")
        $(this).addClass("selectedProject")
        var scrollPosition = index *  window.innerHeight
        $("#rightColumn").animate({scrollTop: scrollPosition});
    });
});


window.onload =
window.onresize = function() {
    var top = document.getElementById("experienceTitle").getBoundingClientRect().bottom
    var footerTop = document.getElementById("aboutFooter").getBoundingClientRect().y
    var bottom = footerTop != 0 ? footerTop : window.innerHeight
    var height = bottom - top
    console.log(top)
    console.log(bottom)
    document.getElementById("experienceBox").style.height = height + "px"
} 









