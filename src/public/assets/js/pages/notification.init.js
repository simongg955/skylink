document.getElementById("alert").addEventListener("click", function () {
  alertify.alert("Alert Title", "Alert Message!", function () {
    alertify.success("Ok");
  });
}),
  document
    .getElementById("alert-confirm")
    .addEventListener("click", function () {
      alertify.confirm(
        "This is a confirm dialog.",
        function () {
          alertify.success("Ok");
        },
        function () {
          alertify.error("Cancel");
        }
      );
    }),
  document
    .getElementById("alert-prompt")
    .addEventListener("click", function () {
      alertify.prompt(
        "This is a prompt dialog.",
        "Default value",
        function (e, t) {
          alertify.success("Ok: " + t);
        },
        function () {
          alertify.error("Cancel");
        }
      );
    }),
  document
    .getElementById("alert-success")
    .addEventListener("click", function () {
      alertify.success("Success message");
    }),
  document.getElementById("alert-error").addEventListener("click", function () {
    alertify.error("Error message");
  }),
  document
    .getElementById("alert-warning")
    .addEventListener("click", function () {
      alertify.warning("Warning message");
    }),
  document
    .getElementById("alert-message")
    .addEventListener("click", function () {
      alertify.message("Normal message");
    });
