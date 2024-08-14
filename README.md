# FormPipe Test
Please see below for which tasks were completed aswell as any notes.


### Core tasks:

1. ~~Implement the filters in the expandable panel at the top of the 'List Users' page. You should ideally design it so that it could handle a very large number
   of records in the future.~~
2. ~~The 'List Users' page should also allow the user to see all users in a table. The table should include some standard features such as sorting and pagination.~~
3. ~~Add a detail page for the user that shows their details and a list of roles they belong to.~~

### Optional tasks:

1. ~~There is an issue with routing in the application. Can you fix it?~~
1. Add a page that allows editing of an existing user. For this you can call `PATCH /users/:id` with the appropriate data.
2. ~~Add the ability to group users by their roles.~~

## Notes

- Optional Task 1
  - Was this issue located in the Router.tsx file? Specifically with the `/view` & `/edit` paths of `/users/view/:id` & `/users/edit/:id`. Not too sure but this is where my suspicion lies. 
- Current sorting and pagination on UserTable component is implemented client side. While I believe this is okay for smaller data sets, enabling sorting/paging to be faster, when working with much larger data sets, sorting and paging directly from the API would be more optimal. In the context of this task, I also wanted to implement it client side as this enabled me to gain exposure to React Function Components for the SortableTableHeader custom component, something I had not done before!

## Known Bugs

- Had difficulty with the relationship between the 'Clear Filters' button and the displayed values of the Select components in UsersFilters. While the clear filters button does clear session storage and allows the data to refresh, the Select component will still display the previous value of the filter. Adding in the `clearable` prop mitigates this somewhat, allowing each filter to be cleared manually but ideally the Clear Filters button should clear them all too.
- Searching by name in the filters doesn't function as well as it could. Currently calls the API on change of value in the TextInput (every key press). Attempted to implement a debounce function to mitigate this however ran into difficulties when it came to comparing values and their types. 
