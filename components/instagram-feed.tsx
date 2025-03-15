import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const instagramPosts = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_1280.jpg",
    link: "https://www.instagram.com/p/example1/",
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg",
    link: "https://www.instagram.com/p/example2/",
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    link: "https://www.instagram.com/p/example3/",
  },
  {
    id: 4,
    image: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    link: "https://www.instagram.com/p/example4/",
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2016/11/29/13/24/attractive-1869761_1280.jpg",
    link: "https://www.instagram.com/p/example5/",
  },
  {
    id: 6,
    image: "https://cdn.pixabay.com/photo/2016/11/29/11/45/beautiful-1869306_1280.jpg",
    link: "https://www.instagram.com/p/example6/",
  },
]

export default function InstagramFeed() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Instagram className="h-6 w-6 text-[#2952b2] mr-2" />
          <h2 className="text-2xl font-bold">Follow Us on Instagram</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/nadulaofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2952b2] font-medium hover:underline"
          >
            @nadulaofficial
          </a>
        </div>
      </div>
    </div>
  )
}

