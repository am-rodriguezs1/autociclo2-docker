Feature: Validaciones de login usando Page Object

@user20 @web
Scenario Outline: ESC020 - Intento de login con campo faltante
  Given I go to page "<URL>" and path "/signin"
  And "1" I wait for 2 seconds
  When I sign in without email and "<PASSWORD>"
  And "2" I wait for 2 seconds
  Then I should see error message "Please fill out the form to sign in."
