import BannerSingle from "@/components/BannerSingle";
import Form from "./form";

const CollaborationPartnership = () => {
	const banner = [{
			"_id": "6784adf7121f5f051c51023f",
			"title": "",
			"description": "asd",
			"button_name": "/",
			"button_route": "/",
			"images": [
					{
							"url": '/temp/banner-collaboration-partnership.png'
					}
			],
			"images_mobile": [
					{
							"url": '/temp/banner-collaboration-partnership.png'
					}
			]
	}]



	return ( 
		<section id="collaboration-partnership">
			 <BannerSingle data={banner} isStatic/>
			 <Form/>
		</section>
		);
}
 
export default CollaborationPartnership;