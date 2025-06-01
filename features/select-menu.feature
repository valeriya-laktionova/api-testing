Feature: Select Menu

  @selectmenu
  Scenario: Dropdown selections work correctly
    Given I open the select menu page
    When I select "Group 2, option 1" from select value
    And I select "Other" from select one
    And I select "Green" from old select menu
    And I select multiple values from multi select dropdown: "Black, Blue"
    Then the selected values should be correct
