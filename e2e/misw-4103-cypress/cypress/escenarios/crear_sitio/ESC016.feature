Feature: Crear un nuevo sitio en Ghost CMS

@user16 @web
Scenario: ESC016 - Crear un sitio exitosamente
  Given I go to page "/ghost/#/setup"
  And I wait for 2 seconds
  When I enter text "Mi sitio de prueba" into the input with id "blog-title"
  And I enter text "Usuario de Prueba" into the input with id "name"
  And I enter valid email into the input with id "email"
  And I enter valid password into the input with id "password"
  And I click on the element with data-test-button "setup"
  Then I wait for url containing "/ghost/#/dashboard" for 10 seconds
  And I should see the Ghost dashboard
