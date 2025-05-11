Feature: Crear un nuevo sitio en Ghost CMS

@user1 @web
Scenario: ESC000 - Crear sitio
  Given I navigate to page "<URL>" and path "/setup"
  And I wait for 5 seconds
  When I click on create account
  And I wait for 5 seconds
  When I enter text "Mi sitio de prueba" into the input with id "blog-title"
  And I enter text "Usuario de Prueba" into the input with id "name"
  And I enter text "<EMAIL>" into the input with id "email"
  And I enter text "<PASSWORD>" into the input with id "password"
  And I click on the submit button
  And I wait for 10 seconds
  And I click skip in the invite staff users
  And I wait for 10 seconds
  Then I should see the Ghost dashboard
