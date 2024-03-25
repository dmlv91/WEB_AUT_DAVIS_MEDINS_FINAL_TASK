import PracticeForm from "../pageObjects/practiceForm.page";

describe ('Practice Form', () => {

    context("Student Registration Form", () => {
        beforeEach(() => {
            PracticeForm.visit();
        });

        it ("Final task", () => {
            const testData = {
                Name: "Davis",
                LastName: "Medins",
                email: "davis.medins@va.lv",
                gender: "Male",
                mobile: "1234567890",
                DoB: {
                    year: "1930",
                    month: "February",
                    day: "28"
                },
                Subjects: "Economics",
                Hobbies: "Music",
                State: "NCR",
                City: "Delhi"
            }

            PracticeForm.nameField.type(testData.Name);
            PracticeForm.lastNameField.type(testData.LastName);
            PracticeForm.emailField.type(testData.email);
            PracticeForm.genderSelector.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.gender) {
                        cy.get($div).click();
                    }
                });
            });
            PracticeForm.mobileField.type(testData.mobile);
            PracticeForm.dobField.click();
            PracticeForm.calendarMonth.select(testData.DoB.month);
            PracticeForm.calendarYear.select(testData.DoB.year);
            PracticeForm.calendarDate.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.DoB.day) {
                        if($div.attr('aria-label').includes(testData.DoB.month)){
                            cy.get($div).click();
                            return false;
                        }
                        
                    }
                })
            })


        })
    });
});