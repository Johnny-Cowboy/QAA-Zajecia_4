/// <reference types="cypress" />

import MainMenuComponent from '../page-components/main-menu-component'
import PaySavedPayee from '../pages/pay-saved-payee-page'
import PayBillsComponent from '../page-components/pay-bills-tab-component'
import AddNewPayeePage from '../pages/add-new-payee'

describe('Paby bill tests', () => {
  beforeEach(() => {
    cy.visit('http://zero.webappsecurity.com/')
    cy.login('username', 'password')
  })

  it('Make succesfull paymet to  Saved Payee', () => {
    const mainMenu = new MainMenuComponent()
    mainMenu.getPayBillsTab().click()

    const payBillsComponent = new PayBillsComponent()
    payBillsComponent.getCurrentTab().should('have.text', 'Pay Saved Payee')

    const paySavedPayee = new PaySavedPayee()
    paySavedPayee.getAmountInput().type('100')
    paySavedPayee.getDataInput().type('2023-03-08')
    paySavedPayee.getAmountInput().click()
    paySavedPayee.getDescriotionInput().type('Czesne')
    paySavedPayee.getPayButton().click()
    paySavedPayee
      .getConfirmationMessage()
      .should('have.text', 'The payment was successfully submitted.')
  })
  it('Add new Payee and confirmation massage', () => {
    const mainMenu = new MainMenuComponent()
    mainMenu.getPayBillsTab().click()

    const payBillsComponent = new PayBillsComponent()
    payBillsComponent.getAdnNewPayeeTab().click()
    payBillsComponent.getCurrentTab().should('have.text', 'Add New Payee')
    const addNewPayee = new AddNewPayeePage()
    addNewPayee.getPayeeNameInput().type('John')
    addNewPayee.getPayeeAdressInput().type('23234 Boston, Main Aveniue 2')
    addNewPayee.getAccoutInput().type('1234 343343 4343434 343434')
    addNewPayee.getPayeeDetails().type('no data')
    addNewPayee.getAddButton().click()
    addNewPayee
      .getConfirmationMessage()
      .should('have.text', 'The new payee John was successfully created.')
  })
})
