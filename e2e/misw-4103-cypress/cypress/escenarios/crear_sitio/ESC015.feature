Feature: Crear un nuevo sitio en Ghost CMS

@user15 @web @createSitePassError
Scenario: Crear un sitio con contraseña demasiado corta muestra mensaje de error
  Given I go to page "/ghost/#/setup"
  And I wait for 2 seconds
  # rellenamos todos los campos correctamente salvo la contraseña
  When I enter text "Mi sitio de prueba" into the input with id "blog-title"
  And I enter text "Usuario de Prueba" into the input with id "name"
  And I enter text "usuario@prueba.com" into the input with id "email"
  And I enter text "pwd" into the input with id "password"
  And I click on the element with data-test-button "setup"
  Then I should see text "Password must be at least 10 characters long." in the element with selector ".response"
