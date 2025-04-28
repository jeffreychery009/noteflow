"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEditFolder } from "@/hooks/folders/useEditFolder";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface EditFormProps {
  defaultValue: string;
  setIsEditOpen: (isEditOpen: boolean) => void;
  folderId: string;
}

const EditForm = ({ defaultValue, setIsEditOpen, folderId }: EditFormProps) => {
  console.log("Folder ID:", folderId);
  const [isEditing, setIsEditing] = useState(false);
  const { editFolder } = useEditFolder();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Folder name is required"),
      })
    ),
    defaultValues: {
      name: defaultValue,
    },
  });

  const handleSubmit = async (data: any) => {
    setIsEditing(true);

    try {
      const result = await editFolder(folderId, data.name);

      if (!result.success) {
        console.log(result.error);
      }

      setIsEditOpen(false);
      form.reset();
    } catch (error) {
      console.error("Edit folder error:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter folder name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isEditing}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isEditing}>
              {isEditing ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
