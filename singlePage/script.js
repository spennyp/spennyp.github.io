var lastProjectNum = 0;
var animatingProjectList = false;


// About section
function openAbout() {
    document.getElementById("mainPage").style.filter = "blur(5px)"
    document.getElementById("aboutPage").style.display = "block"
}

function closeAbout() {
    document.getElementById("mainPage").style.filter = "blur(0)"
    document.getElementById("aboutPage").style.display = "none"
}

$(document).ready(function(){
    $("#experienceList li").click(function() {

        // Set highlight
        $("#experienceList li").removeClass("selectedJob")
        $(this).addClass("selectedJob")

        // Show info for selected
        $("#experienceDetails > li").addClass("hidden")
        var index = $(this).prevAll().length
        console.log(index)

        console.log($($("#experienceDetails > li")[index]).removeClass("hidden"))
    });
});


// Project list Animations

function updateProjectSelection() {
    var projectNum = Math.round(document.getElementById("rightColumn").scrollTop / window.innerHeight)
    if (projectNum != lastProjectNum && !animatingProjectList) {
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
        var scrollPosition = index *  window.innerHeight
        animatingProjectList = true
        $("#rightColumn").animate({scrollTop: scrollPosition}, function() {animatingProjectList = false});
    });
});







