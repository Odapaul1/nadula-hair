import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Put On and Go Wig",
    image: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    href: "/wigs/put-on-and-go",
  },
  {
    id: 2,
    name: "7×5 Bye Bye Knots Wig",
    image: "https://cdn.pixabay.com/photo/2016/11/29/13/24/attractive-1869761_1280.jpg",
    href: "/wigs/bye-bye-knots",
  },
  {
    id: 3,
    name: "13×4 Pre-everything",
    image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/woman-2563491_1280.jpg",
    href: "/wigs/pre-everything",
  },
  {
    id: 4,
    name: "V Part Wigs",
    image: "https://cdn.pixabay.com/photo/2016/11/21/15/42/adult-1846127_1280.jpg",
    href: "/wigs/v-part",
  },
]

export default function ProductCategories() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={category.href} prefetch={true} className="group">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 text-center text-lg font-medium text-gray-900">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

