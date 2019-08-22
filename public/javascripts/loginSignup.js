$(document).ready(function () {
    $("#SignIn").click(function () {
      $("#signinfrm").show();
      $("#signupfrm").hide();
      $("#signin").addClass("active");
      $("#signin").removeClass("inactive");
      $("#signup").removeClass("active");
    });
    $("#SignUp").click(function () {
      $("#signinfrm").hide();
      $("#signup").addClass("active");
      $("#signup").removeClass("inactive");
      $("#signin").removeClass("active");
      $("#signupfrm").show();
    });
  });