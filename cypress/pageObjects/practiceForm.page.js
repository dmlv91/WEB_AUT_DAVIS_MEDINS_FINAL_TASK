class PracticeForm {

    static visit() {
        cy.visit("https://demoqa.com/automation-practice-form");
    }

    static get nameField() {
        return cy.get("input#firstName");
    }

    static get lastNameField() {
        return cy.get("input#lastName");
    }

    static get emailField() {
        return cy.get("input#userEmail");
    }

    static get genderSelector() {
        return cy.get("div#genterWrapper");
    }

    static get mobileField() {
        return cy.get("input#userNumber");
    }

    static get dobField() {
        return cy.get("input#dateOfBirthInput");
    }

    static get calendarDate() {
        return cy.get("div.react-datepicker__month");
    }

    static get calendarMonth() {
        return cy.get("select.react-datepicker__month-select");
    }

    static get calendarYear() {
        return cy.get("select.react-datepicker__year-select");
    }
    
    static get subjectsField() {
        return cy.get("div#subjectsContainer");
    }

    static get subjectsAutocomplete() {
        return cy.get("div.subjects-auto-complete__option--is-focused");
    }

    static get hobbieSelector() {
        return cy.get("div#hobbiesWrapper");
    }

    static get uploadBtn() {
        return cy.get("input#uploadPicture");
    }

    static get addressField() {
        return cy.get("textarea#currentAddress");
    }

    static get stateSelector() {
        return cy.get("div#state");
    }

    static get citySelector() {
        return cy.get("div#city");
    }

    static get submitBtn() {
        return cy.get("button#submit");
    }
}

export default PracticeForm