Feature: Crear un nuevo sitio en Ghost CMS

  @user14 @web @createSiteNameError
 Scenario: ESC014 - Crear un sitio sin nombre muestra mensaje de error
    Given I navigate to page "<URL>"
    When I enter text "<EMPTY>" into the input with id "blog-title"
    And "1" I wait for 3 seconds
    And I enter text "<FULL_NAME>" into the input with id "name"
    And "2" I wait for 3 seconds
    And I enter text "<EMAIL>" into the input with id "email"
    And "3" I wait for 3 seconds
    And I enter text "<PASSWORD>" into the input with id "password"
    And "4" I wait for 3 seconds
    And I click on the element with data-test-button "setup"
    And "5" I wait for 3 seconds
    Then I should see text "Please enter a site title." in the element with selector ".response"
