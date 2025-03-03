document.addEventListener("DOMContentLoaded", () => {
    const fields = ["first-name", "last-name", "phone", "inquiry"];
    const errorOutput = document.querySelector('output[name="errors"]');

    // Define the phone number regex pattern
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    // Initialize an empty array to capture form errors
    let form_errors = [];

    const form = document.querySelector("form");

    fields.forEach((id) => {
      const field = document.getElementById(id);

      // Validate input on every keystroke
      field.addEventListener("input", () => {
        if (field.checkValidity()) {
          clearError(field);
        } else {
          showError(field);
          addErrorToFormErrors(field);
        }

        // Custom validation for phone number field
        if (field.id === "phone") {
          if (phoneRegex.test(field.value)) {
            clearError(field);
          } else {
            showError(field);
            addErrorToFormErrors(field);
          }
        }

        if (field.id === "inquiry") {
          const maxChars = field.maxLength;
          const remainingChars = maxChars - field.value.length;
          const charCount = document.getElementById("char-count");

          charCount.textContent = `${remainingChars} characters remaining`;

          // Update the style based on the remaining characters
          if (remainingChars <= 50) {
            field.classList.add("warn");
            field.classList.remove("error");
          } else if (remainingChars < 0) {
            field.classList.add("error");
            field.classList.remove("warn");
          } else {
            field.classList.remove("warn", "error");
          }

          if (remainingChars < 0) {
            showError(field, "Character limit exceeded");
            addErrorToFormErrors(field, "Character limit exceeded");
          } else {
            clearError(field);
          }
        }
      });

    });

    // When form is submitted, encode form_errors as JSON and append it to the form
    form.addEventListener("submit", (event) => {
      if (form_errors.length > 0) {
        // Create a hidden input field for form-errors and append it to the form
        const formErrorsInput = document.createElement("input");
        formErrorsInput.type = "hidden";
        formErrorsInput.name = "form-errors";
        formErrorsInput.value = JSON.stringify(form_errors); // Encode form_errors as JSON
        form.appendChild(formErrorsInput);
      }
    });

    // Show error message on the field
    function showError(field, message) {
      field.classList.add("error-flash");

      if (!message) {
        if (field.id === "first-name" || field.id === "last-name") {
          message = "Please input a name of more than 2 characters and less than 50 characters";
        } else if (field.id === "phone") {
          message = "Please input a valid phone number";
        } else if (field.id === "inquiry") {
          message = "Please only input legal characters into the text area";
        }
      }

      errorOutput.textContent = message;
      errorOutput.classList.add("show");

      setTimeout(() => {
        field.classList.remove("error-flash");
        errorOutput.classList.remove("show");
        errorOutput.textContent = "";
      }, 2000);
    }

    // Clear error message
    function clearError(field) {
      field.classList.remove("error-flash");
      errorOutput.textContent = "";
      errorOutput.classList.remove("show");
    }

    // Add error to form_errors array
    function addErrorToFormErrors(field, message) {
      form_errors.push({
        field: field.id,
        message: message || field.validationMessage,
      });
      console.log(form_errors)
    }
  });