Feature: Autenticar usuario

@user1 @web
Scenario: ESC018 - Autenticar usuario con contraseña inválido
  Given I go to host page and path "/signin"
  And I wait for 5 seconds
  When I enter the email 
  And I wait for 2 seconds
  And I enter the password "wrongpassword"
  And I click next
  And I wait for 2 seconds
  Then I should see error message "Your password is incorrect."
