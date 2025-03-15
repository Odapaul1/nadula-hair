"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Trash2, Download, ExternalLink, Upload } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

interface MediaItem {
  id: number
  name: string
  type: string
  url: string
  size: string
  dimensions: string
  uploadedAt: string
  file?: File
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const filteredMedia = media.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    const newMedia: MediaItem[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      // Create a promise to handle the FileReader
      const readFile = new Promise((resolve) => {
        reader.onload = () => {
          const url = reader.result as string
          resolve({
            id: Date.now() + i,
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "video",
            url: url,
            size: formatFileSize(file.size),
            dimensions: "1920x1080", // You would normally get this from the actual image
            uploadedAt: new Date().toISOString().split("T")[0],
            file: file,
          })
        }
      })

      reader.readAsDataURL(file)
      const mediaItem = (await readFile) as MediaItem
      newMedia.push(mediaItem)
    }

    setMedia([...media, ...newMedia])
    setIsUploading(false)

    toast({
      title: "Files Uploaded",
      description: `${newMedia.length} file(s) have been uploaded successfully.`,
    })

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDelete = (id: number) => {
    setMedia(media.filter((item) => item.id !== id))
    toast({
      title: "File Deleted",
      description: "The file has been removed from the library.",
    })
  }

  const handleDownload = (item: MediaItem) => {
    const link = document.createElement("a")
    link.href = item.url
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setView(view === "grid" ? "list" : "grid")}>
            {view === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <label className="cursor-pointer">
              Upload Files
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>Manage your images, videos, and other media files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media files..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isUploading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Uploading files...</p>
            </div>
          )}

          {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div key={item.id} className="group relative aspect-square rounded-lg border bg-card overflow-hidden">
                  {item.type === "image" ? (
                    <div className="relative h-full">
                      <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <video className="h-full w-full object-cover">
                        <source src={item.url} type="video/mp4" />
                      </video>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" onClick={() => handleDownload(item)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => window.open(item.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                    <p className="truncate">{item.name}</p>
                    <p className="text-xs text-gray-300">{item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">File</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Size</th>
                    <th className="px-4 py-2 text-left">Dimensions</th>
                    <th className="px-4 py-2 text-left">Uploaded</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.type}</td>
                      <td className="px-4 py-2">{item.size}</td>
                      <td className="px-4 py-2">{item.dimensions}</td>
                      <td className="px-4 py-2">{item.uploadedAt}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(item)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => window.open(item.url, "_blank")}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredMedia.length === 0 && !isUploading && (
            <div className="text-center py-12">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium">No media files</p>
              <p className="text-sm text-muted-foreground">Upload files to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

