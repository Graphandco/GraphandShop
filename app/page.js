import { Button } from "@/components/ui/button";
import ShopList from "@/components/ShopList";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
	return (
		<>
			<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-3xl text-center mb-8 text-primary font-title">
						Shop List
					</h1>
					<Link href="/shop/add">
						<Button>
							<FaPlus />
						</Button>
					</Link>

					<ShopList />
				</div>
			</div>
		</>
	);
}
