"use client";

import {
	Admin,
	Resource,
	BooleanField,
	Datagrid,
	DateField,
	List,
	TextField,
	BooleanInput,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	required,
	Layout,
	ReferenceField,
	ReferenceInput,
	SelectInput
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import {
	ReactAdminSearchFilter,
	MyLectureActions
} from "@/components/admin/ReactAdminSearchFilter";
import { VercelBlobInput } from "@/components/admin/VercelBlobInput"; // Import your new component
import { useAuthContext } from "@/context/authContext";
import { useDataProvider } from "@/hooks";
import styles from "../admin/react-admin-styles.module.css";

export default function ReactAdminSuper() {

  const dataProvider = useDataProvider();

	return (
		<Admin layout={Layout} dataProvider={dataProvider}>
			<Resource
				name="lectures"
				list={LecturesList}
				edit={LecturesEdit}
				create={LecturesCreate}
				options={{ label: "Lecturas" }}
			/>
			<Resource
        name="categories"
        list={CategoriesList}
        edit={CategoriesEdit}
        create={CategoriesCreate}
        options={{ label: "Categorías" }}
      />
		</Admin>
	);
}

export const LecturesList = () => (
	<List
		filters={<ReactAdminSearchFilter />}
		actions={<MyLectureActions />}
		sort={{ field: "created_at", order: "DESC" }}>
		<Datagrid>
			<TextField source="title" />
			<BooleanField source="draft" />
			<BooleanField source="is_featured" />
			{/* This will now display the category's name */}
			<ReferenceField
				label="Category"
				source="category_id" // The foreign key in your 'lectures' data
				reference="categories" // The resource to fetch from
			>
				{/* This displays the 'name' field from the fetched category */}
				<TextField source="name" />
			</ReferenceField>

			{/* ... other columns */}
			<DateField source="created_at" />
			<DateField source="updated_at" />
		</Datagrid>
	</List>
);

export const LecturesEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" validate={required()} />
			<TextInput source="summary" validate={required()} />
			{/* This will render a dropdown of categories */}
			<ReferenceInput source="category_id" reference="categories">
				<SelectInput
					optionText="name" // The field from the 'categories' resource to display
					validate={required()}
				/>
			</ReferenceInput>
			<TextInput source="video_url" />
			<BooleanInput source="draft" />
			<BooleanInput source="is_featured" />
			<RichTextInput source="content" validate={required()} />
		</SimpleForm>
	</Edit>
);

export const LecturesCreate = () => {

  const {user} = useAuthContext();

  const transform = (data: any) => ({
    ...data,
    by_user_id: user ? user.id : null,
  })

	return (
		<Create transform={transform}>
			<SimpleForm>
				{/* Custom Image Component to get Image URL in server */}
				<VercelBlobInput
					source="image_url"
					label="Lecture Image"
					validate={required()}
				/>
				<TextInput source="title" validate={required()} />
				<TextInput source="summary" validate={required()} />
				{/* This will render a dropdown of categories */}
				<ReferenceInput source="category_id" reference="categories">
					<SelectInput
						optionText="name" // The field from the 'categories' resource to display
						validate={required()}
					/>
				</ReferenceInput>
				<TextInput source="video_url" />
				<div className="flex flex-row flex-wrap gap-4 mt-4">
					<BooleanInput source="draft" />
					<BooleanInput source="is_featured" />
				</div>
				<RichTextInput source="content" validate={required()} />
			</SimpleForm>
		</Create>
	);
};

export const CategoriesList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const CategoriesEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const CategoriesCreate = () => {
	const { user } = useAuthContext();

	const transform = (data: any) => ({
		...data,
		user_by_id: user ? user.id : null
	});

	return (
		<Create transform={transform}>
			<SimpleForm>
				<TextInput source="name" validate={required()} />
			</SimpleForm>
		</Create>
	);
};