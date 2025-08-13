import { Filter, SearchInput, CreateButton, TopToolbar, ExportButton } from "react-admin";

export const ReactAdminSearchFilter = () => (
	<Filter>
		{/* The 'source' prop is crucial. Setting it to "q" tells React Admin
      to create a filter payload like { q: "search term" }.
      This matches the global search logic in your Next.js API route.
      'alwaysOn' makes the search bar visible by default.
    */}
		<SearchInput source="q" alwaysOn />

		{/* You can add other filters here too. For example, a dropdown
      to filter by a specific category.
    */}
		{/* <SelectInput source="category_id" label="Category" choices={[...]} /> */}
	</Filter>
);

// Create this new component
export const MyLectureActions = () => (
  <TopToolbar>
    {/* By creating this component, we explicitly tell React Admin
      what to render in the top-right corner. We are only adding
      the Create button. */}
    <CreateButton />
    <ExportButton />
    {/* You can add more buttons here if needed */}
  </TopToolbar>
);