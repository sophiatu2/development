# Development

### Link to Deployed Website

[https://sophiatu2.github.io/development/](https://sophiatu2.github.io/development/)

### Goal and Value of the Application

The goal of this application is to allow Rainbow Six Siege players to calculate how much Renown (in-game currency) they need to purchase their desired operators. It's valuable because players can optimize their Renown spending by carefully choosing which combination of characters they would like to purchase and working towards the total cost.

### Usability Principles Considered

I made sure to include alt text for the badge and profile images. I also tried to make the layout intuitive by including the filter, sort, and cart in the sidebar.

### Organization of Components

The main app is broken into a sidebar and main screen. The sidebar contains the `Filters` component and cart, which is a map of `CartItem`. The `Filters` component contains a dropdown menu that sorts the items and an option to filter by organization. There are also buttons to select or deselect all options.

On the main screen, all operators are presented as a grid of `ListItem`s. Each `ListItem` displays the operator profile, badge, team, organization, and cost in Renown. There is also a button that reads "Add To Team" before being clicked and "Remove from Team" afterwards. This adds/removes the operator from the cart depending on the state of `clicked`.

### How Data is Passed Down Through Components

Each item is passed down to `ListItem` along with `deselect` and `setDeselect` and an `addToCart` and `removeFromCart` function. `deselect` and `setDeselect` are tied to the `clearCart` function, which resets all the "Add to Team" buttons when the cart is cleared. The adding and removing functions are required to add the item to the cart. The full item is passed down so that all the attributes of the item can be used within `ListItem`. On the other hand, only the name and price of the item is passed down to `CartItem` since those are the only necesssary attributes.

`Filters` takes in `operatorData` and `setFilteredItems`. `operatorData` is required since it has to be mapped over to apply the filters. `setFilteredItems` is used to modify the items that are displayed on the main page.

### How the User Triggers State Changes

`cart` and `total` are states that keep track of the items and total price of the selected operators. They are triggered by clicking the "Add to Team" or "Remove from Team" button under each operator.

`isChecked` is an array of the ids of all the filters that are selected. If a filter is unselected, its id will be removed from the `isChecked` array and it will not be displayed. If a filter is selected, it will be added and thus displayed. The "Select All" button adds the ids of all filters to `isChecked`, thus making every item display. The "Deselect All" sets `isChecked` to an empty array, thus displaying no items.

`sortBy` specifies a property of `operatorData` to sorty by. The options are ascending price, descending price, and organization.

`currFilters` keeps track of the filters currently applied. The key is the organization and the value is a boolean that changes based on whether the filter is checked. If the filter is checked, it will change the value of the filter within `currFilters` to true and vice versa.

`filteredItems` is an array of all the items that are displayed. It is filtered using the filters in `currFilters` and sorted by the property specified by `sortBy`.

`clicked` within `ListItem` simply keeps track of whether that operator is added to the cart. If it has been added, it will run `addToCart` and if it is being removed, it will run `removeFromCart`. It also determines whether the button reads "Remove from Team" or "Add to Team"
