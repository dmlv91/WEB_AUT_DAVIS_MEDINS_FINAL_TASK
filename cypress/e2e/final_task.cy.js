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
            /////ACTIONS\\\\\
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
            });
            PracticeForm.subjectsField.click();
            PracticeForm.subjectsField.type(testData.Subjects).then( () => {
                PracticeForm.subjectsAutocomplete.invoke('text').then((text) => {
                    if (PracticeForm.subjectsAutocomplete.should('exist') && (text == testData.Subjects)) {
                        PracticeForm.subjectsAutocomplete.click();
                    }
                });
                
            });
            PracticeForm.hobbieSelector.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.Hobbies) {
                        cy.get($div).click();
                    }
                });
            });
            cy.fixture('/files/samplePicture.png',null).as('file');
            PracticeForm.uploadBtn.selectFile('@file');
            PracticeForm.stateSelector.click();
            PracticeForm.stateSelector.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.State) {
                        cy.get($div).click();
                        return false; 
                    }
                })
            });
            PracticeForm.citySelector.click();
            PracticeForm.citySelector.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.City) {
                        cy.get($div).click();
                        return false; 
                    }
                })
            });
            PracticeForm.submitBtn.click();

            /////VALIDATION\\\\\

        })
    });
});