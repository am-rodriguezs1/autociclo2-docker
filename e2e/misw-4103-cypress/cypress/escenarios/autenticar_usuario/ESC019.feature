Feature: Autenticar usuario

@user1 @web
Scenario: ESC019 - Autenticar usuario con correo electrónico inválido
  Given I go to host page and path "/signin"
  And I wait for 5 seconds
  When I enter the email "invalid@email.com" and the password
  And I wait for 2 seconds
  Then I should see error message "There is no user with that email address."
  And I wait for 2 seconds