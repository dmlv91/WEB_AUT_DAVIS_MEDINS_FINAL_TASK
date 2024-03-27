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
                Student_Email: "davis.medins@va.lv",
                Gender: "Male",
                Mobile: "1234567890",
                Date_of_Birth: {
                    year: "1930",
                    month: "February",
                    day: "28"
                },
                Subjects: "Economics",
                Hobbies: "Music",
                State: "NCR",
                City: "Delhi",
                Picture: "samplePicture.png",
                Address: "Test street 1"
            }
            /////ACTIONS\\\\\
            PracticeForm.nameField.type(testData.Name);
            PracticeForm.lastNameField.type(testData.LastName);
            PracticeForm.emailField.type(testData.Student_Email);
            PracticeForm.genderSelector.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.Gender) {
                        cy.get($div).click();
                    }
                });
            });
            PracticeForm.mobileField.type(testData.Mobile);
            PracticeForm.dobField.click();
            PracticeForm.calendarMonth.select(testData.Date_of_Birth.month);
            PracticeForm.calendarYear.select(testData.Date_of_Birth.year);
            PracticeForm.calendarDate.within(() => {
                cy.get('div').each(($div) => {
                    if ($div.text() == testData.Date_of_Birth.day) {
                        if($div.attr('aria-label').includes(testData.Date_of_Birth.month)){
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
            cy.fixture('/files/'+testData.Picture,null).as('file');
            PracticeForm.uploadBtn.selectFile('@file');
            PracticeForm.addressField.type(testData.Address);
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
            PracticeForm.validationModal.should('exist');
            PracticeForm.validationTable.within(() => {
                cy.get('tbody').then(() => {
                    cy.get('td').each(($td) => {
                        const key = $td.text().trim();
                        var expectedValue;

                        if (testData.hasOwnProperty(key)) {
                            expectedValue = testData[key];
                            cy.get($td).next('td').should('have.text',expectedValue)
                        } else {
                            switch (key) {
                                case 'Student Name':
                                    expectedValue = testData.Name + " " + testData.LastName;
                                    cy.get($td).next('td').should('have.text',expectedValue)
                                    break;
                                case 'Student Email':
                                    expectedValue = testData.Student_Email
                                    cy.get($td).next('td').should('have.text',expectedValue)
                                    break;
                                case 'Date of Birth':
                                    expectedValue = testData.Date_of_Birth.day + " " + testData.Date_of_Birth.month + "," + testData.Date_of_Birth.year;
                                    cy.get($td).next('td').should('have.text',expectedValue)
                                    break;
                                case 'State and City':
                                    expectedValue = testData.State + " " + testData.City;
                                    cy.get($td).next('td').should('have.text',expectedValue)
                                    break;
                            }
                        }
                        
                    })
                })
            });
        })
    });
});