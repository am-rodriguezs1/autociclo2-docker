Feature: Crear miembro

@user1 @web
Scenario: ESC010 - Crear miembro con correo electrónico no válido
  Given "1" I go to host page and path "/signin"
  And I wait for 2 seconds
  When "2" I sign in
  And I wait for 7 seconds
  And "3" I go to host page and path "/members/new"
  When "4" I fill the member form with name and invalid email
  And "5" I click save member button
  And I wait for 2 seconds
  Then "6" I should see the retry message in the button
  And I wait for 2 seconds