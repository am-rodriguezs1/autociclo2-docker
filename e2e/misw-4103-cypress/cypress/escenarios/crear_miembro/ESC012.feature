Feature: Crear miembro

@user1 @web
Scenario: ESC012 - Crear un miembro con una nota que supera los 500 caracteres
  Given "1" I navigate to host page and path "/signin"
  And I wait for 5 seconds
  When "2" I enter the email
  And I wait for 2 seconds
  And "3" I enter the password
  And I wait for 2 seconds
  And "4" I click next
  And I wait for 2 seconds
  Given "5" I navigate to host page and path "/members/new"
  And I wait for 3 seconds
  When "6" I enter the member name
  And I wait for 1 seconds
  And "7" I enter the member email
  And I wait for 1 seconds
  And "8" I enter an invalid member note
  And I wait for 1 seconds
  And "9" I click save member
  And I wait for 5 seconds
  Then "10" I should see the validation message "Note is too long"
  And I wait for 2 seconds