Feature: Text Box form

  @textbox
  Scenario: Submit filled form and verify output
    Given I open the text box page
    When I fill the text box form with random data
    And I submit the text box form
    Then the output should match the input data
