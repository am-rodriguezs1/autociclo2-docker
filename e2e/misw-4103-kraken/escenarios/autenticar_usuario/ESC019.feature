Feature: Autenticar usuario

@user1 @web
Scenario: ESC019 - Autenticar usuario con correo electrónico inválido
  Given I navigate to page "<URL>" and path "/signin"
  And "1" I wait for 5 seconds
  When I enter the email "invalid@email.com"
  And "2" I wait for 2 seconds
  And I enter the password "<PASSWORD>"
  And "3" I wait for 2 seconds
  And I click next
  And "4" I wait for 2 seconds
  Then I should see the validation message "There is no user with that email address."