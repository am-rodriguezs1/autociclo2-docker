Feature: Validaciones de login usando Page Object

@user20 @web
Scenario: Intento de login con campo faltante
  Given I go to host page and path "/signin"
  And I wait for 2 seconds
  When I sign in without email
  Then I should see error message "Please fill out the form to sign in."

