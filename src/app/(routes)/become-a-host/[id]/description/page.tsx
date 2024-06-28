"use client";

import { inputDescription } from "@/actions";
import BottomBar from "@/components/BottomBar";
import CounterInput from "@/components/CounterInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Counts = {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

const DescriptionPage = () => {
  const supabase = createClient();
  const { id: listingId } = useParams();
  const [counts, setCounts] = useState<Counts>({
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const decrease = (name: keyof Counts) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: Math.max(prevCounts[name] - 1, 0),
    }));
  };

  const increase = (name: keyof Counts) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: prevCounts[name] + 1,
    }));
  };

  const handleChange = (name: keyof Counts, value: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleFileChange ~ e.target:", e.target);
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadedImageUrls: string[] = [];

    console.log("🚀 ~ handleSubmit ~ selectedFiles:", selectedFiles);
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const filePath = `${listingId}/${file.name}`;
        const { error, data } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading file:", error);
        } else {
          const url = supabase.storage.from("images").getPublicUrl(filePath);
          uploadedImageUrls.push(url.data.publicUrl);
        }
      }
    }

    setImageUrls(uploadedImageUrls);

    await inputDescription({
      name,
      description,
      price,
      guests: counts.guests,
      bedrooms: counts.bedrooms,
      beds: counts.beds,
      bathrooms: counts.bathrooms,
      listingId: listingId as string,
      images: uploadedImageUrls,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mb-40">
      <div className="w-[50%] space-y-5 py-5">
        <div className="space-y-2">
          <h2 className="text-3xl font-medium ">
            Share some basics about your place
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="guests" value={counts.guests} />
          <input type="hidden" name="bedrooms" value={counts.bedrooms} />
          <input type="hidden" name="beds" value={counts.beds} />
          <input type="hidden" name="bathrooms" value={counts.bathrooms} />
          <input type="hidden" name="listingId" value={listingId} />
          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="4br Lovina Paradise - Ocean View"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Indulge in the ultimate retreat at Bali Exception's four-bedroom villa nestled amid the lush jungles of Bali."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Price in USD"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                placeholder="Image"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="border p-5 pt-0 rounded-lg">
            <CounterInput
              label="Guests"
              name="guests"
              value={counts.guests}
              onDecrease={decrease}
              onIncrease={increase}
              onChange={handleChange}
            />
            <CounterInput
              label="Bedrooms"
              name="bedrooms"
              value={counts.bedrooms}
              onDecrease={decrease}
              onIncrease={increase}
              onChange={handleChange}
            />
            <CounterInput
              label="Beds"
              name="beds"
              value={counts.beds}
              onDecrease={decrease}
              onIncrease={increase}
              onChange={handleChange}
            />
            <CounterInput
              label="Bathrooms"
              name="bathrooms"
              value={counts.bathrooms}
              onDecrease={decrease}
              onIncrease={increase}
              onChange={handleChange}
            />
          </div>

          <BottomBar />
        </form>
      </div>
    </div>
  );
};

export default DescriptionPage;
