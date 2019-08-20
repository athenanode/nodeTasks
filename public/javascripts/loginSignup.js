$(document).ready(function () {
    $("#SignIn").click(function () {
      $("#signinfrm").show();
      $("#signupfrm").hide();
      $("#signin").addClass("active");
      $("#signup").addClass("inactive");
      $("#signup").removeClass("active");
    });
    $("#SignUp").click(function () {
      $("#signinfrm").hide();
      $("#signupfrm").show();
      $("#signup").addClass("active");
      $("#signin").addClass("inactive");
      $("#signin").removeClass("active");
    });
  });