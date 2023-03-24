import axios from "axios";
import { Category } from "../pages";

/** Fetch post categories from Wordpress REST API */ 
const fetchCategories = async () => {
	const categories = await axios
	.get<Category[]>(
		`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/wp-json/wp/v2/categories?_fields=name,%20id,%20slug`
	)
	const renderedCategories:Category[] = categories.data;


	return renderedCategories;
}

export default fetchCategories;