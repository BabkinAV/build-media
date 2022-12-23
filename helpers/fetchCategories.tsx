import axios from "axios";
import { Category } from "../pages";

const fetchCategories = async () => {
	const categories = await axios
	.get<Category[]>(
		`http://localhost/build-media/wp-json/wp/v2/categories?_fields=name,%20id,%20slug`
	)
	const renderedCategories:Category[] = [{id: 0, name: 'Main', slug: 'main'}, ...categories.data];


	return renderedCategories;
}

export default fetchCategories;